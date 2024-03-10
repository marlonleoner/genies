import { app, BrowserWindow } from 'electron';

import '../api/';

class Main {
    private window!: BrowserWindow;

    public init() {
        app.on('ready', this.createWindow);
        app.on('window-all-closed', this.onWindowAllClosed);
        app.on('activate', this.onActivate);
    }

    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    private onActivate() {
        if (!this.window) {
            this.createWindow();
        }
    }

    private createWindow() {
        this.window = new BrowserWindow({
            height: 600,
            width: 800,
            title: 'Genies',
            frame: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
            },
        });

        this.window.loadURL('http://localhost:6779');
        this.window.maximize();
    }
}

new Main().init();
