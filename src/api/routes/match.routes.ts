import { Router } from 'express';

import { MatchController } from '../controller/match.controller';

const matchController = new MatchController();

const matchRouter = Router();
matchRouter.get('/live', matchController.getLive);
matchRouter.patch('/live', matchController.setLive);
matchRouter.get('/', matchController.getAll);
matchRouter.get('/:matchId', matchController.getOne);
matchRouter.post('/', matchController.create);
matchRouter.put('/:matchId', matchController.update);

export default matchRouter;
