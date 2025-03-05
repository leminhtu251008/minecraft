param (
    [string]$mode,
    [string]$output,
    [string[]]$files
)

$ignored_folders_and_files = @(".git", "build", "README.md", ".gitignore", ".gitattributes", "autobuild.ps1", "installer_gui", ".vscode", "LICENSE

function Copy-Source {
    param (
        [string[]]$folders_and_files,
        [string]$destination
    )

    if ($folders_and_files.Length -eq 0) {
        $items = Get-ChildItem -Path (Get-Location) -Depth 0 | Where-Object { $ignored_folders_and_files -notcontains $_.Name }
    } else {
        $items = $folders_and_files

    }

    foreach ($item in $items) {
        $destinationPath = Join-Path -Path $destination -ChildPath $item
        $destinationPath = Split-Path -Path $destinationPath -Parent
        if (-Not (Test-Path $destinationPath)) {
            New-Item -ItemType Directory -Path $destinationPath -Force
        }

        if (Test-Path $item -PathType Container) {
            Copy-Item -Path $item -Destination $destinationPath -Recurse -Force
        } elseif (Test-Path $item -PathType Leaf) {
            Copy-Item -Path $item -Destination $destinationPath -Force
        } else {
            Write-Error "Item $item does not exist."
            exit 1
        }
    }
}

function Get-ChangedFiles {
    $lastTag = git describe --tags --abbrev=0
    if (!$lastTag) {
        Write-Error "No tags found."
        exit 1
    }
    $changedFiles = git diff --name-only $lastTag HEAD
    $filteredFiles = $changedFiles | Where-Object { $ignored_folders_and_files -notcontains $_ }
    return $filteredFiles
}

$buildOutputDir = Join-Path -Path (Get-Location) -ChildPath "build/build-output"
if (-Not (Test-Path $buildOutputDir)) {
    New-Item -ItemType Directory -Path $buildOutputDir -Force
}

Remove-Item -Path $buildOutputDir\* -Recurse -Force

if ($mode -eq "full") {
    $folders = Get-ChildItem -Directory | ForEach-Object { $_.Name }
    $folders = $folders | Where-Object { $ignored_folders_and_files -notcontains $_ }
    Copy-Source -folders $folders -destination $buildOutputDir
} elseif ($mode -eq "update") {
    $changedFiles = Get-ChangedFiles
    Copy-Source -folders_and_files $changedFiles -destination $buildOutputDir
} elseif ($mode -eq "test") {
    Copy-Source -folders_and_files $files -destination $buildOutputDir
} else {
    Write-Error "Invalid mode specified. Use 'full', 'update', or 'test'."
    exit 1
}

$outputDir = Join-Path -Path (Get-Location) -ChildPath "build/output"
if (-Not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

$outputZipPath = Join-Path -Path $outputDir -ChildPath $output
if (Test-Path $outputZipPath) {
    Remove-Item -Path $outputZipPath -Force
}

$winRARPath = "C:\Program Files\WinRAR\WinRAR.exe"
$outputZipPath = Join-Path -Path $outputDir -ChildPath $output
$repoLocation = Get-Location
$arguments = @(
    "a",            
    "-ep1",         
    "-r",           
    $outputZipPath, 
    "*"             
)

Set-Location -Path $buildOutputDir
Start-Process -FilePath $winRARPath -ArgumentList $arguments -Wait
Set-Location -Path $repoLocation