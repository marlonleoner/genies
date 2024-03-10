import { app, BrowserWindow } from 'electron';

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
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: false,
            },
        });

        this.window.loadURL('http://localhost:6779');
        this.window.maximize();
    }
}

new Main().init();
