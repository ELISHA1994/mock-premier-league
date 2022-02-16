import mongoose from "mongoose";
import connect from "../db";
import Helper from "../../helpers/helperFunctions";

const db = connect();

// @ts-ignore
db.usermodels.insertMany([
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@gmail.com',
        password: Helper.hashPassword('Elisha27$'),
        isAdmin: true,
    },
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'Samuel',
        lastName: 'Eyo',
        email: 'samuelman@gmail.com',
        password: Helper.hashPassword('sammy12358'),
        isAdmin: false
    }, {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'Manager',
        lastName: 'Tunde',
        email: 'mt@gmail.com',
        password: Helper.hashPassword('Manager27$'),
        isAdmin: false
    }, {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'Requester',
        lastName: 'John',
        email: 'rj@yahoo.com',
        password: Helper.hashPassword('Manager27$'),
        isAdmin: false
    },
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'request',
        lastName: 'man',
        email: 'requestman@gmail.com',
        password: Helper.hashPassword('requestman'),
        isAdmin: false
    },
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'Mrs',
        lastName: 'Somebody',
        email: 'freewoman@gmail.com',
        password: Helper.hashPassword('polly123456'),
        isAdmin: false
    },
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'Kazeem',
        lastName: 'Odutola',
        email: 'kazmobileapp@gmail.com',
        password: Helper.hashPassword('Kazeem27'),
        isAdmin: false
    },
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'Kazeem',
        lastName: 'Odutola',
        email: 'odutolak@gmail.com',
        password: Helper.hashPassword('Password27$'),
        isAdmin: false
    },
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'Supplier',
        lastName: 'James',
        email: 'unisAdminsupplier@gmail.com',
        password: Helper.hashPassword('Password27$'),
        isAdmin: false
    },
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: 'bruce',
        lastName: 'wayne',
        email: 'brucewayne@gmail.com',
        password: Helper.hashPassword('brucewayne'),
        isAdmin: false
    }
])

// {
//     _id: mongoose.Schema.Types.ObjectId,
//         firstName: 'James',
//     lastName: 'Williams',
//     email: 'jammy@gmail.com',
//     password: Helper.hashPassword('jammy022022'),
//     isAdmin: false,
// },
