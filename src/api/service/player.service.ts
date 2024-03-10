import { Player } from '../model/player';
import { PlayerRepository } from '../repository/player.repository';
import {
    CreatePlayerSchema,
    UpdatePlayerSchema,
} from '../schema/player.schema';
import { ICreatePlayer, IUpdatePlayer } from '../types/request';
import { FileService } from './file.service';

export class PlayerService {
    private repository: PlayerRepository = new PlayerRepository();

    getAll = async () => {
        return this.repository.findAll();
    };

    getOne = async (playerId: string) => {
        return this.repository.findOneOrError(playerId);
    };

    create = async (data: ICreatePlayer) => {
        const { nickname, steamId, firstName, lastName, avatar, country } =
            CreatePlayerSchema.parse(data);

        const avatarFileName = await FileService.saveImage(avatar);

        const player = Player.create({
            firstName,
            lastName,
            nickname,
            steamId,
            country,
            avatar: avatarFileName,
        });

        return this.repository.save(player);
    };

    update = async (data: IUpdatePlayer) => {
        const { id, nickname, steamId, firstName, lastName, avatar, country } =
            UpdatePlayerSchema.parse(data);

        const player = await this.repository.findOneOrError(id);

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
        });

        return this.repository.save(player);
    };
}
