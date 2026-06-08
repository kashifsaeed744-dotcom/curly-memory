@echo off
REM ============================================================================
REM MediaTek USB VCOM Driver Installation Script for Windows
REM ============================================================================
REM This script automates the installation of MediaTek USB VCOM drivers
REM Supports Windows 7, 8, 10, and 11
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ============================================================================
echo   MediaTek USB VCOM Driver Installation Script
echo ============================================================================
echo.

REM Check for Administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script requires Administrator privileges.
    echo Please run this script as Administrator.
    pause
    exit /b 1
)

echo [INFO] Running as Administrator... OK
echo.

REM Set driver paths
set DRIVER_DIR=%~dp0drivers\mediatek-vcom
set DRIVER_INF=%DRIVER_DIR%\mtk_vcom.inf
set DRIVER_EXE=%DRIVER_DIR%\InstallDriver.exe

echo [INFO] Looking for driver files...
echo [INFO] Expected driver directory: %DRIVER_DIR%
echo.

REM Check if driver directory exists
if not exist "%DRIVER_DIR%" (
    echo ERROR: Driver directory not found at %DRIVER_DIR%
    echo.
    echo Please ensure the following:
    echo 1. Download MediaTek USB VCOM drivers
    echo 2. Extract them to: %DRIVER_DIR%
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

echo [SUCCESS] Driver directory found!
echo.

REM Check for INF file
if exist "%DRIVER_INF%" (
    echo [INFO] Found driver INF file: mtk_vcom.inf
) else (
    echo [WARNING] Could not find mtk_vcom.inf
    echo [INFO] Searching for alternative INF files...
    for /f "delims=" %%f in ('dir /b "%DRIVER_DIR%\*.inf" 2^>nul') do (
        echo [FOUND] %%f
        set DRIVER_INF=%DRIVER_DIR%\%%f
    )
)

echo.
echo ============================================================================
echo   Installation Options
echo ============================================================================
echo.
echo 1. Install using automatic installer (if available)
echo 2. Install using Device Manager (manual)
echo 3. Disable Driver Signature Enforcement (Windows 8/10/11 only)
echo 4. View installed drivers
echo 5. Exit
echo.

set /p CHOICE="Enter your choice (1-5): "

if "%CHOICE%"=="1" goto AUTO_INSTALL
if "%CHOICE%"=="2" goto MANUAL_INSTALL
if "%CHOICE%"=="3" goto DISABLE_SIGNATURE
if "%CHOICE%"=="4" goto VIEW_DRIVERS
if "%CHOICE%"=="5" goto END
goto INVALID_CHOICE

:AUTO_INSTALL
echo.
echo [INFO] Attempting automatic installation...
if exist "%DRIVER_EXE%" (
    echo [INFO] Found InstallDriver.exe
    echo [INFO] Launching installer...
    call "%DRIVER_EXE%"
    goto CHECK_INSTALL
) else (
    echo [WARNING] InstallDriver.exe not found
    echo [INFO] Falling back to manual installation...
    goto MANUAL_INSTALL
)

:MANUAL_INSTALL
echo.
echo ============================================================================
echo   Manual Installation via Device Manager
echo ============================================================================
echo.
echo Steps:
echo 1. Open Device Manager (Win+X, then select Device Manager)
echo 2. Look for "Unknown Device" or "MTK Preloader" under "Other devices"
echo 3. Right-click on it and select "Update Driver"
echo 4. Select "Browse my computer for driver software"
echo 5. Navigate to: %DRIVER_DIR%
echo 6. Click "Next" and follow the prompts
echo.
echo Opening Device Manager...
devmgmt.msc
goto CHECK_INSTALL

:DISABLE_SIGNATURE
echo.
echo ============================================================================
echo   Disable Driver Signature Enforcement
echo ============================================================================
echo.
echo IMPORTANT: This requires a system restart!
echo.
echo This will allow installation of unsigned drivers.
echo.
set /p CONFIRM="Continue? (Y/N): "
if /i "%CONFIRM%"=="Y" (
    echo [INFO] Configuring system to disable driver signature enforcement...
    bcdedit /set testsigning on
    if %errorLevel% equ 0 (
        echo [SUCCESS] Driver signature enforcement disabled.
        echo [INFO] You must restart your computer for changes to take effect.
        echo.
        set /p RESTART="Restart now? (Y/N): "
        if /i "%RESTART%"=="Y" (
            shutdown /r /t 30 /c "Disabling driver signature enforcement. System will restart in 30 seconds."
        ) else (
            echo [INFO] Please restart manually later.
        )
    ) else (
        echo [ERROR] Failed to disable driver signature enforcement.
    )
) else (
    echo [INFO] Operation cancelled.
)
goto MENU

:VIEW_DRIVERS
echo.
echo ============================================================================
echo   Installed MediaTek Drivers
echo ============================================================================
echo.
echo Searching for MediaTek USB drivers in Device Manager...
echo.
pnputil /enum-devices /class "Ports" | findstr /i "mediatek mtk"
if %errorLevel% neq 0 (
    echo [INFO] No MediaTek drivers found in Ports class.
    echo [INFO] Device may not be connected or driver not yet installed.
)
echo.
pause
goto MENU

:CHECK_INSTALL
echo.
echo [INFO] Installation process completed.
echo [INFO] Checking Device Manager for MediaTek drivers...
echo.
devmgmt.msc
goto MENU

:INVALID_CHOICE
echo.
echo ERROR: Invalid choice. Please enter a number between 1 and 5.
echo.
goto MENU

:MENU
echo.
echo.
set /p RETURN="Press Enter to return to menu or type 'exit' to quit: "
if /i "%RETURN%"=="exit" goto END
cls
goto START

:END
echo.
echo ============================================================================
echo   Installation Complete
echo ============================================================================
echo.
echo Next steps:
echo 1. Connect your MediaTek device to the USB port
echo 2. Check Device Manager for "MediaTek PreLoader USB VCOM Port"
echo 3. If still showing as unknown device, repeat the manual installation
echo.
echo For troubleshooting, visit: https://github.com/kashifsaeed744-dotcom/curly-memory
echo.
pause
exit /b 0
