import { Router } from 'express';

import { TeamController } from '../controller/team.controller';

const teamController = new TeamController();

const teamRouter = Router();
teamRouter.get('/', teamController.getAll);
teamRouter.get('/:teamId', teamController.getOne);
teamRouter.post('/', teamController.create);
teamRouter.put('/', teamController.update);

export default teamRouter;
