$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$keystoreName = 'kpss-mini-upload.jks'
$keystoreFile = Join-Path $projectRoot $keystoreName
$credentialsFile = Join-Path $projectRoot 'credentials.json'
$keyAlias = 'kpssmini-upload'

if (Test-Path -LiteralPath $keystoreFile -PathType Leaf) {
  throw "$keystoreName zaten var. Mevcut anahtari korumak icin islem durduruldu."
}

$keytoolCommand = Get-Command keytool -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -First 1
if (-not $keytoolCommand) {
  $keytoolCommand = Get-ChildItem -Path 'C:\Program Files\Eclipse Adoptium' -Recurse -Filter keytool.exe -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty FullName
}
if (-not $keytoolCommand) {
  throw 'Java keytool bulunamadi. Temurin JDK 21 kurulumu gerekli.'
}

$alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$password = -join ($bytes | ForEach-Object { $alphabet[$_ % $alphabet.Length] })
$rng.Dispose()

try {
  & $keytoolCommand -genkeypair -storetype PKCS12 -keystore $keystoreFile -storepass $password -keypass $password -alias $keyAlias -keyalg RSA -keysize 4096 -validity 10000 -dname 'CN=gearapps KPSS Mini, OU=Mobile, O=gearapps, L=Istanbul, ST=Istanbul, C=TR' -noprompt
  if ($LASTEXITCODE -ne 0) {
    throw 'Yeni Android imza anahtari olusturulamadi.'
  }

  $credentials = [ordered]@{
    android = [ordered]@{
      keystore = [ordered]@{
        keystorePath = $keystoreName
        keystorePassword = $password
        keyAlias = $keyAlias
        keyPassword = $password
      }
    }
  }
  $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
  [IO.File]::WriteAllText($credentialsFile, ($credentials | ConvertTo-Json -Depth 4), $utf8WithoutBom)
  Write-Host "Yeni imza anahtari ve yerel credentials.json olusturuldu: $keystoreName"
  Write-Host 'Parolalar credentials.json icindedir; simdi bir parola yoneticisine yedekleyin.'
} finally {
  $password = $null
  [Array]::Clear($bytes, 0, $bytes.Length)
}
