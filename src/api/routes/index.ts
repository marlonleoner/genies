import { Response, Router } from 'express';

import teamRouter from './team.routes';

const router = Router();
router.get(
    ['/', '/status', '/health', '/ping'],
    async (_, response: Response) => response.json({ status: 'It´s Alive!' })
);
router.use('/teams', teamRouter);

export { router };
