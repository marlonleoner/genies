import { GlobalEmitter } from '../lib/emitter';
import { IRaw } from '../types/gsi';

export class GsiService {
    digest = (raw: IRaw) => {
        GlobalEmitter.emit('raw', raw);
    };
}
