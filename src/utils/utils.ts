import {Errback, Request, Response, NextFunction, ErrorRequestHandler} from "express";
import debug from "debug";
import { port, server } from "../server";
import messages from "./messages";

const log: debug.IDebugger = debug('server:debug');
const logerror: debug.IDebugger = debug('server:dbgerror');

export function normalize(val: string): number | boolean | string {
    const port: number = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

export function onError(error: NodeJS.ErrnoException): void {
    logerror(error);
    if (error.syscall !== 'listen') {
        throw error
    }
    const bind: string = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;

        default:
            throw error;
    }
}

export function onListening(): void {
    const addr: any = server.address();
    const bind: string = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    log(`Server started on ${bind}`);
    log(`${messages.listenToServer}:${port}`)
}

export function handle404(req: Request, res: Response): void {
    res.status(404).json({
        status: 'error',
        data: { message: messages.notFound }
    })
}

// export function basicErrorHandler(err: Errback, req: Request, res:  Response, next: NextFunction) {
//     console.error("Error: ", err);
//     return res.status()
// }
export const basicErrorHandler: ErrorRequestHandler = (err: Errback, req: Request, res:  Response, next: NextFunction) => {
    console.error("Error: ", err);
    return res.status(500).json({
        status: 'error',
        data: { message: messages.serverError }
    })
}
