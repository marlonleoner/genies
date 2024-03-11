import { Router } from 'express';
import { FileController } from '../controller/file.controller';

const fileController = new FileController();

const fileRouter = Router();
fileRouter.get('/image/:file', fileController.getOne);

export default fileRouter;
