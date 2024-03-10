import path from 'path';

const isDev = process.env['DEVELOPMENT'] || false;

const frontFolder = isDev
    ? path.join(__dirname, '..', '..', 'dist', 'genies', 'browser')
    : path.join(__dirname, '..', '..', 'genies', 'browser');

console.log('>>>>>', frontFolder);

export { frontFolder };
