import { Application } from 'express';
import 'express-async-errors';
import { Server } from 'http';

import configErrorHandler from './error';
import configMiddleware from './middleware';
import configRoutes from './routes';
import configSocket from './socket';

const createServer = (app: Application): Server => {
    configMiddleware(app);
    configRoutes(app);
    configErrorHandler(app);

    return configSocket(app);
};

export default createServer;
