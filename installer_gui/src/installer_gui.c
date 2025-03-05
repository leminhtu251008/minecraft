#include <windows.h>
#include <commdlg.h>
#include <shlobj.h>
#include <shellapi.h>
#include <stdio.h>
#include <mmsystem.h> // Include this header for PlaySound
#include "resource.h" // Include the resource header
#pragma comment(lib, "winmm.lib") // Link with the Windows multimedia library

#define IDC_BROWSE_BUTTON 101
#define IDC_UPDATE_BUTTON 102
#define IDC_NEW_INSTALL_BUTTON 103
#define IDC_TEXTBOX 104
#define IDC_TOGGLE_MUSIC_BUTTON 106

LRESULT CALLBACK WindowProcedure(HWND, UINT, WPARAM, LPARAM);

void AddControls(HWND);

char minecraftDirectory[MAX_PATH] = "";
char exampleZipPath[MAX_PATH] = "D:\\minecraft_dev\\build\\build-output\\config.zip";
BOOL isMusicPlaying = TRUE;
HBITMAP hBackground = NULL;
BITMAP bm;
HBRUSH hBrushEdit;

int WINAPI WinMain(HINSTANCE hInst, HINSTANCE hPrevInst, LPSTR args, int ncmdshow)
{
    WNDCLASSW wc = {0};

    wc.hbrBackground = (HBRUSH)COLOR_WINDOW;
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    wc.hInstance = hInst;
    wc.lpszClassName = L"myWindowClass";
    wc.lpfnWndProc = WindowProcedure;
    wc.hIcon = LoadIcon(hInst, MAKEINTRESOURCE(IDI_APP_ICON)); // Load the application icon

    if (!RegisterClassW(&wc))
        return -1;

    // Load background image
    hBackground = LoadBitmap(hInst, MAKEINTRESOURCE(IDB_BACKGROUND));
    if (hBackground == NULL) {
        MessageBoxW(NULL, L"Failed to load background image", L"Error", MB_OK | MB_ICONERROR);
        return -1;
    }

    // Get the dimensions of the background image
    GetObject(hBackground, sizeof(bm), &bm);

    // Create the window with the default size 1180x648
    HWND hWnd = CreateWindowW(L"myWindowClass", L"Động Mèo Minecraft", WS_OVERLAPPEDWINDOW | WS_VISIBLE, 100, 100, 1360, 780, NULL, NULL, hInst, NULL);

    // Play background music from resource
    HRSRC hRes = FindResource(NULL, MAKEINTRESOURCE(IDR_MUSIC1), "WAVE");
    if (hRes)
    {
        HGLOBAL hResData = LoadResource(NULL, hRes);
        if (hResData)
        {
            DWORD resSize = SizeofResource(NULL, hRes);
            void* pResData = LockResource(hResData);
            if (pResData)
            {
                PlaySound((LPCSTR)pResData, NULL, SND_MEMORY | SND_ASYNC | SND_LOOP);
            }
        }
    }

    MSG msg = {0};

    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // Stop and close the music when the application exits
    PlaySound(NULL, 0, 0);

    return 0;
}

void HandleUpdateButton(HWND hWnd)
{
    char command[MAX_PATH + 50];
    snprintf(command, sizeof(command), "x \"%s\" \"%s\" -y", exampleZipPath, minecraftDirectory);

    ShellExecute(NULL, "open", "WinRAR.exe", command, NULL, SW_HIDE);

    MessageBox(hWnd, "Zip file extracted successfully", "Info", MB_OK);
}

void HandleToggleMusicButton(HWND hWnd)
{
    if (isMusicPlaying)
    {
        PlaySound(NULL, 0, 0);
        SetWindowText(GetDlgItem(hWnd, IDC_TOGGLE_MUSIC_BUTTON), "Mở Nhạc");
        isMusicPlaying = FALSE;
    }
    else
    {
        HRSRC hRes = FindResource(NULL, MAKEINTRESOURCE(IDR_MUSIC1), "WAVE");
        if (hRes)
        {
            HGLOBAL hResData = LoadResource(NULL, hRes);
            if (hResData)
            {
                DWORD resSize = SizeofResource(NULL, hRes);
                void* pResData = LockResource(hResData);
                if (pResData)
                {
                    PlaySound((LPCSTR)pResData, NULL, SND_MEMORY | SND_ASYNC | SND_LOOP);
                }
            }
        }
        SetWindowText(GetDlgItem(hWnd, IDC_TOGGLE_MUSIC_BUTTON), "Stop Music");
        isMusicPlaying = TRUE;
    }
}

LRESULT CALLBACK WindowProcedure(HWND hWnd, UINT msg, WPARAM wp, LPARAM lp)
{
    switch (msg)
    {
    case WM_COMMAND:
        switch (wp)
        {
        case IDC_BROWSE_BUTTON:
        {
            BROWSEINFO bi = {0};
            bi.lpszTitle = "Select Minecraft Directory";
            LPITEMIDLIST pidl = SHBrowseForFolder(&bi);

            if (pidl != 0)
            {
                SHGetPathFromIDList(pidl, minecraftDirectory);
                SetWindowText(GetDlgItem(hWnd, IDC_TEXTBOX), minecraftDirectory);
            }
        }
        break;
        case IDC_UPDATE_BUTTON:
            HandleUpdateButton(hWnd);
            break;
        case IDC_NEW_INSTALL_BUTTON:
            MessageBox(hWnd, "New Install button clicked", "Info", MB_OK);
            break;
        case IDC_TOGGLE_MUSIC_BUTTON:
            HandleToggleMusicButton(hWnd);
            break;
        }
        break;
    case WM_CREATE:
        hBrushEdit = CreateSolidBrush(RGB(173, 216, 230)); // Light blue color
        AddControls(hWnd);
        break;
    case WM_SIZE:
    {
        // Resize controls based on new window size
        RECT rect;
        GetClientRect(hWnd, &rect);
        int width = rect.right;
        int height = rect.bottom;

        // Resize and reposition controls here if needed
        SetWindowPos(GetDlgItem(hWnd, IDC_UPDATE_BUTTON), NULL, 20, 60, 100, 30, SWP_NOZORDER);
        SetWindowPos(GetDlgItem(hWnd, IDC_NEW_INSTALL_BUTTON), NULL, 20, 100, 100, 30, SWP_NOZORDER);
        SetWindowPos(GetDlgItem(hWnd, IDC_TOGGLE_MUSIC_BUTTON), NULL, 20, 140, 100, 30, SWP_NOZORDER);

        // Invalidate the window to force a repaint
        InvalidateRect(hWnd, NULL, TRUE);
    }
    break;
    case WM_GETMINMAXINFO:
    {
        MINMAXINFO* mmi = (MINMAXINFO*)lp;
        mmi->ptMinTrackSize.x = 1360; // Minimum width
        mmi->ptMinTrackSize.y = 780;  // Minimum height
    }
    break;
    case WM_PAINT:
    {
        PAINTSTRUCT ps;
        HDC hdc = BeginPaint(hWnd, &ps);
        HDC hdcMem = CreateCompatibleDC(hdc);
        HBITMAP hbmOld = (HBITMAP)SelectObject(hdcMem, hBackground);
        RECT rect;
        GetClientRect(hWnd, &rect);
        StretchBlt(hdc, 0, 0, rect.right, rect.bottom, hdcMem, 0, 0, bm.bmWidth, bm.bmHeight, SRCCOPY);
        SelectObject(hdcMem, hbmOld);
        DeleteDC(hdcMem);
        EndPaint(hWnd, &ps);
    }
    break;
    case WM_DRAWITEM:
    {
        LPDRAWITEMSTRUCT lpDrawItem = (LPDRAWITEMSTRUCT)lp;
        if (lpDrawItem->CtlID == IDC_BROWSE_BUTTON || lpDrawItem->CtlID == IDC_UPDATE_BUTTON || lpDrawItem->CtlID == IDC_NEW_INSTALL_BUTTON || lpDrawItem->CtlID == IDC_TOGGLE_MUSIC_BUTTON)
        {
            HDC hdc = lpDrawItem->hDC;
            RECT rect = lpDrawItem->rcItem;
            SetBkMode(hdc, TRANSPARENT);

            // Clear the button area
            HBRUSH hBrush = CreateSolidBrush(RGB(0, 122, 204)); // Blue color
            FillRect(hdc, &rect, hBrush);

            // Draw the button background with rounded corners
            HPEN hPen = CreatePen(PS_SOLID, 2, RGB(0, 122, 204)); // Blue color
            SelectObject(hdc, hPen);
            SelectObject(hdc, hBrush);
            RoundRect(hdc, rect.left, rect.top, rect.right, rect.bottom, 20, 20); // Rounded corners
            DeleteObject(hPen);
            DeleteObject(hBrush);

            // Draw the button text
            SetTextColor(hdc, RGB(255, 255, 255)); // White color
            const wchar_t* buttonText = NULL;
            switch (lpDrawItem->CtlID) {
                case IDC_BROWSE_BUTTON:
                    buttonText = L"Duyệt";
                    break;
                case IDC_UPDATE_BUTTON:
                    buttonText = L"Cập Nhật";
                    break;
                case IDC_NEW_INSTALL_BUTTON:
                    buttonText = L"Cài Đặt Lại";
                    break;
                case IDC_TOGGLE_MUSIC_BUTTON:
                    buttonText = L"Nhạc";
                    break;
            }
            DrawTextW(hdc, buttonText, -1, &rect, DT_CENTER | DT_VCENTER | DT_SINGLELINE);

            if (lpDrawItem->itemState & ODS_SELECTED)
            {
                OffsetRect(&rect, 1, 1);
                DrawTextW(hdc, buttonText, -1, &rect, DT_CENTER | DT_VCENTER | DT_SINGLELINE);
            }
        }
    }
    break;
    case WM_CTLCOLOREDIT:
    {
        HDC hdcEdit = (HDC)wp;
        SetBkColor(hdcEdit, RGB(173, 216, 230)); // Light blue color
        SetTextColor(hdcEdit, RGB(0, 0, 0)); // Black text color
        return (INT_PTR)hBrushEdit;
    }
    break;
    case WM_DESTROY:
        DeleteObject(hBrushEdit);
        PostQuitMessage(0);
        break;
    default:
        return DefWindowProcW(hWnd, msg, wp, lp);
    }
    return 0;
}

void AddControls(HWND hWnd)
{
    CreateWindowW(L"Button", L"Duyệt", WS_VISIBLE | WS_CHILD | BS_OWNERDRAW, 20, 20, 100, 30, hWnd, (HMENU)IDC_BROWSE_BUTTON, NULL, NULL);
    CreateWindowW(L"Button", L"Cập Nhật", WS_VISIBLE | WS_CHILD | BS_OWNERDRAW, 20, 60, 100, 30, hWnd, (HMENU)IDC_UPDATE_BUTTON, NULL, NULL);
    CreateWindowW(L"Button", L"Cài Đặt Lại", WS_VISIBLE | WS_CHILD | BS_OWNERDRAW, 20, 100, 100, 30, hWnd, (HMENU)IDC_NEW_INSTALL_BUTTON, NULL, NULL);
    CreateWindowW(L"Button", L"Nhạc", WS_VISIBLE | WS_CHILD | BS_OWNERDRAW, 20, 140, 100, 30, hWnd, (HMENU)IDC_TOGGLE_MUSIC_BUTTON, NULL, NULL);
    CreateWindowW(L"Edit", L"", WS_VISIBLE | WS_CHILD | WS_BORDER, 140, 20, 300, 30, hWnd, (HMENU)IDC_TEXTBOX, NULL, NULL);
}