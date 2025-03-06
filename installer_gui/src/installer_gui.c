#include <shlobj.h>
#include <shlwapi.h>
#include <stdio.h>
#include <wininet.h>
#include <windows.h>

/* -- after windows.h -- */
#include <commctrl.h>
#include <mmsystem.h>
#include <shellapi.h>

#include "resource.h"

#define GIT_HUB_API_URL "https://api.github.com/repos/leminhtu251008/minecraft/releases/latest"

#define APP_DATA_DIR ".dongmeominecraft"
#define CONFIG_FILE APP_DATA_DIR "config.txt"

#define PROGRESS_UPDATE_INTERVAL 500

void SaveDirectoryPath(const char* directoryPath);
void LoadDirectoryPath(char* directoryPath, size_t size);
void DisplayInVietnameseFont(HWND hStaticText, const char* string);
void DeleteDirectory(const char* dirPath);
void DeleteOldFoldersAndFiles(const char* basePath);
BOOL IsValidMinecraftDirectory(const char* directory);
DWORD WINAPI DownloadThreadProc(LPVOID lpParam);
BOOL ExtractZipFile(const char* zipFilePath, const char* extractToDirectory, HWND hWnd);
void HandleBrowseButton(HWND hWnd);
void HandleUpdateButton(HWND hWnd);
void HandleToggleMusicButton(HWND hWnd);
void AddControls(HWND);
LRESULT CALLBACK WindowProcedure(HWND, UINT, WPARAM, LPARAM);

BITMAP bm;
HFONT hVietnameseFont;
BOOL isAppRunning = TRUE;
BOOL isMusicPlaying = TRUE;
HBITMAP hBackground = NULL;

char minecraftDirectory[MAX_PATH] = "";
const char* old_folders_and_files[] = {
    "config/",
    "kubejs/",
    "mods/",
    "resourcepacks/",
    "shaderpacks/",
    "options.txt"
};


void SaveDirectoryPath(const char* directoryPath)
{
    FILE* file = NULL;
    char configFilePath[MAX_PATH] = {0};

    snprintf(configFilePath, MAX_PATH, "%s\\%s", APP_DATA_DIR, CONFIG_FILE);
    CreateDirectory(APP_DATA_DIR, NULL);
    file = fopen(configFilePath, "w");
    if (file)
    {
        fprintf(file, "%s\n", directoryPath);
        fclose(file);
    }
}

void LoadDirectoryPath(char* directoryPath, size_t size)
{
    size_t len = 0;
    FILE *file = NULL;
    char configFilePath[MAX_PATH] = {0};

    snprintf(configFilePath, MAX_PATH, "%s\\%s", APP_DATA_DIR, CONFIG_FILE);    
    file = fopen(configFilePath, "r");
    if (file)
    {
        fgets(directoryPath, size, file);
        len = strlen(directoryPath);
        if (len > 0 && directoryPath[len - 1] == '\n')
        {
            directoryPath[len - 1] = '\0';
        }

        fclose(file);
    }
}

void DisplayInVietnameseFont(HWND hType, const char* string)
{
    wchar_t wProgressText[100];
    MultiByteToWideChar(CP_UTF8, 0, string, -1, wProgressText, 100);

    SetWindowTextW(hType, wProgressText);
    SendMessage(hType, WM_SETFONT, (WPARAM)hVietnameseFont, TRUE);

    InvalidateRect(hType, NULL, TRUE);
}

BOOL ExtractZipFile(const char* zipFilePath,
                    const char* extractToDirectory,
                    HWND hStaticText)
{
    int dotIndex = 0;
    char command[MAX_PATH] = {0};
    char tempOutputFile[MAX_PATH] = {0};
    char fullCommand[MAX_PATH * 2] = {0};
    const char* dots[] = {
        "Đang Cài Đặt .",
        "Đang Cài Đặt ..",
        "Đang Cài Đặt ...",
        "Đang Cài Đặt ...."
    };

    DWORD exitCode = 0;
    STARTUPINFO si = {0};
    PROCESS_INFORMATION pi = {0};

    snprintf(command, MAX_PATH,
             "powershell -command \"Expand-Archive -Path '%s' \
             -DestinationPath '%s' -Force\"",
             zipFilePath,
             extractToDirectory);

    GetTempFileName(".", "out", 0, tempOutputFile);

    snprintf(fullCommand, sizeof(fullCommand),
             "cmd /c \"%s > %s 2>&1\"",
             command, tempOutputFile);

    si.cb = sizeof(STARTUPINFO);
    si.dwFlags |= STARTF_USESHOWWINDOW;
    si.wShowWindow = SW_HIDE;

    if (!CreateProcess(NULL, fullCommand, NULL, NULL, FALSE, 0, NULL, NULL, &si, &pi)) {
        MessageBoxW(
            NULL,
            L"Không thể giải nén tệp ZIP bằng công cụ ZIP của Windows",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        return FALSE;
    }

    while (GetExitCodeProcess(pi.hProcess, &exitCode) && exitCode == STILL_ACTIVE) {
        DisplayInVietnameseFont(hStaticText, dots[dotIndex]);
        dotIndex = (dotIndex + 1) % 4;
        Sleep(PROGRESS_UPDATE_INTERVAL);
    }

    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);

    DeleteFile(tempOutputFile);

    DisplayInVietnameseFont(hStaticText, "Cài Đặt Hoàn Tất!");
    
    return TRUE;
}

void DeleteDirectory(const char* dirPath)
{
    WIN32_FIND_DATA findFileData;
    HANDLE hFind = INVALID_HANDLE_VALUE;
    char dirSpec[MAX_PATH] = {0};
    char filePath[MAX_PATH] = {0};

    strncpy(dirSpec, dirPath, MAX_PATH);
    strncat(dirSpec, "\\*", MAX_PATH - strlen(dirSpec) - 1);

    hFind = FindFirstFile(dirSpec, &findFileData);

    if (hFind != INVALID_HANDLE_VALUE) {
        do
        {
            if (strcmp(findFileData.cFileName, ".") != 0 &&
                strcmp(findFileData.cFileName, "..") != 0)
            {
                snprintf(filePath, MAX_PATH, "%s\\%s", dirPath, findFileData.cFileName);
                findFileData.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY ?
                    DeleteDirectory(filePath) : DeleteFile(filePath);
            }
        }
        while (FindNextFile(hFind, &findFileData) != 0);

        FindClose(hFind);

        RemoveDirectory(dirPath);
    }

    return;
}

void DeleteOldFoldersAndFiles(const char* basePath)
{
    char path[MAX_PATH] = {0};
    int len = sizeof(old_folders_and_files) / sizeof(old_folders_and_files[0]);
    for (int i = 0; i < len; i++)
    {
        snprintf(path, MAX_PATH, "%s\\%s", basePath, old_folders_and_files[i]);
        PathIsDirectory(path) ? DeleteDirectory(path) : DeleteFile(path);
    }
}

BOOL CheckExtractSuccess(const char* extractToDirectory)
{
    char path[MAX_PATH] = {0};
    int len = sizeof(old_folders_and_files) / sizeof(old_folders_and_files[0]);
    for (int i = 0; i < len; i++)
    {
        snprintf(path, MAX_PATH, "%s\\%s", extractToDirectory, old_folders_and_files[i]);
        if (!PathFileExists(path)) return FALSE;
    }
    return TRUE;
}


DWORD WINAPI DownloadThreadProc(LPVOID lpParam)
{
    BOOL bResult = FALSE;

    DWORD bytesRead = 0;
    DWORD totalBytesRead = 0;
    DWORD fileSize = 0;
    DWORD bytesWritten = 0;
    DWORD lastUpdateTime = GetTickCount();
    DWORD currentTime = 0;

    HANDLE hFile = INVALID_HANDLE_VALUE;

    HINTERNET hInternet = NULL;
    HINTERNET hConnect = NULL;
    HINTERNET hDownload = NULL;

    HWND hWnd = (HWND)lpParam;
    HWND hStaticText = GetDlgItem(hWnd, IDC_STATIC_TEXT);

    LARGE_INTEGER fileSizeExisting = {0};

    char buffer[4096] = {0};
    char latestReleaseUrl[MAX_PATH] = {0};
    char version[MAX_PATH] = {0};
    char exePath[MAX_PATH] = {0};
    char tempPath[MAX_PATH] = {0};
    char tempFilePath[MAX_PATH] = {0};
    char progressText[100] = {0};

    char* urlStart = NULL;
    char* sizeStart = NULL;
    char* tagStart = NULL;
    char* lastSlash = NULL;

    EnableWindow(GetDlgItem(hWnd, IDC_UPDATE_BUTTON), FALSE);
    EnableWindow(GetDlgItem(hWnd, IDC_BROWSE_BUTTON), FALSE);

    if (strlen(minecraftDirectory) == 0) {
        MessageBoxW(
            hWnd,
            L"Thư mục Minecraft chưa được thiết lập. "
            L"Vui lòng thiết lập thư mục trước khi tải về.",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        EnableWindow(GetDlgItem(hWnd, IDC_UPDATE_BUTTON), TRUE);
        EnableWindow(GetDlgItem(hWnd, IDC_BROWSE_BUTTON), TRUE);
        return 0;
    }

    if (!IsValidMinecraftDirectory(minecraftDirectory)) {
        MessageBoxW(
            hWnd,
            L"Thư mục Minecraft không hợp lệ",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        EnableWindow(GetDlgItem(hWnd, IDC_UPDATE_BUTTON), TRUE);
        EnableWindow(GetDlgItem(hWnd, IDC_BROWSE_BUTTON), TRUE);
        return 0;
    }

    hInternet = InternetOpen(
        "GitHub Latest Release",
        INTERNET_OPEN_TYPE_PRECONFIG,
        NULL,
        NULL,
        0
    );
    if (hInternet == NULL) {
        MessageBoxW(
            hWnd,
            L"Không thể khởi tạo WinINet",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        goto cleanup;
    }

    hConnect = InternetOpenUrl(
        hInternet,
        GIT_HUB_API_URL,
        NULL,
        0,
        INTERNET_FLAG_RELOAD,
        0
    );
    if (hConnect == NULL) {
        MessageBoxW(
            hWnd,
            L"Không thể kết nối đến GitHub API",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        goto cleanup;
    }

    bResult = InternetReadFile(
        hConnect,
        buffer,
        sizeof(buffer) - 1,
        &bytesRead
    );
    if (!bResult || bytesRead == 0) {
        MessageBoxW(
            hWnd,
            L"Không thể đọc phản hồi từ GitHub API",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        goto cleanup;
    }

    buffer[bytesRead] = '\0';

    urlStart = strstr(buffer, "\"browser_download_url\":\"");
    if (urlStart) {
        urlStart += strlen("\"browser_download_url\":\"");
        char* urlEnd = strchr(urlStart, '\"');
        if (urlEnd) {
            strncpy(latestReleaseUrl, urlStart, urlEnd - urlStart);
            latestReleaseUrl[urlEnd - urlStart] = '\0';
        }
    }

    sizeStart = strstr(buffer, "\"size\":");
    if (sizeStart) {
        sizeStart += strlen("\"size\":");
        fileSize = strtoul(sizeStart, NULL, 10);
    }

    tagStart = strstr(buffer, "\"tag_name\":\"");
    if (tagStart) {
        tagStart += strlen("\"tag_name\":\"");
        char* tagEnd = strchr(tagStart, '\"');
        if (tagEnd) {
            strncpy(version, tagStart, tagEnd - tagStart);
            version[tagEnd - tagStart] = '\0';
        }
    }

    if (strlen(latestReleaseUrl) == 0 ||
        strlen(version) == 0 ||
        fileSize == 0) {
        MessageBoxW(
            hWnd,
            L"Không thể phân tích URL tải về, phiên bản hoặc kích thước tệp",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        goto cleanup;
    }

    GetModuleFileName(NULL, exePath, MAX_PATH);
    lastSlash = strrchr(exePath, '\\');
    if (lastSlash) {
        *(lastSlash + 1) = '\0';
    }

    snprintf(tempPath, MAX_PATH, "%s%s\\", exePath, APP_DATA_DIR);
    CreateDirectory(tempPath, NULL);

    snprintf(tempFilePath, MAX_PATH, "%srelease-dongmeo-rpg-%s.zip", tempPath, version);
    hFile = CreateFile(
        tempFilePath,
        GENERIC_READ,
        FILE_SHARE_READ,
        NULL,
        OPEN_EXISTING,
        FILE_ATTRIBUTE_NORMAL,
        NULL
    );
    if (hFile != INVALID_HANDLE_VALUE) {
        if (GetFileSizeEx(hFile, &fileSizeExisting)) {
            if (fileSizeExisting.QuadPart == fileSize) {
                CloseHandle(hFile);
                goto extract;
            }
        }

        CloseHandle(hFile);
    }

    hDownload = InternetOpenUrl(
        hInternet,
        latestReleaseUrl,
        NULL,
        0,
        INTERNET_FLAG_RELOAD,
        0
    );
    if (hDownload == NULL) {
        MessageBoxW(
            hWnd,
            L"Không thể mở URL tải về",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        goto cleanup;
    }

    hFile = CreateFile(
        tempFilePath,
        GENERIC_WRITE,
        0,
        NULL,
        CREATE_ALWAYS,
        FILE_ATTRIBUTE_NORMAL,
        NULL
    );
    if (hFile == INVALID_HANDLE_VALUE) {
        MessageBoxW(
            hWnd,
            L"Không thể tạo tệp",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        goto cleanup;
    }

    while (InternetReadFile(hDownload, buffer, sizeof(buffer), &bytesRead) && bytesRead > 0) {
        WriteFile(hFile, buffer, bytesRead, &bytesWritten, NULL);
        totalBytesRead += bytesRead;

        currentTime = GetTickCount();
        if (currentTime - lastUpdateTime >= PROGRESS_UPDATE_INTERVAL) {
            lastUpdateTime = currentTime;
            if (totalBytesRead < 1024)
            {
                snprintf(
                    progressText,
                    sizeof(progressText),
                    "Đang Tải: %lu B",
                    totalBytesRead
                );
            }
            else if (totalBytesRead < 1024 * 1024)
            {
                snprintf(
                    progressText,
                    sizeof(progressText),
                    "Đang Tải: %.2f KB",
                    totalBytesRead / 1024.0
                );
            }
            else if
            (totalBytesRead < 1024 * 1024 * 1024)
            {
                snprintf(
                    progressText,
                    sizeof(progressText),
                    "Đang Tải: %.2f MB",
                    totalBytesRead / (1024.0 * 1024.0)
                );
            }
            else
            {
                snprintf(
                    progressText,
                    sizeof(progressText),
                    "Đang Tải: %.2f GB",
                    totalBytesRead / (1024.0 * 1024.0 * 1024.0)
                );
            }

            DisplayInVietnameseFont(hStaticText, progressText);
        }
    }

    CloseHandle(hFile);
    InternetCloseHandle(hDownload);

extract:
    DeleteOldFoldersAndFiles(minecraftDirectory);
    if (!ExtractZipFile(tempFilePath, minecraftDirectory, hStaticText)) {
        MessageBoxW(
            hWnd,
            L"Không thể giải nén tệp ZIP",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        goto cleanup;
    }

    if (!CheckExtractSuccess(minecraftDirectory)) {
        MessageBoxW(
            hWnd,
            L"Giải nén không thành công. Vui lòng thử lại với quyền admin!",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
        goto cleanup;
    }

    DeleteFile(tempFilePath);

cleanup:
    if (hFile != INVALID_HANDLE_VALUE)
    {
        CloseHandle(hFile);
    }

    if (hDownload)
    {
        InternetCloseHandle(hDownload);
    }

    if (hConnect)
    {
        InternetCloseHandle(hConnect);
    }

    if (hInternet)
    {
        InternetCloseHandle(hInternet);
    }

    EnableWindow(GetDlgItem(hWnd, IDC_UPDATE_BUTTON), TRUE);
    EnableWindow(GetDlgItem(hWnd, IDC_BROWSE_BUTTON), TRUE);
    return 0;
}

void HandleBrowseButton(HWND hWnd)
{
    BROWSEINFO bi = {0};
    bi.lpszTitle = "Chọn Thư Mục Minecraft";
    LPITEMIDLIST pidl = SHBrowseForFolder(&bi);
    HWND hTextBox = GetDlgItem(hWnd, IDC_TEXTBOX);

    if (pidl != 0)
    {
        SHGetPathFromIDList(pidl, minecraftDirectory);
        SetWindowText(hTextBox, minecraftDirectory);
        SendMessage(hTextBox, WM_SETFONT, (WPARAM)hVietnameseFont, TRUE);
        SaveDirectoryPath(minecraftDirectory);
    }
}

void HandleUpdateButton(HWND hWnd)
{
    HANDLE hThread = CreateThread(
        NULL,
        0,
        DownloadThreadProc,
        hWnd,
        0,
        NULL
    );

    if (hThread == NULL) {
        MessageBoxW(
            hWnd,
            L"Không thể tạo luồng tải về",
            L"Lỗi",
            MB_OK | MB_ICONERROR
        );
    }
    else
    {
        CloseHandle(hThread);
    }
}

void HandleToggleMusicButton(HWND hWnd)
{
    HRSRC hRes = NULL;
    HGLOBAL hResData = NULL;

    void* pResData = NULL;

    HWND hToggleMusicButton = GetDlgItem(hWnd, IDC_TOGGLE_MUSIC_BUTTON);

    if (isMusicPlaying)
    {
        PlaySound(NULL, 0, 0);
        isMusicPlaying = FALSE;
    }
    else
    {
        hRes = FindResource(NULL, MAKEINTRESOURCE(IDR_MUSIC1), "WAVE");
        if (hRes)
        {
            hResData = LoadResource(NULL, hRes);
            if (hResData)
            {
                pResData = LockResource(hResData);
                if (pResData)
                {
                    PlaySound(
                        (LPCSTR)pResData,
                        NULL,
                        SND_MEMORY | SND_ASYNC | SND_LOOP
                    );
                }
            }
        }
        isMusicPlaying = TRUE;
    }

    InvalidateRect(hToggleMusicButton, NULL, TRUE);
}

BOOL IsValidMinecraftDirectory(const char* directory)
{
    char testPath[MAX_PATH];
    snprintf(testPath, MAX_PATH, "%s\\launcher_profiles.json", directory);
    return GetFileAttributes(testPath) != INVALID_FILE_ATTRIBUTES;
}


LRESULT CALLBACK WindowProcedure(HWND hWnd,
                                 UINT msg,
                                 WPARAM wp,
                                 LPARAM lp)
{
    switch (msg)
    {
    case WM_COMMAND:
    {
        switch (wp)
        {
        case IDC_BROWSE_BUTTON:
            HandleBrowseButton(hWnd);
            break;
        case IDC_UPDATE_BUTTON:
            HandleUpdateButton(hWnd);
            break;
        case IDC_TOGGLE_MUSIC_BUTTON:
            HandleToggleMusicButton(hWnd);
            break;
        }
    }
    break;
    case WM_CREATE:
        AddControls(hWnd);
        break;
    case WM_SIZE:
    {
        RECT rect = {0};
        HWND hUpdateButton = GetDlgItem(hWnd, IDC_UPDATE_BUTTON);
        HWND hToggleMusicButton = GetDlgItem(hWnd, IDC_TOGGLE_MUSIC_BUTTON);

        GetClientRect(hWnd, &rect);

        SetWindowPos(hUpdateButton, NULL, 20, 60, 100, 30, SWP_NOZORDER);
        SetWindowPos(hToggleMusicButton, NULL, 20, 100, 100, 30, SWP_NOZORDER);

        InvalidateRect(hWnd, NULL, TRUE);
    }
    break;
    case WM_GETMINMAXINFO:
    {
        MINMAXINFO* mmi = (MINMAXINFO*)lp;

        mmi->ptMinTrackSize.x = 1400;
        mmi->ptMinTrackSize.y = 768;
    }
    break;
    case WM_PAINT:
    {
        PAINTSTRUCT ps;
        HDC hdc = BeginPaint(hWnd, &ps);
        HDC hdcMem = CreateCompatibleDC(hdc);
        HBITMAP hbmOld = (HBITMAP)SelectObject(hdcMem, hBackground);
        HFONT hOldFont = NULL;
        RECT rect = {0};
        SIZE textSize = {0};

        const wchar_t* watermarkText = L"Tạo Nên Bởi Lunar Stellar";
    
        GetClientRect(hWnd, &rect);
        StretchBlt(
            hdc,
            0,
            0,
            rect.right,
            rect.bottom,
            hdcMem,
            0,
            0,
            bm.bmWidth,
            bm.bmHeight,
            SRCCOPY
        );
        SelectObject(hdcMem, hbmOld);
        DeleteDC(hdcMem);

        SetTextColor(hdc, RGB(255, 255, 255));
        SetBkMode(hdc, TRANSPARENT);
        hOldFont = (HFONT)SelectObject(hdc, hVietnameseFont);
        
        GetTextExtentPoint32W(
            hdc,
            watermarkText,
            wcslen(watermarkText),
            &textSize
        );
        TextOutW(
            hdc,
            rect.right - textSize.cx - 10,
            rect.bottom - textSize.cy - 10,
            watermarkText,
            wcslen(watermarkText)
        );
        SelectObject(hdc, hOldFont);

        EndPaint(hWnd, &ps);
    }
    break;
    case WM_DRAWITEM:
    {
        LPDRAWITEMSTRUCT lpDrawItem = (LPDRAWITEMSTRUCT)lp;
        if (lpDrawItem->CtlID == IDC_BROWSE_BUTTON ||
            lpDrawItem->CtlID == IDC_UPDATE_BUTTON ||
            lpDrawItem->CtlID == IDC_TOGGLE_MUSIC_BUTTON ||
            lpDrawItem->CtlID == IDC_STATIC_TEXT ||
            lpDrawItem->CtlID == IDC_TEXTBOX)
        {
            HDC hdc = lpDrawItem->hDC;
            RECT rect = lpDrawItem->rcItem;
            HBRUSH hBrush = NULL;
            HPEN hPen = NULL;
            HFONT hOldFont = NULL;

            wchar_t buttonText[100] = {0};
            SetBkMode(hdc, TRANSPARENT);

            hBrush = CreateSolidBrush(RGB(0, 122, 204));
            FillRect(hdc, &rect, hBrush);

            hPen = CreatePen(PS_SOLID, 2, RGB(0, 122, 204));
            SelectObject(hdc, hPen);
            SelectObject(hdc, hBrush);
            RoundRect(hdc, rect.left, rect.top, rect.right, rect.bottom, 20, 20);
            DeleteObject(hPen);
            DeleteObject(hBrush);

            SetTextColor(hdc, RGB(255, 255, 255));
            
            switch (lpDrawItem->CtlID) {
                case IDC_TOGGLE_MUSIC_BUTTON:
                    wcscpy(buttonText, isMusicPlaying ? L"Tắt Nhạc" : L"Bật Nhạc");
                    break;
                default:
                    GetWindowTextW(
                        lpDrawItem->hwndItem,
                        buttonText,
                        sizeof(buttonText) / sizeof(buttonText[0])
                    );
                    break;
            }

            hOldFont = (HFONT)SelectObject(hdc, hVietnameseFont);
            DrawTextW(
                hdc,
                buttonText,
                -1,
                &rect,
                DT_CENTER | DT_VCENTER | DT_SINGLELINE
            );
            SelectObject(hdc, hOldFont);

            if (lpDrawItem->itemState & ODS_SELECTED)
            {
                DrawFocusRect(hdc, &rect);
            }
        }
    }
    break;
    case WM_CLOSE:
        isAppRunning = FALSE;
        DestroyWindow(hWnd);
        break;
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    default:
        return DefWindowProcW(hWnd, msg, wp, lp);
    }

    return 0;
}

void AddControls(HWND hWnd)
{
    HWND hBrowseButton = NULL;
    HWND hUpdateButton = NULL;
    HWND hToggleMusicButton = NULL;
    HWND hTextBox = NULL;
    HWND hStaticText = NULL;
    
    hBrowseButton = CreateWindowW(
        L"Button",
        L"Duyệt",
        WS_VISIBLE | WS_CHILD | WS_BORDER | BS_OWNERDRAW,
        20, 20, 100, 30,
        hWnd,
        (HMENU)IDC_BROWSE_BUTTON,
        NULL, NULL
    );
    SendMessage(hBrowseButton, WM_SETFONT, (WPARAM)hVietnameseFont, TRUE);

    hUpdateButton = CreateWindowW(
        L"Button",
        L"Cập Nhật",
        WS_VISIBLE | WS_CHILD | WS_BORDER | BS_OWNERDRAW,
        20, 60, 100, 30,
        hWnd,
        (HMENU)IDC_UPDATE_BUTTON,
        NULL, NULL
    );
    SendMessage(hUpdateButton, WM_SETFONT, (WPARAM)hVietnameseFont, TRUE);

    hToggleMusicButton = CreateWindowW(
        L"Button",
        L"Tắt Nhạc",
        WS_VISIBLE | WS_CHILD | WS_BORDER | BS_OWNERDRAW,
        20, 100, 100, 30,
        hWnd,
        (HMENU)IDC_TOGGLE_MUSIC_BUTTON,
        NULL, NULL
    );
    SendMessage(hToggleMusicButton, WM_SETFONT, (WPARAM)hVietnameseFont, TRUE);

    hTextBox = CreateWindowW(
        L"Button",
        NULL,
        WS_VISIBLE | WS_CHILD | BS_OWNERDRAW,
        140, 20, 200, 30,
        hWnd,
        (HMENU)IDC_TEXTBOX,
        NULL, NULL
    );
    SendMessage(hTextBox, WM_SETFONT, (WPARAM)hVietnameseFont, TRUE);

    hStaticText = CreateWindowW(
        L"Button",
        L"Thông Tin Tải Về",
        WS_VISIBLE | WS_CHILD | BS_OWNERDRAW,
        140, 60, 200, 30,
        hWnd,
        (HMENU)IDC_STATIC_TEXT,
        NULL, NULL
    );
    SendMessage(hStaticText, WM_SETFONT, (WPARAM)hVietnameseFont, TRUE);
}

int WINAPI WinMain(HINSTANCE hInst, HINSTANCE hPrevInst, LPSTR args, int ncmdshow)
{
    WNDCLASSW wc = {0};
    HWND hWnd = NULL;
    HWND hTextBox = NULL;
    HRSRC hRes = NULL;
    HGLOBAL hResData = NULL;

    void *pResData = NULL;
    MSG msg = {0};

    wc.hbrBackground = (HBRUSH)COLOR_WINDOW;
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    wc.hInstance = hInst;
    wc.lpszClassName = L"myWindowClass";
    wc.lpfnWndProc = WindowProcedure;
    wc.hIcon = LoadIcon(hInst, MAKEINTRESOURCE(IDI_APP_ICON));

    if (!RegisterClassW(&wc))
    {
        return -1;
    }

    hBackground = LoadBitmap(hInst, MAKEINTRESOURCE(IDB_BACKGROUND));
    if (hBackground == NULL)
    {
        MessageBoxW(
            NULL,
            L"Không thể tải ảnh nền",
            L"Error",
            MB_OK | MB_ICONERROR
        );
        return -1;
    }

    GetObject(hBackground, sizeof(bm), &bm);
    LoadDirectoryPath(minecraftDirectory, sizeof(minecraftDirectory));
    hWnd = CreateWindowW(
        L"myWindowClass",
        L"Động Mèo Minecraft",
        WS_OVERLAPPEDWINDOW | WS_VISIBLE,
        100, 100, 1400, 768,
        NULL, NULL, hInst, NULL
    );

    if (hWnd == NULL)
    {
        return -1;
    }

    hVietnameseFont = CreateFont(
        20, 0, 0, 0,
        FW_BOLD, FALSE, FALSE, FALSE,
        VIETNAMESE_CHARSET,
        OUT_OUTLINE_PRECIS,
        CLIP_DEFAULT_PRECIS,
        CLEARTYPE_QUALITY,
        VARIABLE_PITCH,
        TEXT("Arial")
    );

    hTextBox = GetDlgItem(hWnd, IDC_TEXTBOX);
    SetWindowText(hTextBox, minecraftDirectory);
    SendMessage(hTextBox, WM_SETFONT, (WPARAM)hVietnameseFont, TRUE);

    hRes = FindResource(NULL, MAKEINTRESOURCE(IDR_MUSIC1), "WAVE");
    if (hRes)
    {
        hResData = LoadResource(NULL, hRes);
        if (hResData)
        {
            pResData = LockResource(hResData);
            if (pResData)
            {
                PlaySound(
                    (LPCSTR)pResData,
                    NULL,
                    SND_MEMORY | SND_ASYNC | SND_LOOP
                );
            }
        }
    }

    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    PlaySound(NULL, 0, 0);
    DeleteObject(hVietnameseFont);

    return 0;
}