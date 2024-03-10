import cors, { CorsOptions } from 'cors';
import { Application, json } from 'express';

const corsOptions: CorsOptions = {
    origin: '*',
};

const configMiddleware = (app: Application): void => {
    app.use(cors(corsOptions));
    app.use(json());
};

export default configMiddleware;
