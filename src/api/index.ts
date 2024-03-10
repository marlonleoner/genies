import 'reflect-metadata';

import { config } from 'dotenv';
config();

import express from 'express';
import { Server } from 'http';

import createServer from './config/server';

const PORT = 6779;
const server: Server = createServer(express());
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
