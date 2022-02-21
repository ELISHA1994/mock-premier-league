import supertest from 'supertest';
import mongoose from "mongoose";
import { server } from "../../server";
import messages from "../../utils/messages";

import {
    createFixture, adminLogin, login, sameTeam, validFixture, signup, adminsignup, createTeamB
} from "../model/fixtureModel";
import {createTeamA} from "../model/fixtureModel";

const request = supertest(server);

const fixtureUrl = '/api/v1/fixture';
const fixturesUrl = '/api/v1/fixtures';
const loginUrl = '/api/v1/user/login';
const userUrl = '/api/v1/user/signup';
const teamUrl = '/api/v1/team';

afterAll(async () => {
    /* Drop the DB */
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close(() => {
        // done();
    });
});

beforeAll(async () => {
    await request
        .post(userUrl)
        .send(adminsignup)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    await request
        .post(userUrl)
        .send(signup)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
})

describe("Fixture Route", () => {
    let id;
    let adminToken;
    let userToken;
    const invalidId = '5d884a2f81ecaa59818bc3';
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBlMTM5YmYxOTE0NjE1ZjM3NDdmMWQiLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDUxOTk4OTUsImV4cCI6MTY0NTI4NjI5NX0.5Px1nWENIz-d3s4lOgvSdrgS8EvAqBi8U0ecp9Ofb6E';

    test("should login admin successfully", async () => {
        const res = await request
            .post(loginUrl)
            .send(adminLogin)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        adminToken = res.body.data.token;
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
    }, 30000)

    test("should login user successfully", async () => {
        const res = await request
            .post(loginUrl)
            .send(login)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        id = res.body.data.user._id;
        userToken = res.body.data.token;
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
    }, 30000)

    test("should not create a fixture for unavailable team", async () => {
        const res = await request
            .post(fixtureUrl)
            .send(createFixture)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(404);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.teamNotFound);
    })

    describe("Wrapper for when team is available", () => {

        beforeEach(async () => {
            await request
                .post(teamUrl)
                .send(createTeamA)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')

            await request
                .post(teamUrl)
                .send(createTeamB)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
        })
        test("should not create a fixture if teamA is the same with teamB", async () => {

            const res = await request
                .post(fixtureUrl)
                .send(sameTeam)
                .set('authorization', `Bearer ${adminToken}`);
            // console.log(res.body.data);
            expect(res.status).toEqual(409);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.sameTeam);
        }, 30000)

        test("should not create a fixture if its user token", async () => {
            const res = await request
                .post(fixtureUrl)
                .send(validFixture)
                .set('authorization', `Bearer ${userToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');

            // console.log(res.body.data);
            expect(res.status).toEqual(403);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);

        }, 3000)

        test("should create a fixture successfully", async () => {
            const res = await request
                .post(fixtureUrl)
                .send(validFixture)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            id = res.body.data.createdFixture._id;
            expect(res.status).toEqual(201);
            expect(res.body.status).toEqual('success');
        }, 30000)

        test("should not create a fixture if same and its status is pending", async () => {
            const res = await request
                .post(fixtureUrl)
                .send(validFixture)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');

            expect(res.status).toEqual(409);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.existingFixture);
        }, 30000)

        test("should get a fixture", async () => {
            const res = await request
                .get(`${fixtureUrl}/${id}`)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        }, 30000)

        test("should get all fixtures", async () => {
            const res = await request
                .get(fixturesUrl)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        }, 30000)

        test("should not get all fixtures if not admin", async () => {
            const res = await request
                .get(fixturesUrl)
                .set('authorization', `Bearer ${userToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(403);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
        })

        test("should not get all teams if token is not provided", async () => {
            const res = await request
                .get(fixturesUrl)
                .set('authorization', `Bearer ${expiredToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.tokenExpired);
        }, 30000)

        test("should not get a fixture with invalid ID", async () => {
            const res = await request
                .get(`${fixtureUrl}/${invalidId}`)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.castError);
        }, 30000)

        test("should get a fixture successfully", async () => {
            const res = await request
                .get(`${fixtureUrl}/${id}`)
                .set('authorization', `Bearer ${userToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(403);
            expect(res.body.status).toEqual('error');
        })

        test("should get all pending fixture successfully", async () => {
            const res = await request
                .get(`${fixturesUrl}/pending`)
                .set('authorization', `Bearer ${userToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        }, 30000)

        test("should get all completed fixture successfully", async () => {
            const res = await request
                .get(`${fixturesUrl}/completed`)
                .set('authorization', `Bearer ${userToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        }, 30000)

        test("should edit a fixture successfully", async () => {
            const res = await request
                .put(`${fixtureUrl}/${id}`)
                .send(validFixture)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
        }, 30000)

        test("should not edit a fixture if not admin token", async () => {
            const res = await request
                .put(`${fixtureUrl}/${id}`)
                .send(validFixture)
                .set('authorization', `Bearer ${userToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(403);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
        }, 30000)

        test("should not throw 400 error if valid fixture datas are not provided", async () => {
            const res = await request
                .put(`${fixtureUrl}/${id}`)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('error');
        }, 30000)

        test("should not throw an error if id is invalid", async () => {
            const res = await request
                .put(`${fixtureUrl}/${invalidId}`)
                .send(validFixture)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.castError);
        }, 30000)

        test("should not delete a fixture if not admin token", async () => {
            const res = await request
                .delete(`${fixtureUrl}/${id}`)
                .set('authorization', `Bearer ${userToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(403);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
        }, 30000)

        test("should delete a fixture successfully", async () => {
            const res = await request
                .delete(`${fixtureUrl}/${id}`)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('success');
            expect(res.body.data.message).toEqual(messages.deleteMessage);
        }, 30000)

        test("should not delete an un-exist fixture", async () => {
            const res = await request
                .delete(`${fixtureUrl}/${id}`)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(404);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.notFound);
        })

        test("should not delete a fixture with an invalid ID", async () => {
            const res = await request
                .delete(`${fixtureUrl}/${invalidId}`)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.castError);
        }, 30000)

        test("should not get an un-exist fixture", async () => {
            const res = await request
                .get(`${fixtureUrl}/${id}`)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.status).toEqual(404);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.notFound);
        }, 30000)

        test("should not edit a fixture if not exist", async () => {
            const res = await request
                .put(`${fixtureUrl}/${id}`)
                .set('authorization', `Bearer ${adminToken}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(validFixture);
            expect(res.status).toEqual(404);
            expect(res.body.status).toEqual('error');
            expect(res.body.data.message).toEqual(messages.notFound);
        }, 30000)
    })

})
