import http from "http";
import path from "path";
import express, {Request, Response, Application} from 'express';
import cors from "cors";
import dotenv from "dotenv";
import {default as logger} from 'morgan'
import { createStream } from "rotating-file-stream";
import {default as DGB, default as DBG} from "debug";

import userRoute from "./routes/user.route";
import connect from "./database/db";
import {basicErrorHandler, handle404, normalize, onError, onListening} from "./utils/utils";
import teamRoute from "./routes/team.route";
import fixtureRoute from "./routes/fixture.route";

dotenv.config();
const debug = DGB('server:debug');
// const dbgerror = DGB('server:dbgerror');

/**
 * Create Express instance
 */
const app: Application = express();

// Db connectivity
// @ts-ignore
connect();

// Setting api Port;
export const port = normalize(process.env.PORT || '1337');
app.set('port', port);

// Setting middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'common', {
    stream: process.env.REQUEST_LOG_FILE  || 'log.txt' ?
        createStream(process.env.REQUEST_LOG_FILE || 'log.txt', {
            size: '10M',
            interval: '1d',
            compress: 'gzip',
            path: path.join(__dirname, 'logs')
        })
        : process.stdout
}));

// API ROUTES
app.use('/api/v1/user', userRoute);
app.use('/api/v1', teamRoute);
app.use('/api/v1', fixtureRoute);

// Home Page
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


// Error handling
app.use(handle404);
app.use(basicErrorHandler);

export const server = http.createServer(app);
server.listen(port);

// Server Event Handling
server.on('request', (req: Request, res: Response) => {
    debug(`${new Date().toISOString()} request: ${req.method} ${req.url}`);
});
server.on('error', onError);
server.on('listening', onListening);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBlMTM5YmYxOTE0NjE1ZjM3NDdmMWQiLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDUxOTk4OTUsImV4cCI6MTY0NTI4NjI5NX0.5Px1nWENIz-d3s4lOgvSdrgS8EvAqBi8U0ecp9Ofb6E
