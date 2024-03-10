import { Router } from 'express';

import { PlayerController } from '../controller/player.controller';

const playerController = new PlayerController();

const playerRouter = Router();
playerRouter.get('/', playerController.getAll);
playerRouter.get('/:playerId', playerController.getOne);
playerRouter.post('/', playerController.create);
playerRouter.put('/', playerController.update);

export default playerRouter;
