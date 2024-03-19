import { Repository } from 'typeorm';

import { DB } from '../lib/database';
import { Match } from '../model/match';

export class MatchRepository {
    private db: Repository<Match> = DB.getRepository(Match);

    findAll = async () => {
        return await this.db
            .createQueryBuilder('match')
            .leftJoinAndSelect('match.team1', 'team1')
            .leftJoinAndSelect('match.team2', 'team2')
            .getMany();
    };

    setAllNotLiveExceptThis = async () => {
        return await this.db.createQueryBuilder().update(Match).set({ live: false }).execute();
    };

    findOneOrError = async (matchId: string) => {
        const match = await this.db
            .createQueryBuilder('match')
            .where('match.id = :matchId')
            .leftJoinAndSelect('match.team1', 'team1')
            .leftJoinAndSelect('match.team2', 'team2')
            .setParameters({ matchId })
            .getOne();
        if (!match) throw new Error('Match not found');

        return match;
    };

    findOneLiveOrError = async () => {
        const match = await this.db
            .createQueryBuilder('match')
            .where('match.live = 1')
            .leftJoinAndSelect('match.team1', 'team1')
            .leftJoinAndSelect('match.team2', 'team2')
            .getOne();
        if (!match) throw new Error('Live Match not found');

        return match;
    };

    save = async (match: Match): Promise<Match> => {
        return await this.db.save(match);
    };

    delete = async (matchId: string) => {
        await this.db.delete(matchId);
    };
}
