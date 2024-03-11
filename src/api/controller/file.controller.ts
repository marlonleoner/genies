import { NextFunction, Request, Response } from 'express';

import { FileService } from '../service/file.service';

export class FileController {
    getOne = (request: Request, response: Response, next: NextFunction) => {
        try {
            const { file } = request.params;
            const image = FileService.getImage(file);
            return response.sendFile(image);
        } catch (error) {
            return next(error);
        }
    };
}
