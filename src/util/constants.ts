import path from 'path';

const isDev = process.env['DEVELOPMENT'] || false;

const frontFolder = isDev
    ? path.join(__dirname, '..', '..')
    : path.join(__dirname, '..', '..', 'genies-hud-manager', 'browser');

export { frontFolder };
