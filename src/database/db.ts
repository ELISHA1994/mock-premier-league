import mongoose, {} from "mongoose";
import debug from "debug";
import messages from "../utils/messages";

const log: debug.IDebugger = debug('server:debug');
const logerror: debug.IDebugger = debug('server:dbgerror');

export default async function connect(): Promise<mongoose.Mongoose | void> {
    try {
        const db =  await mongoose.connect(process.env.DB_URL)
        log(messages.connectedToDatabase);
        return db;
    } catch (error) {
        console.log(error);
        return logerror(messages.failedToConnect);
    }
}
