import { Application, NextFunction, Request, Response } from 'express';

const handleError = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(400).json({ error: error.message });
};

const configError = (app: Application): void => {
    app.use(handleError);
};

export default configError;
