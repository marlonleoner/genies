import { existsSync, mkdirSync } from 'fs';

import { databaseFolder, genieFolder, logsFolder } from '../../util/constants';
import { logger } from './logger';

const verifyAndCreateFolder = (path: string): void => {
    logger.info(`Validating if '${path}' already exists`);
    if (!existsSync(path)) {
        logger.info(`Creating '${path}' because path does not exists`);
        mkdirSync(path);
    }
};

const configFolders = (): void => {
    verifyAndCreateFolder(genieFolder);
    verifyAndCreateFolder(logsFolder);
    verifyAndCreateFolder(databaseFolder);
};

export default configFolders;
