import path from 'path';
import winston from 'winston';

import { logsFolder } from '../../util/constants';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: path.join(logsFolder, 'server.log'),
        }),
    ],
});
