import { Team } from '../model/team';
import { TeamRepository } from '../repository/team.repository';
import { CreateTeamSchema, UpdateTeamSchema } from '../schema/team.schema';
import { ICreateTeam, IUpdateTeam } from '../types/request';
import { FileService } from './file.service';

export class TeamService {
    private repository: TeamRepository = new TeamRepository();

    getAll = async () => {
        return this.repository.findAll();
    };

    getOne = async (teamId: string) => {
        return this.repository.findOneOrError(teamId);
    };

    create = async (data: ICreateTeam) => {
        const { name, tag, country, logo } = CreateTeamSchema.parse(data);

        const logoFileName = await FileService.saveImage(logo);

        const team = Team.create({
            name,
            tag: tag,
            country: country,
            logo: logoFileName,
        });

        return this.repository.save(team);
    };

    update = async (data: IUpdateTeam) => {
        const { id, name, tag, country, logo } = UpdateTeamSchema.parse(data);

        const team = await this.repository.findOneOrError(id);

        const logoFileName = await FileService.saveImage(logo, team.logo);

        team.set({
            name,
            tag: tag || null,
            country: country || null,
            logo: logoFileName,
        });

        return this.repository.save(team);
    };
}
