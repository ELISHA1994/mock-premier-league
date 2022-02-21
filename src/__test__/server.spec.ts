import supertest from 'supertest';
import {server, app } from "../server";
import messages from "../utils/messages";
import mongoose from "mongoose";
const request = supertest(server)

afterAll((done) => {
    server.close(() => {
        done();
    });
    mongoose.connection.close().then();
});

describe("Serve ts", () => {

    test("should display a welcome message successfully", async () => {
        const res = await request
            .get('/')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.message).toEqual(messages.welcome);
    }, 30000)

    test("should return 404 if route not found", async () => {
        const res = await request
            .get('/notfound')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(404);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.notFound);
    }, 30000)
})
