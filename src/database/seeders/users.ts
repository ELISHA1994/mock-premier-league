import mongoose from 'mongoose';
import moment from 'moment';
import Helper from "../../helpers/helperFunctions";
import {MongoClient} from "mongodb";
import co from "co";
import test from "assert";

const url: string = process.env.PROD_DB_URL

co(async () => {
    try {
        const client = new MongoClient(url);
        const dbclient = await client.connect();
        if (dbclient) { console.log('ready to migrate data...'); }
        // get collections
        const collection = dbclient.db().collection('users')
        const res = await collection.insertMany([
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin@gmail.com',
                password: Helper.hashPassword('Elisha27$'),
                isAdmin: true,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Samuel',
                lastName: 'Eyo',
                email: 'samuelman@gmail.com',
                password: Helper.hashPassword('sammy12358'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            }, {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Manager',
                lastName: 'Tunde',
                email: 'mt@gmail.com',
                password: Helper.hashPassword('Manager27$'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Requester',
                lastName: 'John',
                email: 'rj@yahoo.com',
                password: Helper.hashPassword('Manager27$'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'request',
                lastName: 'man',
                email: 'requestman@gmail.com',
                password: Helper.hashPassword('requestman'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Mrs',
                lastName: 'Somebody',
                email: 'freewoman@gmail.com',
                password: Helper.hashPassword('polly123456'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Timilehi',
                lastName: 'Edet',
                email: 'timilehiapp@gmail.com',
                password: Helper.hashPassword('Timilehi21'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Usman',
                lastName: 'Abubakar',
                email: 'usman@gmail.com',
                password: Helper.hashPassword('Password27$'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Supplier',
                lastName: 'James',
                email: 'unisAdminsupplier@gmail.com',
                password: Helper.hashPassword('Password27$'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'bruce',
                lastName: 'wayne',
                email: 'brucewayne@gmail.com',
                password: Helper.hashPassword('brucewayne'),
                isAdmin: false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: 'Imaobong',
                lastName: 'Edet',
                email: 'imaobong@gmail.com',
                password: Helper.hashPassword('@password'),
                isAdmin:  false,
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            }
        ]);
        test.equal(11, res.insertedCount);
        // Finish up test
        await dbclient.close();
    } catch (error) {
        if (error.name === 'MongoError') {
            return console.log(error.message);
        }
        console.log(error);
    }
})

// {
//     "firstName": "Admin",
//     "lastName": "Admin",
//     "email": "admin1@gmail.com",
//     "password": "Elisha1994$",
//     "isAdmin": true
// }
