import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ElectronService {
    private ipc = (window as any).require('electron').ipcRenderer;

    constructor() {}

    open() {
        console.log(this.ipc);
    }
}
