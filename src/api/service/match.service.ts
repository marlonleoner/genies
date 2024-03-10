import { z } from 'zod';

import { Match } from '../model/match';
import { MatchRepository } from '../repository/match.repository';
import { MatchSchema } from '../schema/match.schema';
import { TeamService } from './team.service';

const MatchLiveSchema = z.object({
    matchId: z.string(),
});

export class MatchService {
    private repository: MatchRepository = new MatchRepository();

    private teamService: TeamService = new TeamService();

    getAll = async () => {
        return await this.repository.findAll();
    };

    getOne = async (matchId: string) => {
        return await this.repository.findOneOrError(matchId);
    };

    create = async (data: any) => {
        const { team1Id, team2Id, bestOf, startTime } = MatchSchema.parse(data);

        const team1 = await this.teamService.getOne(team1Id);
        const team2 = await this.teamService.getOne(team2Id);

        const match = Match.create({
            team1,
            team2,
            bestOf,
            startTime,
        });

        return this.repository.save(match);
    };

    update = async (matchId: string, data: any) => {
        const { team1Id, team2Id, bestOf, startTime, active } =
            MatchSchema.parse(data);

        const team1 = await this.teamService.getOne(team1Id);
        const team2 = await this.teamService.getOne(team2Id);

        const match = await this.repository.findOneOrError(matchId);

        match.set({
            team1,
            team2,
            bestOf,
            startTime,
            active,
        });

        return this.repository.save(match);
    };

    setLive = async (matchId: string) => {
        const match = await this.repository.findOneOrError(matchId);

        await this.repository.setAllNotLiveExceptThis();

        match.live = true;

        return this.repository.save(match);
    };

    getLive = async () => {
        return await this.repository.findOneLiveOrError();
    };
}
