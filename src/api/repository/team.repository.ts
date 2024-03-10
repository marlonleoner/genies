import { Repository } from 'typeorm';
import { DB } from '../lib/database';
import { Team } from '../model/team';

export class TeamRepository {
    private db: Repository<Team> = DB.getRepository(Team);

    findAll = async () => {
        return await this.db.find();
    };

    findOneOrError = async (teamId: string) => {
        const team = await this.db.findOneBy({ id: teamId });
        if (!team) throw new Error('Team not found');
        return team;
    };

    save = async (team: Team): Promise<Team> => {
        return await this.db.save(team);
    };
}
