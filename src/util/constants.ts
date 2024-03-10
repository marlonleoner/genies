import { homedir } from 'os';
import path from 'path';

const isDev = process.env['DEVELOPMENT'] || false;

const userHomeDir = homedir();
const genieFolder = path.join(userHomeDir, 'genieshm');

const logsFolder = path.join(genieFolder, 'logs');

const frontFolder = isDev
    ? path.join(__dirname, '..', '..', 'dist', 'genies', 'browser')
    : path.join(__dirname, '..', '..', 'genies', 'browser');

export { frontFolder, genieFolder, logsFolder };
