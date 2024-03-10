import { Application, static as expressStatic } from 'express';

import { router } from '../routes';
import { frontFolder } from '../../util/constants';

const configRoutes = (app: Application): void => {
    app.use('/', expressStatic(frontFolder));
    app.use('/api', router);
};

export default configRoutes;
