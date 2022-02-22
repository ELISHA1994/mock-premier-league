import http from "http";
import path from "path";
import express, {Request, Response, Application, Errback} from 'express';
import cors from "cors";
import dotenv from "dotenv";
import * as redis from "redis";
import connectRedis from 'connect-redis';
import session from 'express-session';
import limiter from "./config/express-rate-limit";
import cookieParser from 'cookie-parser';
import responseTime from "response-time";
import {default as logger} from 'morgan'
import { createStream } from "rotating-file-stream";
import {default as DGB, default as DBG} from "debug";

import userRoute from "./routes/user.route";
import connect from "./database/db";
import {basicErrorHandler, handle404, normalize, onError, onListening} from "./utils/utils";
import teamRoute from "./routes/team.route";
import fixtureRoute from "./routes/fixture.route";
import messages from "./utils/messages";


dotenv.config();
const debug = DGB('server:debug');
// const dbgerror = DGB('server:dbgerror');

/**
 * Create Express instance
 */
export const app: Application = express();

// Db connectivity
// @ts-ignore
connect();

if (process.env.NODE_ENV !== 'test') {
    const redisUri = `${process.env.REDIS_URL}`;
    const redisStore = connectRedis(session);

    const clientConnect = async () => {
        const client = await redis.createClient({
            url: redisUri
        });

        await client.connect()

        // creating new redis store for sessioning.
        app.use(
            session({
                secret: process.env.SECRET_KEY,
                store: new redisStore({
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT,
                    client,
                    ttl: 1800,
                }),
                saveUninitialized: false,
                resave: false,
            })
        );

        client.on('connect', () => {
            debug('Redis client connected');
        });

        client.on('error', (err) => {
            console.error(err);
        });
    };

    clientConnect().then()
    app.use(responseTime());
}


// Setting api Port;
export const port = normalize(process.env.PORT || '1337');
app.set('port', port);

// limit IP api request
app.use(limiter);
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
    res.status(200).json({
        status: 'success',
        data: { message: messages.welcome }
    });
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBlMTM5YmYxOTE0NjE1ZjM3NDdmMWQiLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDUzOTI0MTMsImV4cCI6MTY0NTQ3ODgxM30.ZiT-KSsADPuDImDT-UUZu8eBT-oy6wmeou3ehlSSca8
