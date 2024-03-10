import 'reflect-metadata';

import { config } from 'dotenv';
config();

import express from 'express';
import { Server } from 'http';

import { logger } from './config/logger';
import createServer from './config/server';

const PORT = 6779;
const server: Server = createServer(express());
server.listen(PORT, () => {
    const message = `Server running on port ${PORT}`;
    logger.info(message);
    console.log(message);
});
