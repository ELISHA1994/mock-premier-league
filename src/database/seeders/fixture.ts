import mongoose from "mongoose";
import moment from 'moment';
import {MongoClient} from "mongodb";
import co from "co";
import test from "assert";

const url: string = process.env.PROD_DB_URL
    // "mongodb+srv://todoappDB:todoappdb@cluster0.sjh2l.mongodb.net/mock-premier-league?retryWrites=true&w=majority"

co(async () => {
    try {
        const client = new MongoClient(url);
        const dbclient = await client.connect();
        if (dbclient) { console.log('ready to migrate data...'); }
        // Get the collection
        // @ts-ignore
        const collection = dbclient.db().collection('fixtures')
        const res = await collection.insertMany([{
            _id: new mongoose.Types.ObjectId(),
            teamA: [{ name: 'Arsenal', score: 0 }],
            teamB: [{ name: 'Chelsea', score: 0 }],
            status: 'completed',
            matchInfo: [{ date: '2019-11-25T16:24:32.674+00:00', stadium: 'Craven Cottage'  }],
            createdAt: moment(Date.now()).format('LLLL'),
            updatedAt: moment(Date.now()).format('LLLL')
        },
            {
                _id: new mongoose.Types.ObjectId(),
                teamA: [{ name: 'Brighton and Hove Albion', score: 0 }],
                teamB: [{ name: 'Aston Villa', score: 0 }],
                status: 'pending',
                matchInfo: [{ date: '2019-11-09T16:24:32.674+00:00', stadium: 'Vitality Stadium' }],
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                teamA: [{ name: 'Aston Villa', score: 0 }],
                teamB: [{ name: 'AFC Bournemouth', score: 0 }],
                status: 'completed',
                matchInfo: [{ date: '2019-11-01T16:24:32.674+00:00', stadium: 'King Power Stadium' }],
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                teamA: [{ name: 'Arsenal', score: 0 }],
                teamB: [{ name: 'AFC Bournemouth', score: 0 }],
                status: 'pending',
                matchInfo: [{ date: '2019-11-04T16:24:32.674+00:00', stadium: 'Vicarage Road' }],
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                teamA: [{ name: 'Aston Villa', score: 0 }],
                teamB: [{ name: 'Chelsea', score: 0 }],
                status: 'completed',
                matchInfo: [{ date: '2019-11-26T16:24:32.674+00:00', stadium: 'Craven Cottage' }],
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            }]);
        test.equal(5, res.insertedCount);
        // Finish up test
        await dbclient.close();
    } catch (error) {
        if (error.name === 'MongoError') {
            return console.log(error.message);
        }
        console.log(error);
    }
});

