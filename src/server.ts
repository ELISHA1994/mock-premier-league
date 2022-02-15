import http from "http";
import path from "path";
import express, {Request, Response, Application} from 'express';
import cors from "cors";
import dotenv from "dotenv/config";
import {default as logger} from 'morgan'
import { createStream } from "rotating-file-stream";
import {default as DGB, default as DBG} from "debug";
import {basicErrorHandler, handle404, normalize, onError, onListening} from "./utils/utils";

const debug = DGB('server:debug');
// const dbgerror = DGB('server:dbgerror');

/**
 * Create Express instance
 */
const app: Application = express();

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
