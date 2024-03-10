import { Application } from 'express';
import 'express-async-errors';
import { Server } from 'http';

import '../lib/database';

import configErrorHandler from './error';
import configFolders from './folder';
import configMiddleware from './middleware';
import configRoutes from './routes';
import configSocket from './socket';

const createServer = (app: Application): Server => {
    configFolders();
    configMiddleware(app);
    configRoutes(app);
    configErrorHandler(app);

    return configSocket(app);
};

export default createServer;
