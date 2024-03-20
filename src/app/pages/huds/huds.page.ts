import { Component } from '@angular/core';

@Component({
    selector: 'genies-huds',
    standalone: true,
    imports: [],
    templateUrl: './huds.page.html',
    styleUrl: './huds.page.css'
})
export class HudsPage {
    openDevHud = () => {
        const w = <any>window.require('electron/renderer').ipcRenderer;
        w.send('open-hud');
    };
}
