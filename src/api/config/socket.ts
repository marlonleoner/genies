import { Application } from 'express';
import { createServer as HttpServer, Server } from 'http';
import { Server as SocketServer } from 'socket.io';

const options = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
};

const configSocket = (app: Application): Server => {
    const server = HttpServer(app);
    const io = new SocketServer(server, options);

    io.on('connection', (socket) => {
        // events handlers
    });

    return server;
};

export default configSocket;
