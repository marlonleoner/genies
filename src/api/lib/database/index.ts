import { DataSource } from 'typeorm';

import { databaseFile } from '../../../util/constants';

import { Team } from '../../model/team';

export const DB = new DataSource({
    type: 'sqlite',
    database: databaseFile,
    synchronize: true,
    logging: true,
    entities: [Team],
});

DB.initialize();
