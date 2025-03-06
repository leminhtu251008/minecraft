## How to build

This project uses a PowerShell script (`autobuild.ps1`) to automate the build process. The script supports a single mode: `build`.

### Prerequisites

- [WinRAR](https://www.win-rar.com/download.html) installed and accessible via `C:\Program Files\WinRAR\WinRAR.exe`
- [Git](https://git-scm.com/downloads) installed and accessible in your system's PATH

### Usage

Run the `autobuild.ps1` script with the `build` mode and output file name. Below are the details:

#### Build Mode

```powershell
.\autobuild.ps1 -output <output_file_name>
```

This mode performs a complete build, including downloading dependencies, compiling the code, and packaging the final product.
