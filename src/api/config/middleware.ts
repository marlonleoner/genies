import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { Application } from 'express';

const corsOptions: CorsOptions = {
    origin: '*',
};

const configMiddleware = (app: Application): void => {
    app.use(cors(corsOptions));
    app.use(bodyParser.json({ limit: '10mb' }));
};

export default configMiddleware;
