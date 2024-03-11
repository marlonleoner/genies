import { Router } from 'express';

import { GsiController } from '../controller/gsi.controller';

const gsiController = new GsiController();

const gsiRouter = Router();
gsiRouter.post('/', gsiController.digest);

export default gsiRouter;
