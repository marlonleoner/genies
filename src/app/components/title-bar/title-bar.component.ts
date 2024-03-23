import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'genieshm-title-bar',
    standalone: true,
    imports: [LucideAngularModule],
    templateUrl: './title-bar.component.html',
    styleUrl: './title-bar.component.css'
})
export class GHMTitleBarComponent {
    private ipcRenderer?: any;

    constructor() {
        this.ipcRenderer = <any>window.require('electron/renderer').ipcRenderer;
    }

    minimize = () => {
        this.ipcRenderer?.send('@GHM/MINIMIZE_APP');
    };

    maximize = () => {
        this.ipcRenderer?.send('@GHM/MAXIMIZE_APP');
    };

    close = () => {
        this.ipcRenderer?.send('@GHM/CLOSE_APP');
    };
}
