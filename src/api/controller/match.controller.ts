import { NextFunction, Request, Response } from 'express';

import { MatchService } from '../service/match.service';

export class MatchController {
    private matchService: MatchService;

    constructor() {
        this.matchService = new MatchService();
    }

    getAll = async (request: Request, response: Response) => {
        const matches = await this.matchService.getAll();
        return response.json(matches);
    };

    getOne = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const { matchId } = request.params;
            return response.json(await this.matchService.getOne(matchId));
        } catch (error) {
            return next(error);
        }
    };

    create = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const match = await this.matchService.create(request.body);
            return response.json(match);
        } catch (error) {
            return next(error);
        }
    };

    update = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const { matchId } = request.params;
            const match = await this.matchService.update(matchId, request.body);
            return response.json(match);
        } catch (error) {
            return next(error);
        }
    };

    getLive = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const match = await this.matchService.getLive();
            return response.json(match);
        } catch (error) {
            return next(error);
        }
    };

    setLive = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const { matchId } = request.params;
            const match = await this.matchService.setLive(matchId);
            return response.json(match);
        } catch (error) {
            return next(error);
        }
    };
}
