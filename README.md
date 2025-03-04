## How to build

This project uses a PowerShell script (`autobuild.ps1`) to automate the build process. The script supports three modes: `full`, `update`, and `test`.

### Prerequisites

- [WinRAR](https://www.win-rar.com/download.html) installed and accessible via `C:\Program Files\WinRAR\WinRAR.exe`
- [Git](https://git-scm.com/downloads) installed and accessible in your system's PATH

### Usage

Run the `autobuild.ps1` script with the appropriate mode and output file name. Below are the details for each mode:

#### Full Mode

Copies all directories and files (except ignored ones) to `build/build-output` and creates a zip file in `build/output`.

```powershell
.\autobuild.ps1 -mode full -output version.zip
```

#### Update Mode

Compares the current commit with the HEAD of the main branch, copies only changed directories and files to `build/build-output`, and creates a zip file in `build/output`.

```powershell
.\autobuild.ps1 -mode update -output version.zip
```

#### Test Mode

Copies specified files and folders to `build/build-output` and creates a zip file in `build/output`.

```powershell
.\autobuild.ps1 -mode test -output version.zip -files @("config\example.toml", "mods\example.jar")
```

### Example

To run the script in full mode and create a zip file named `version.zip`:

```powershell
.\autobuild.ps1 -mode full -output version.zip
```

To run the script in update mode and create a zip file named `version.zip`:

```powershell
.\autobuild.ps1 -mode update -output version.zip
```

To run the script in test mode and create a zip file named `version.zip` with specific files:

```powershell
.\autobuild.ps1 -mode test -output version.zip -files @("config\example.toml", "mods\example.jar")
```

### Notes

- Ensure that the `WinRAR` executable is located at `C:\Program Files\WinRAR\WinRAR.exe`.
- Ensure that `Git` is installed and accessible in your system's PATH.
- The script will create the necessary directories (`build/build-output` and `build/output`) if they do not exist.
- The script will exclude files and directories listed in the `$ignored_folders_and_files` variable.