import { Application, static as expressStatic } from 'express';

import { frontFolder } from '../../util/constants';
import { router } from '../routes';
import gsiRouter from '../routes/gsi.routes';

const configRoutes = (app: Application): void => {
    app.use('/', expressStatic(frontFolder));
    app.use('/', gsiRouter);
    app.use('/api', router);
};

export default configRoutes;
