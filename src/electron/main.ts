import { app, BrowserWindow, ipcMain } from 'electron';

import '../api/';
import { indexFrontFile } from '../util/constants';

class Main {
    private window!: BrowserWindow;

    private hudWindow: BrowserWindow | null = null;

    public init() {
        app.on('ready', this.createWindow);
        app.on('window-all-closed', this.onWindowAllClosed);
        app.on('activate', this.onActivate);

        ipcMain.on('open-hud', (e) => {
            if (!this.hudWindow) {
                this.hudWindow = new BrowserWindow({
                    movable: false,
                    resizable: false,
                    fullscreen: true,
                    alwaysOnTop: true,
                    titleBarStyle: 'hidden',
                    transparent: true,
                });

                this.hudWindow.loadURL('https://google.com/');
                this.hudWindow.setIgnoreMouseEvents(true);
                this.hudWindow.on('close', () => {
                    this.hudWindow = null;
                });

                this.hudWindow.show();
            }
        });
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

        console.log(indexFrontFile);

        this.window.loadURL('http://localhost:6779');
        // this.window.loadURL(
        //     url.format({
        //         pathname: indexFrontFile,
        //         protocol: 'file:',
        //         slashes: true,
        //     })
        // );
        this.window.maximize();
    }
}

new Main().init();
