import mongoose from "mongoose";
import moment from 'moment';
import {MongoClient} from "mongodb";
import co from "co";
import test from "assert";

const url: string ="mongodb+srv://todoappDB:todoappdb@cluster0.sjh2l.mongodb.net/mock-premier-league?retryWrites=true&w=majority"

co(async () => {
    try {
        const client = new MongoClient(url);
        const dbclient = await client.connect();
        if (dbclient) { console.log('ready to migrate data...'); }
        // Get the collection
        // @ts-ignore
        const collection = dbclient.db().collection('teams');
        const r = await collection.insertMany([{
            _id: new mongoose.Types.ObjectId(),
            teamName: 'Arsenal',
            teamMembers: [
                { name: 'Sead Kolasinac', role: 'Defender' }, { name: 'Calum Chambers', role: 'Defender' }, { name: 'Kieran Tierney', role: 'Defender' }, { name: 'David Luiz', role: 'Defender' },
                { name: 'Tolaji Bola', role: 'Defender' }, { name: 'Mesut Ozil', role: 'Midfielder' }, { name: 'Lucas Torreira', role: 'Midfielder' }, { name: 'Ainsley Maitland-Niles', role: 'Midfielder' },
                { name: 'Matteo Guendouzi', role: 'Midfielder' }, { name: 'Granit Xhaka', role: 'Midfielder' }, { name: 'Joe Willock', role: 'Midfielder' }, { name: 'Emile Smith Rowe', role: 'Midfielder' },
                { name: 'Gabriel Martinelli', role: 'Midfielder' }, { name: 'Dani Ceballos', role: 'Midfielder' }, { name: 'Robbie Burton', role: 'Midfielder' }, { name: 'Alexandre Locazatte', role: 'Forward' },
                { name: 'Pierre-Emerick Aubameyang', role: 'Forward' }, { name: 'Reiss Nelson', role: 'Forward' }, { name: 'Nicolas Pepe', role: 'Forward' }, { name: 'Bukayo Saka', role: 'Forward' },
                { name: 'Folarin Balogun', role: 'Forward' }
            ],
            createdAt: moment(Date.now()).format('LLLL'),
            updatedAt: moment(Date.now()).format('LLLL')
        },
            {
                _id: new mongoose.Types.ObjectId(),
                teamName: 'Aston Villa',
                teamMembers: [
                    { name: 'Orjan Nyland', role: 'Gaol Keeper' }, { name: 'Jed Steer', role: 'Gaol Keeper' }, { name: 'Lovre Kalinic', role: 'Gaol Keeper' }, { name: 'Tom Heaton', role: 'Defender' },
                    { name: 'Neil Taylor', role: 'Defender' }, { name: 'James Chester', role: 'Defender' }, { name: 'Ahmed El Mohamady', role: 'Defender' }, { name: 'Frederic', role: 'Defender' },
                    { name: 'Matt Targett', role: 'Defender' }, { name: 'Kortney Hause', role: 'Defender' }, { name: 'Tyrone Mings', role: 'Defender' }, { name: 'Ezri Kansa Ngoyo', role: 'Defender' },
                    { name: 'Bjorn Engels', role: 'Defender' }, { name: 'John McGinn', role: 'Midfielder' }, { name: 'Henri Lansbury', role: 'Midfielder' }, { name: 'Jack Grealish', role: 'Midfielder' },
                    { name: 'Conor Hourihane', role: 'Midfielder' }, { name: 'Keinan Davis', role: 'Midfielder' }, { name: 'Jota', role: 'Midfielder' }, { name: 'Anwar El Ghazi', role: 'Midfielder' },
                    { name: 'Trezeguet', role: 'Midfielder' }, { name: 'Douglas Luiz', role: 'Midfielder' }, { name: 'Marvelous Nakamba', role: 'Midfielder' }, { name: 'Jacob Ramsey', role: 'Midfielder' },
                    { name: 'Jonathan Kodija', role: 'Forward' }, { name: 'Wesley', role: 'Forward' }, { name: 'Cameron Archer', role: 'Forward' }
                ],
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            },
            {
                _id: new mongoose.Types.ObjectId(),
                teamName: 'AFC Bournemouth',
                teamMembers: [
                    { name: 'Artur Boruc', role: 'Gaol Keeper' }, { name: 'Mark Travers', role: 'Gaol Keeper' }, { name: 'Aaron Ramsdale', role: 'Gaol Keeper' }, { name: 'William Dennis', role: 'Gaol Keeper' },
                    { name: 'Simon Francis', role: 'Defender' }, { name: 'Steve Cook', role: 'Defender' }, { name: 'Nathan Ake', role: 'Defender' }, { name: 'Charlie Daniels', role: 'Defender' },
                    { name: 'Adam Smith', role: 'Defender' }, { name: 'Diego Rico', role: 'Defender' }, { name: 'Jack Simpson', role: 'Defender' }, { name: 'Chris Mepham', role: 'Defender' },
                    { name: 'Lloyd Kelly', role: 'Defender' }, { name: 'Brad Smith', role: 'Defender' }, { name: 'Jack Stacey', role: 'Defender' }, { name: 'Jordan Zemura', role: 'Midfielder' },
                    { name: 'Brennan Camp', role: 'Defender' }, { name: 'Corey Jordan', role: 'Defender' }, { name: 'Dan Gosling', role: 'Midfielder' }, { name: 'Andrew Surman', role: 'Midfielder' },
                    { name: 'David Brooks', role: 'Midfielder' }, { name: 'Ryan Fraser', role: 'Midfielder' }, { name: 'Matt Butcher', role: 'Midfielder' }, { name: 'Mihai-Alexandru Dobre', role: 'Midfielder' },
                    { name: 'Philip Billing', role: 'Midfielder' }, { name: 'Harry Wilson', role: 'Midfielder' }, { name: 'Gravin Kilkenny', role: 'Midfielder' }, { name: 'Philip Billing', role: 'Midfielder' },
                    { name: 'Callum Wilson', role: 'Forward' }, { name: 'Joshua King', role: 'Forward' }, { name: 'Dominic Solanke', role: 'Forward' }, { name: 'Arnaut Danjuma', role: 'Forward' }
                ],
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            }, {
                _id: new mongoose.Types.ObjectId(),
                teamName: 'Brighton and Hove Albion',
                teamMembers: [
                    { name: 'David Button', role: 'Gaol Keeper' }, { name: 'Robert S??nchez', role: 'Gaol Keeper' }, { name: 'Mathew Ryan', role: 'Gaol Keeper' }, { name: 'Jason Steele', role: 'Gaol Keeper' },
                    { name: 'Leon Balogun', role: 'Defender' }, { name: 'Bernardo', role: 'Defender' }, { name: 'Ga??tan Bong', role: 'Defender' }, { name: 'Bruno', role: 'Defender' },
                    { name: 'Dan Burn', role: 'Defender' }, { name: 'Shane Duffy', role: 'Defender' }, { name: 'Lewis Dunk', role: 'Defender' }, { name: 'Mart??n Montoya', role: 'Defender' },
                    { name: 'Leo ??stig??rd', role: 'Defender' }, { name: 'Yves Bissouma', role: 'Midfielder' },
                    { name: 'Will Collar', role: 'Midfielder' }, { name: 'Pascal Gro??', role: 'Midfielder' }, { name: 'Biram Kayal', role: 'Midfielder' }, { name: 'Anthony Knockaert', role: 'Midfielder' },
                    { name: 'Solomon March', role: 'Midfielder' }, { name: 'Jayson Molumby', role: 'Midfielder' }, { name: 'Davy Pr??pper', role: 'Midfielder' }, { name: 'Max Sanders', role: 'Midfielder' },
                    { name: 'Dale Stephens', role: 'Midfielder' },
                    { name: 'Viktor Gy??keres', role: 'Forward' }, { name: 'Jos?? Izquierdo', role: 'Forward' }, { name: 'Alireza Jahanbakhsh', role: 'Forward' }, { name: 'J??rgen Locadia', role: 'Forward' },
                    { name: 'Glenn Murray', role: 'Forward' }, { name: 'Ben Roberts', role: 'Coach' }, { name: 'Paul Trollope', role: 'Assistance Manager' }
                ],
                createdAt: moment(Date.now()).format('LLLL'),
                updatedAt: moment(Date.now()).format('LLLL')
            }]);
        test.equal(4, r.insertedCount);
        // Finish up test
        await dbclient.close();
    } catch (error) {
        if (error.name === 'MongoError') {
            return console.log(error.message);
        }
        console.log(error);
    }
})
