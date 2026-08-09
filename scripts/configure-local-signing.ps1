$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$keystoreFile = Join-Path $projectRoot 'gearapps-keystore.jks'
$credentialsFile = Join-Path $projectRoot 'credentials.json'

if (-not (Test-Path -LiteralPath $keystoreFile -PathType Leaf)) {
  throw 'gearapps-keystore.jks proje ana dizininde bulunamadi.'
}

$keyAlias = Read-Host 'Android key alias'
$storePasswordSecure = Read-Host 'Keystore password' -AsSecureString
$keyPasswordSecure = Read-Host 'Key password' -AsSecureString

$storePasswordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($storePasswordSecure)
$keyPasswordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($keyPasswordSecure)

try {
  $storePassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($storePasswordPointer)
  $keyPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($keyPasswordPointer)

  $credentials = [ordered]@{
    android = [ordered]@{
      keystore = [ordered]@{
        keystorePath = 'gearapps-keystore.jks'
        keystorePassword = $storePassword
        keyAlias = $keyAlias
        keyPassword = $keyPassword
      }
    }
  }

  $json = $credentials | ConvertTo-Json -Depth 4
  $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
  [IO.File]::WriteAllText($credentialsFile, $json, $utf8WithoutBom)
  Write-Host 'credentials.json guvenli olarak olusturuldu ve Git tarafindan yok sayiliyor.'
} finally {
  if ($storePasswordPointer -ne [IntPtr]::Zero) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($storePasswordPointer)
  }
  if ($keyPasswordPointer -ne [IntPtr]::Zero) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($keyPasswordPointer)
  }
  $storePassword = $null
  $keyPassword = $null
}
