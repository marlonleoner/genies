import { Player } from '../model/player';
import { PlayerRepository } from '../repository/player.repository';
import {
    CreatePlayerSchema,
    UpdatePlayerSchema,
} from '../schema/player.schema';
import { ICreatePlayer, IUpdatePlayer } from '../types/request';
import { FileService } from './file.service';
import { TeamService } from './team.service';

export class PlayerService {
    private repository: PlayerRepository = new PlayerRepository();

    private teamService: TeamService = new TeamService();

    getAll = async () => {
        return this.repository.findAll();
    };

    getOne = async (playerId: string) => {
        return this.repository.findOneOrError(playerId);
    };

    create = async (data: ICreatePlayer) => {
        const {
            nickname,
            steamId,
            firstName,
            lastName,
            avatar,
            country,
            teamId,
        } = CreatePlayerSchema.parse(data);

        const team = teamId ? await this.teamService.getOne(teamId) : null;

        const avatarFileName = await FileService.saveImage(avatar);

        const player = Player.create({
            firstName,
            lastName,
            nickname,
            steamId,
            country,
            avatar: avatarFileName,
            team,
        });

        return this.repository.save(player);
    };

    update = async (data: IUpdatePlayer) => {
        const {
            id,
            nickname,
            steamId,
            firstName,
            lastName,
            avatar,
            country,
            teamId,
        } = UpdatePlayerSchema.parse(data);

        const player = await this.repository.findOneOrError(id);

        const team = teamId ? await this.teamService.getOne(teamId) : null;

        const avatarFileName = await FileService.saveImage(
            avatar,
            player.avatar
        );

        player.set({
            steamId,
            nickname,
            firstName: firstName || null,
            lastName: lastName || null,
            country: country || null,
            avatar: avatarFileName,
            team,
        });

        return this.repository.save(player);
    };

    delete = async (playerId: string) => {
        const player = await this.repository.findOneOrError(playerId);
        FileService.removeImage(player.avatar);
        await this.repository.delete(playerId);
    };
}
