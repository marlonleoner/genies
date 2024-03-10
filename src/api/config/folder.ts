import { existsSync, mkdirSync } from 'original-fs';

import { genieFolder, logsFolder } from '../../util/constants';
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
};

export default configFolders;
