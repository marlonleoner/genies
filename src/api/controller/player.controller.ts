import { NextFunction, Request, Response } from 'express';

import { PlayerService } from '../service/player.service';

export class PlayerController {
    private playerService: PlayerService;

    constructor() {
        this.playerService = new PlayerService();
    }

    getAll = async (request: Request, response: Response) => {
        const players = await this.playerService.getAll();
        return response.json(players);
    };

    getOne = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { playerId } = request.params;
            const player = await this.playerService.getOne(playerId);
            return response.json(player);
        } catch (error) {
            return next(error);
        }
    };

    create = async (request: Request, response: Response) => {
        const player = await this.playerService.create(request.body);
        return response.json(player);
    };

    update = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const player = await this.playerService.update(request.body);
            return response.json(player);
        } catch (error) {
            return next(error);
        }
    };

    delete = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { playerId } = request.params;
            const player = await this.playerService.delete(playerId);
            return response.json(player);
        } catch (error) {
            return next(error);
        }
    };
}
