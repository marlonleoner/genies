import { Repository } from 'typeorm';

import { DB } from '../lib/database';
import { Player } from '../model/player';

export class PlayerRepository {
    private db: Repository<Player> = DB.getRepository(Player);

    findAll = async () => {
        return await this.db.find();
    };

    findOneOrError = async (playerId: string) => {
        const player = await this.db.findOneBy({ id: playerId });
        if (!player) throw new Error('Player not found');
        return player;
    };

    save = async (player: Player): Promise<Player> => {
        return await this.db.save(player);
    };
}
