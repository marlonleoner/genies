import { NextFunction, Request, Response } from 'express';

import { GsiService } from '../service/gsi.service';

export class GsiController {
    private gsiService: GsiService = new GsiService();

    digest = (request: Request, response: Response, next: NextFunction) => {
        try {
            this.gsiService.digest(request.body);
            return response.end();
        } catch (error) {
            return next(error);
        }
    };

    config = (request: Request, response: Response, next: NextFunction) => {
        try {
            const { reversed } = request.query;
            this.gsiService.config(Boolean(reversed));
            return response.end();
        } catch (error) {
            return next(error);
        }
    };
}
