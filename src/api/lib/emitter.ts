import { EventEmitter } from 'events';

class MyEmitter {
    private _emitter: EventEmitter | undefined;

    private getEmitter(): EventEmitter {
        if (!this._emitter) this._emitter = new EventEmitter();
        return this._emitter;
    }

    emit(eventName: string | symbol, ...args: any[]): boolean {
        const emitter = this.getEmitter();
        return emitter.emit(eventName, ...args);
    }

    on(eventName: string, listener: (...args: any[]) => void) {
        const emitter = this.getEmitter();
        emitter.on(eventName, listener);
    }
}

export const GlobalEmitter = new MyEmitter();
