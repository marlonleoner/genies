import { Component } from '@angular/core';

@Component({
    selector: 'genies-huds',
    standalone: true,
    imports: [],
    templateUrl: './huds.page.html',
    styleUrl: './huds.page.css'
})
export class HudsPage {
    private ipcRenderer?: any;

    constructor() {
        this.ipcRenderer = <any>window.require('electron/renderer').ipcRenderer;
    }

    openDevHud = () => {
        this.ipcRenderer?.send('open-hud', 'development');
    };
}
