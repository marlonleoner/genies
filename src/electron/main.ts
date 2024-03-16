import { app, BrowserWindow, ipcMain } from 'electron';

import '../api/';

import { GlobalEmitter } from '../api/lib/emitter';

const receive = (event: string, cb: (...arg: any) => void) => {
    console.log(`configurando emitter: ${event} - ${cb}`);
};

class Main {
    private window!: BrowserWindow;

    private hudWindow: BrowserWindow | null = null;

    public init() {
        app.on('ready', this.createWindow);
        app.on('window-all-closed', this.onWindowAllClosed);
        app.on('activate', this.onActivate);

        ipcMain.on('open-hud', async (e) => {
            if (!this.hudWindow) {
                this.hudWindow = new BrowserWindow({
                    movable: false,
                    resizable: false,
                    fullscreen: true,
                    alwaysOnTop: true,
                    titleBarStyle: 'hidden',
                    transparent: true
                });

                this.hudWindow.webContents.executeJavaScript(`
                    window.ipc = {
                        send: function(event, data) {
                            // let ipc = windown.require('electron').ipcRenderer;
                            // ipc.send(event, data);
                            console.log('send', event, data);
                        },
                        receive: ${receive}
                    };
                `);

                this.hudWindow.loadURL('http://localhost:4200');
                this.hudWindow.setIgnoreMouseEvents(true);
                this.hudWindow.on('close', () => {
                    this.hudWindow = null;
                });

                this.hudWindow.show();
            }
        });

        GlobalEmitter.on('raw', (raw) => {
            console.log('raw', raw);
        });
    }

    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            this.hudWindow?.close();
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
            width: 800,
            minWidth: 1280,
            height: 600,
            minHeight: 960,
            frame: false,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true
            }
        });
        this.window.loadURL('http://localhost:6779');
        this.window.maximize();
        this.window.webContents.setVisualZoomLevelLimits(1, 1);
    }
}

new Main().init();
