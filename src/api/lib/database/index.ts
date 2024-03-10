import { DataSource } from 'typeorm';

import { databaseFile } from '../../../util/constants';

import { Player } from '../../model/player';
import { Team } from '../../model/team';

export const DB = new DataSource({
    type: 'sqlite',
    database: databaseFile,
    synchronize: true,
    logging: true,
    entities: [Team, Player],
});

DB.initialize();
