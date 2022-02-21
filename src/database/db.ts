import mongoose, {} from "mongoose";
import debug from "debug";
import messages from "../utils/messages";

const log: debug.IDebugger = debug('server:debug');
const logerror: debug.IDebugger = debug('server:dbgerror');

export default async function connect(): Promise<mongoose.Mongoose | void> {
    try {
        if (process.env.NODE_ENV === 'test') {
            await mongoose.connect(process.env.TEST_DB_URL)
        } else if (process.env.NODE_ENV === 'production') {
            const db =  await mongoose.connect(
                process.env.PROD_DB_URL
            )
            log(messages.connectedToDatabase);
            return db;
        } else {
            const db =  await mongoose.connect(process.env.DB_URL)
            log(messages.connectedToDatabase);
            return db;
        }
    } catch (error) {
        console.log(error);
        return logerror(messages.failedToConnect);
    }
}

// mongodb+srv://todoappDB:<password>@cluster0.sjh2l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
