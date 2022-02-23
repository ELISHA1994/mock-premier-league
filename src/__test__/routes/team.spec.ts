import supertest from 'supertest';
import mongoose from "mongoose";
import { server } from "../../server";
import messages from "../../utils/messages";
import {
    createTeam, adminLogin, login, adminsignup, searchTeam
} from "../model/teamModel";
import {signup} from "../model/userModel";
import {searchFixtures} from "../model/fixtureModel";

const request = supertest(server);

afterAll(async () => {
    /* Drop the DB */
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close(() => {
        // done();
    });
});

//
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

// const baseUrl = '/api/v1';
const teamUrl = '/api/v1/team';
const teamsUrl = '/api/v1/teams';
const loginUrl = '/api/v1/user/login';
const postTeam = '/api/v1/team/%';
const userUrl = '/api/v1/user/signup';

describe("Team Routes", () => {
    let id;
    let adminToken;
    let userToken;
    const invalidId = '5d884a2f81ecaa59818bc3';

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

    test("should create a team successfully", async () => {
        const res = await request
            .post(teamUrl)
            .send(createTeam)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        id = res.body.data.team._id;
        expect(res.status).toEqual(201);
        expect(res.body.status).toEqual('success');
    }, 30000)

    test("should not create a team if its user token", async () => {
        const res = await request
            .post(teamUrl)
            .send(createTeam)
            .set('authorization', `Bearer ${userToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(403);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    }, 30000)

    test("should return 409, duplication error", async () => {
        const res = await request
            .post(teamUrl)
            .send(createTeam)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(409);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.duplicateName);
    }, 30000)

    test("should get all teams", async () => {
        const res = await request
            .get(teamsUrl)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
    }, 30000)

    test("should not get all teams if token is not provided", async () => {
        const res = await request
            .get(teamsUrl)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(401);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.unAuthorized)
    })

    test("should not get a team with invalid ID", async () => {
        const res = await request
            .get(`${teamUrl}/${invalidId}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.castError);
    }, 30000)

    test("should get a team successfully", async () => {
        const res = await request
            .get(`${teamUrl}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
    }, 30000)

    test("should edit a team successfully", async () => {
        const res = await request
            .put(`${teamUrl}/${id}`)
            .send(createTeam)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
    }, 30000)

    test("should not edit a team if not admin token", async () => {
        const res = await request
            .put(`${teamUrl}/${id}`)
            .send(createTeam)
            .set('authorization', `Bearer ${userToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(403);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    }, 30000)

    test("should not edit a team if id is invalid", async () => {
        const res = await request
            .put(`${teamUrl}/${invalidId}`)
            .send(createTeam)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.castError);
    })

    test("should not delete a team if not admin token", async () => {
        const res = await request
            .delete(`${teamUrl}/${id}`)
            .set('authorization', `Bearer ${userToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(403);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);

    })

    test("should delete a team successfully", async () => {
        const res = await request
            .delete(`${teamUrl}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.message).toEqual(messages.deleteMessage);

    }, 30000)

    test("should not delete an un-exist team", async () => {
        const res = await request
            .delete(`${teamUrl}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(404);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.notFound);
    }, 30000)

    test("should not delete a team with an invalid ID", async () => {
        const res = await request
            .delete(`${teamUrl}/${invalidId}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(400);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.castError);
    }, 30000)

    test("should not get an un-exist team", async () => {
        const res = await request
            .get(`${teamUrl}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(404);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.notFound);

    }, 30000)

    test("should not edit a team if not exist", async () => {
        const res = await request
            .put(`${teamUrl}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(createTeam);
        expect(res.status).toEqual(404);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.notFound);
    })

    test("should return 500 internal error", async () => {
        const res = await request
            .post(postTeam)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(createTeam);
        expect(res.status).toEqual(500);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.serverError);
    })

    test("should search team robustly", async () => {
        const res = await request
            .post(`${teamsUrl}/search`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(searchFixtures);
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
    })
})
