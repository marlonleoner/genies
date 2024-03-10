import { Response, Router } from 'express';

import matchRouter from './match.routes';
import playerRouter from './player.routes';
import teamRouter from './team.routes';

const router = Router();
router.get(
    ['/', '/status', '/health', '/ping'],
    async (_, response: Response) => response.json({ status: 'It´s Alive!' })
);
router.use('/teams', teamRouter);
router.use('/players', playerRouter);
router.use('/matches', matchRouter);

export { router };
