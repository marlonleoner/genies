import { Repository } from 'typeorm';

import { DB } from '../lib/database';
import { Player } from '../model/player';

export class PlayerRepository {
    private db: Repository<Player> = DB.getRepository(Player);

    findAll = async () => {
        return await this.db.createQueryBuilder('player').leftJoinAndSelect('player.team', 'team').getMany();
    };

    findOneOrError = async (playerId: string) => {
        const player = await this.db
            .createQueryBuilder('player')
            .leftJoinAndSelect('player.team', 'team')
            .where('player.id = :playerId')
            .setParameters({ playerId })
            .getOne();
        if (!player) throw new Error('Player not found');

        return player;
    };

    findManyBySteamId = async (steamIds: string[]) => {
        return await this.db
            .createQueryBuilder('player')
            .leftJoinAndSelect('player.team', 'team')
            .where('player.steamId IN (:...steamIds)', { steamIds })
            .getMany();
    };

    save = async (player: Player): Promise<Player> => {
        return await this.db.save(player);
    };

    delete = async (playerId: string) => {
        await this.db.delete(playerId);
    };
}
