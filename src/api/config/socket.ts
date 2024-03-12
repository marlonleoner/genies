import { Application } from 'express';
import { createServer as HttpServer, Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { GSIEvents, SocketEvents } from '../../util/constants';
import { GlobalEmitter } from '../lib/emitter';
import { logger } from './logger';

const options = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
};

const allEvents = [
    'RAW',
    'DATA',
    'ROUND_END',
    'MATCH_END',
    'BOMB_PLANTED',
    'BOMB_EXPLODED',
    'BOMB_DEFUSED',
    'BOMB_DEFUSE_START',
    'BOMB_DEFUSE_STOP',
    'BOMB_PLANT_START',
    'BOMB_PLANT_STOP',
    'FREEZETIME_START',
    'FREEZETIME_END',
    'TIMEOUT_START',
    'TIMEOUT_END',
    'VALVE_MVP',
    'IMPACT_MVP'
];

const configSocket = (app: Application): Server => {
    const server = HttpServer(app);
    const io = new SocketServer(server, options);

    io.on('connection', (socket) => {
        // events handlers
    });

    for (const event of allEvents) {
        const gsi = GSIEvents[event];
        const socket = SocketEvents[event];

        GlobalEmitter.on(gsi, (message: string) => {
            if (socket !== SocketEvents['DATA'] && socket !== SocketEvents['RAW'])
                logger.info({
                    event: socket,
                    content: message || undefined
                });

            io.emit(socket, message || undefined);
        });
    }

    return server;
};

export default configSocket;
