import { homedir } from 'os';
import path from 'path';

const isDev = process.env['DEVELOPMENT'] || false;

const userHomeDir = homedir();
const genieFolder = path.join(userHomeDir, 'genieshm');

const logsFolder = path.join(genieFolder, 'logs');

const databaseFolder = path.join(genieFolder, 'database');
const databaseFile = path.join(databaseFolder, 'GeniesHM.db');

const frontFolder = isDev
    ? path.join(__dirname, '..', '..', 'dist', 'genies', 'browser')
    : path.join(__dirname, '..', '..', 'genies', 'browser');

export { databaseFile, databaseFolder, frontFolder, genieFolder, logsFolder };
