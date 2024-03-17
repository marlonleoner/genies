import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;

    private _data = new BehaviorSubject<string>('');
    data$ = this._data.asObservable();

    constructor() {
        this.socket = io('http://localhost:6779');

        this.socket.on('update', (data) => {
            this._data.next(data);
        });
    }

    on(eventName: string, cb: (data: string) => void) {
        this.socket.on(eventName, cb);
    }

    openDevHud() {
        console.log('request to open hud in socket service');
        this.socket.emit('@GENIES/OPEN_DEV_HUD');
    }
}
