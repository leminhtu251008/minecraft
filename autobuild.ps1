param ([string]$output)

$copied_folders = @(
    "config",
    "kubejs/assets",
    "kubejs/client_scripts",
    "kubejs/server_scripts",
    "kubejs/startup_scripts",
    "mods",
    "resourcepacks",
    "shaderpacks"
)

$copied_files = @("options.txt")

$sourceDir = Get-Location
$buildDir = Join-Path -Path $sourceDir -ChildPath "build/build-output"
$outputDir = Join-Path -Path $sourceDir -ChildPath "build/output"
$outputZipPath = Join-Path -Path $outputDir -ChildPath $output

function Copy-Source {
    if (-Not (Test-Path $buildDir)) { 
        New-Item -ItemType Directory -Path $buildDir -Force
    }

    # Remove all files and folders in the destination directory
    Get-ChildItem -Path $buildDir -Recurse | Remove-Item -Force -Recurse
    Start-Sleep -s 5

    foreach ($folder in $copied_folders) {
        $sourceFolder = Join-Path -Path $sourceDir -ChildPath $folder
        if ($folder -match "/") {
            $destinationFolder = Join-Path -Path $buildDir -ChildPath $folder.Split("/")[0]
        } else {
            $destinationFolder = $buildDir
        }

        if (-Not (Test-Path $destinationFolder)) {
            New-Item -ItemType Directory -Path $destinationFolder -Force
        }
        Copy-Item -Path $sourceFolder -Destination $destinationFolder -Recurse -Force
    }

    foreach ($file in $copied_files) {
        $sourceFile = Join-Path -Path $sourceDir -ChildPath $file
        $destinationFile = Join-Path -Path $buildDir -ChildPath $file
        Copy-Item -Path $sourceFile -Destination $destinationFile -Force
    }

    Start-Sleep -s 5
}

Copy-Source

if (-Not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

if (Test-Path $outputZipPath) {
    Remove-Item -Path $outputZipPath -Force
}

# Use Windows built-in zip
function Start-Compress {
    param (
        [string]$sourceDir,
        [string]$destinationZip
    )

    # Use Windows built-in zip
    $shell = New-Object -ComObject Shell.Application
    $zip = $shell.NameSpace($destinationZip)
    if (-Not $zip) {
        # Create the zip file if it does not exist
        New-Item -ItemType File -Path $destinationZip
        $zip = $shell.NameSpace($destinationZip)
    }
    $folder = $shell.NameSpace($sourceDir)

    Write-Host "Compressing $sourceDir to $destinationZip..."
    $zip.CopyHere($folder.Items(), 16)
    # Wait for the zip to finish, check every 0.1 seconds
    while ($zip.Items().Count -ne $folder.Items().Count) {
        Start-Sleep -Milliseconds 100
    }

    Write-Host "Compressed $sourceDir to $destinationZip."
    return
}

$repoLocation = Get-Location
Set-Location -Path $buildDir
Start-Compress -sourceDir $buildDir -destinationZip $outputZipPath
Set-Location -Path $repoLocation