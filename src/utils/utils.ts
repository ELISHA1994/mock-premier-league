// import 'NodeJS';
import { port, server } from "../server";
import { default as DGB } from "debug";

const debug = DGB('server:debug');
const dbgerror = DGB('server:dbgerror');

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
    dbgerror(error);
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
    debug(`Listening on ${bind}`);
}
