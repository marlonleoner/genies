import { homedir } from 'os';
import path from 'path';

const isDev = process.env['DEVELOPMENT'] || false;

const userHomeDir = homedir();
const genieFolder = path.join(userHomeDir, 'genieshm');

const publicFolder = path.join(genieFolder, 'public');
const imagesFolder = path.join(publicFolder, 'images');

const logsFolder = path.join(genieFolder, 'logs');

const databaseFolder = path.join(genieFolder, 'database');
const databaseFile = path.join(databaseFolder, 'GeniesHM.db');

const frontFolder = isDev
    ? path.join(__dirname, '..', '..', 'dist', 'genies', 'browser')
    : path.join(__dirname, '..', '..', 'genies', 'browser');
const indexFrontFile = path.join(frontFolder, 'index.html');

const GSIEvents: { [key: string]: string } = {
    RAW: '@HUDManager/RAW',
    DATA: '@HUDManager/DATA',
    // End Round and Match Events
    ROUND_END: '@HUDManager/ROUND_END',
    MATCH_END: '@HUDManager/MATCH_END',
    // Bomb Events
    BOMB_PLANTED: '@HUDManager/BOMB_PLANTED',
    BOMB_EXPLODED: '@HUDManager/BOMB_EXPLODED',
    BOMB_DEFUSED: '@HUDManager/BOMB_DEFUSED',
    BOMB_DEFUSE_START: '@HUDManager/BOMB_DEFUSE_START',
    BOMB_DEFUSE_STOP: '@HUDManager/BOMB_DEFUSE_STOP',
    BOMB_PLANT_START: '@HUDManager/BOMB_PLANT_START',
    BOMB_PLANT_STOP: '@HUDManager/BOMB_PLANT_STOP',
    // Freezetime Events
    FREEZETIME_START: '@HUDManager/FREEZETIME_START',
    FREEZETIME_END: '@HUDManager/FREEZETIME_END',
    // Timeout Events
    TIMEOUT_START: '@HUDManager/TIMEOUT_START',
    TIMEOUT_END: '@HUDManager/TIMEOUT_END',
    // MVPs
    VALVE_MVP: '@HUDManager/VALVE_MVP',
    IMPACT_MVP: '@HUDManager/IMPACT_MVP'
};

const SocketEvents: { [key: string]: string } = {
    RAW: 'raw',
    DATA: 'update',
    // End Round and Match Events
    ROUND_END: 'round_end',
    MATCH_END: 'match_end',
    // Bomb Events
    BOMB_PLANTED: 'bomb_planted',
    BOMB_EXPLODED: 'bomb_exploded',
    BOMB_DEFUSED: 'bomb_defused',
    BOMB_DEFUSE_START: 'bomb_defuse_start',
    BOMB_DEFUSE_STOP: 'bomb_defuse_stop',
    BOMB_PLANT_START: 'bomb_start_planting',
    BOMB_PLANT_STOP: 'bomb_stop_planting',
    // Freezetime Events
    FREEZETIME_START: 'freezetime_start',
    FREEZETIME_END: 'freezetime_end',
    // Timeout Events
    TIMEOUT_START: 'timeout_start',
    TIMEOUT_END: 'timeout_end',
    // MVPs
    VALVE_MVP: 'valve_mvp',
    IMPACT_MVP: 'impact_mvp'
};

export {
    GSIEvents,
    SocketEvents,
    databaseFile,
    databaseFolder,
    frontFolder,
    genieFolder,
    imagesFolder,
    indexFrontFile,
    logsFolder,
    publicFolder
};
