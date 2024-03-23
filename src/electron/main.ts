import { BrowserWindow, app, ipcMain } from 'electron';

import '../api/';

var window: BrowserWindow | null = null;

var hudWindow: BrowserWindow | null = null;

const createWindow = () => {
    window = new BrowserWindow({
        width: 800,
        minWidth: 1280,
        height: 600,
        minHeight: 960,
        center: true,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    });
    window.on('close', () => {
        window = null;
        if (hudWindow) {
            hudWindow.close();
            hudWindow = null;
        }
    });
    window.loadURL('http://localhost:6779');
    window.webContents.setVisualZoomLevelLimits(1, 1);

    ipcMain.on('@GHM/CLOSE_APP', () => {
        window?.close();
    });

    ipcMain.on('@GHM/MAXIMIZE_APP', () => {
        if (!window) return;
        if (window.isMaximized()) window.restore();
        else window.maximize();
    });

    ipcMain.on('@GHM/MINIMIZE_APP', () => {
        window?.minimize();
    });

    ipcMain.on('open-hud', async (event: any, hudName: string) => {
        if (hudWindow || !hudName) return;

        const hudURL = hudName === 'development' ? 'http://localhost:4200' : 'https://localhost:6779';

        hudWindow = new BrowserWindow({
            movable: false,
            resizable: false,
            fullscreen: true,
            alwaysOnTop: true,
            titleBarStyle: 'hidden',
            transparent: true
        });
        hudWindow.on('close', () => {
            hudWindow = null;
        });
        hudWindow.loadURL(hudURL);
        hudWindow.setIgnoreMouseEvents(true);
        hudWindow.show();
    });
};

const onWindowAllClosed = () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
};

const onActivate = () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
};

app.on('ready', createWindow);
app.on('window-all-closed', onWindowAllClosed);
app.on('activate', onActivate);
