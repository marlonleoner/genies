import { NextFunction, Request, Response } from 'express';

import { TeamService } from '../service/team.service';

export class TeamController {
    private teamService: TeamService;

    constructor() {
        this.teamService = new TeamService();
    }

    getAll = async (request: Request, response: Response) => {
        const teams = await this.teamService.getAll();
        return response.json(teams);
    };

    getOne = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { teamId } = request.params;
            const team = await this.teamService.getOne(teamId);
            return response.json(team);
        } catch (error) {
            return next(error);
        }
    };

    create = async (request: Request, response: Response) => {
        const team = await this.teamService.create(request.body);
        return response.json(team);
    };

    update = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const team = await this.teamService.update(request.body);
            return response.json(team);
        } catch (error) {
            return next(error);
        }
    };

    delete = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { teamId } = request.params;
            await this.teamService.delete(teamId);
            return response.end();
        } catch (error) {
            return next(error);
        }
    };
}
