$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$credentialsFile = Join-Path $projectRoot 'credentials.json'
$supportedJavaHomes = @(
  'C:\Program Files\Eclipse Adoptium\jdk-21.0.12.8-hotspot',
  'C:\Program Files\Android\Android Studio\jbr'
)
$javaHome = $supportedJavaHomes |
  Where-Object { Test-Path -LiteralPath (Join-Path $_ 'bin\java.exe') -PathType Leaf } |
  Select-Object -First 1
$androidSdk = Join-Path $env:LOCALAPPDATA 'Android\Sdk'
$gradleHome = Join-Path $env:LOCALAPPDATA 'Gradle\kpss-mini'
$tempRoot = [IO.Path]::GetTempPath().TrimEnd([IO.Path]::DirectorySeparatorChar)
$buildRoot = Join-Path $tempRoot ("km-" + [guid]::NewGuid().ToString('N').Substring(0, 8))

if (-not (Test-Path -LiteralPath $credentialsFile -PathType Leaf)) {
  throw 'credentials.json bulunamadi. Yerel release imzasi icin bu dosya gereklidir.'
}
if (-not $javaHome) {
  throw 'Yerel Android build icin JDK 21 bulunamadi.'
}
if (-not (Test-Path -LiteralPath $androidSdk -PathType Container)) {
  throw 'Android SDK bulunamadi.'
}

$credentials = Get-Content -LiteralPath $credentialsFile -Raw | ConvertFrom-Json
$keystore = $credentials.android.keystore
$originalKeystoreFile = Join-Path $projectRoot $keystore.keystorePath
if (-not (Test-Path -LiteralPath $originalKeystoreFile -PathType Leaf)) {
  throw 'credentials.json icindeki keystore dosyasi bulunamadi.'
}

$appConfig = Get-Content -LiteralPath (Join-Path $projectRoot 'app.json') -Raw | ConvertFrom-Json
$versionName = $appConfig.expo.version
$versionCode = [int]$appConfig.expo.android.versionCode
$destinationDir = Join-Path $projectRoot 'builds'
$destination = Join-Path $destinationDir "kpss-mini-$versionName-$versionCode-local.aab"
$mappingDestination = Join-Path $destinationDir "kpss-mini-$versionName-$versionCode-mapping.txt"

New-Item -ItemType Directory -Path $destinationDir -Force | Out-Null
New-Item -ItemType Directory -Path $gradleHome -Force | Out-Null
New-Item -ItemType Directory -Path $buildRoot | Out-Null

try {
  $excludedDirectories = @(
    (Join-Path $projectRoot '.git'),
    (Join-Path $projectRoot '.expo'),
    (Join-Path $projectRoot '.gradle-user-home'),
    (Join-Path $projectRoot 'node_modules'),
    (Join-Path $projectRoot 'dist'),
    (Join-Path $projectRoot 'builds'),
    (Join-Path $projectRoot 'android\.gradle'),
    (Join-Path $projectRoot 'android\build'),
    (Join-Path $projectRoot 'android\app\build')
  )
  & robocopy.exe $projectRoot $buildRoot /E /NFL /NDL /NJH /NJS /NP /XD $excludedDirectories /XF 'credentials.json' '*.jks' '*.keys' '*.aab'
  if ($LASTEXITCODE -ge 8) {
    throw "Yerel build kopyasi olusturulamadi: $LASTEXITCODE"
  }

  $temporaryKeystore = Join-Path $buildRoot 'signing-upload.jks'
  Copy-Item -LiteralPath $originalKeystoreFile -Destination $temporaryKeystore

  Push-Location $buildRoot
  try {
    & npm.cmd ci --ignore-scripts --prefer-offline --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'Yerel build bagimliliklari kurulamadi.' }
  } finally {
    Pop-Location
  }

  $androidRoot = Join-Path $buildRoot 'android'
  $gradleOutput = Join-Path $androidRoot 'app\build\outputs\bundle\release\app-release.aab'
  $mappingOutput = Join-Path $androidRoot 'app\build\outputs\mapping\release\mapping.txt'

  $env:JAVA_HOME = $javaHome
  $env:ANDROID_HOME = $androidSdk
  $env:ANDROID_SDK_ROOT = $androidSdk
  $env:GRADLE_USER_HOME = $gradleHome
  $env:NODE_ENV = 'production'
  $env:EXPO_USE_COMMUNITY_AUTOLINKING = '1'
  $env:KPSS_UPLOAD_STORE_FILE = $temporaryKeystore
  $env:KPSS_UPLOAD_STORE_PASSWORD = [string]$keystore.keystorePassword
  $env:KPSS_UPLOAD_KEY_ALIAS = [string]$keystore.keyAlias
  $env:KPSS_UPLOAD_KEY_PASSWORD = [string]$keystore.keyPassword

  & (Join-Path $androidRoot 'gradlew.bat') -p $androidRoot bundleRelease --no-daemon
  if ($LASTEXITCODE -ne 0) {
    throw "Yerel Gradle build basarisiz oldu: $LASTEXITCODE"
  }
  if (-not (Test-Path -LiteralPath $gradleOutput -PathType Leaf)) {
    throw 'Gradle tamamlandi ancak release AAB bulunamadi.'
  }
  if (-not (Test-Path -LiteralPath $mappingOutput -PathType Leaf)) {
    throw 'R8 tamamlandi ancak Play kod gosterme dosyasi bulunamadi.'
  }

  Copy-Item -LiteralPath $gradleOutput -Destination $destination -Force
  Copy-Item -LiteralPath $mappingOutput -Destination $mappingDestination -Force

  $keytool = Join-Path $javaHome 'bin\keytool.exe'
  $env:KPSS_KEYSTORE_PASSWORD = [string]$keystore.keystorePassword
  $keyOutput = & $keytool -list -v -keystore $temporaryKeystore -storepass:env KPSS_KEYSTORE_PASSWORD -alias $keystore.keyAlias 2>&1
  if ($LASTEXITCODE -ne 0) { throw 'Yerel keystore sertifikasi okunamadi.' }
  $aabOutput = & $keytool -printcert -jarfile $destination 2>&1
  if ($LASTEXITCODE -ne 0) { throw 'AAB imza sertifikasi okunamadi.' }

  $keyFingerprint = ([regex]::Match(($keyOutput -join "`n"), 'SHA256:\s*([0-9A-F:]+)', 'IgnoreCase')).Groups[1].Value
  $aabFingerprint = ([regex]::Match(($aabOutput -join "`n"), 'SHA256:\s*([0-9A-F:]+)', 'IgnoreCase')).Groups[1].Value
  if (-not $keyFingerprint -or $keyFingerprint -ne $aabFingerprint) {
    throw 'AAB imzasi yerel keystore sertifikasi ile eslesmiyor.'
  }

  $hash = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash
  Write-Host "Yerel production AAB hazir: $destination"
  Write-Host "Play kod gosterme dosyasi hazir: $mappingDestination"
  Write-Host "SHA-256: $hash"
  Write-Host 'Imza sertifikasi yerel keystore ile eslesiyor.'
} finally {
  Remove-Item Env:\KPSS_UPLOAD_STORE_FILE -ErrorAction SilentlyContinue
  Remove-Item Env:\KPSS_UPLOAD_STORE_PASSWORD -ErrorAction SilentlyContinue
  Remove-Item Env:\KPSS_UPLOAD_KEY_ALIAS -ErrorAction SilentlyContinue
  Remove-Item Env:\KPSS_UPLOAD_KEY_PASSWORD -ErrorAction SilentlyContinue
  Remove-Item Env:\KPSS_KEYSTORE_PASSWORD -ErrorAction SilentlyContinue
  Remove-Item Env:\NODE_ENV -ErrorAction SilentlyContinue
  Remove-Item Env:\EXPO_USE_COMMUNITY_AUTOLINKING -ErrorAction SilentlyContinue

  if (Test-Path -LiteralPath $buildRoot) {
    $resolvedBuildRoot = (Resolve-Path -LiteralPath $buildRoot).Path
    $resolvedTempRoot = (Resolve-Path -LiteralPath $tempRoot).Path
    $safePrefix = $resolvedTempRoot + [IO.Path]::DirectorySeparatorChar + 'km-'
    if (-not $resolvedBuildRoot.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase)) {
      throw 'Gecici build dizini guvenlik kontrolunu gecemedi; otomatik silinmedi.'
    }
    $cleanupSucceeded = $false
    for ($attempt = 1; $attempt -le 5 -and -not $cleanupSucceeded; $attempt++) {
      try {
        Remove-Item -LiteralPath $resolvedBuildRoot -Recurse -Force -ErrorAction Stop
        $cleanupSucceeded = $true
      } catch {
        if ($attempt -lt 5) { Start-Sleep -Milliseconds 300 }
      }
    }
    if (-not $cleanupSucceeded) {
      Write-Warning "Gecici build dizini kilitli oldugu icin simdi silinemedi: $resolvedBuildRoot"
    }
  }

  $credentials = $null
  $keystore = $null
}
