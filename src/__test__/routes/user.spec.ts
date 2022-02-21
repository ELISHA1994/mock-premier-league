import supertest from 'supertest';
import { server } from "../../server";
import messages from "../../utils/messages";
import {
    login, signup, invalidlogin, wrongEmail, adminLogin, adminsignup
} from '../model/userModel';
import mongoose from "mongoose";
const request = supertest(server);

afterAll(async () => {
    /* Drop the DB */
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close(() => {
        // done();
    });
});

beforeAll(async () => {
    const res = await request
        .post(userUrl)
        .send(adminsignup)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

})



const userUrl = '/api/v1/user/signup';
const loginUrl = '/api/v1/user/login';
const getUsers = '/api/v1/user';

describe("User Routes", () => {
    let id;
    let adminToken;
    let userToken;
    const invalidId = '5d884a2f81ecaa59818bc3';

    test("should create a user succesfully", async () => {
        const res = await request
            .post(userUrl)
            .send(signup)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(201);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.message).toEqual(messages.user);
    }, 30000)

    test("should return 409, duplication error", async () => {
        const res = await request
            .post(userUrl)
            .send(signup)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(409);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.duplicate);
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

    test("should not login user with wrong password", async () => {
        const res = await request
            .post(loginUrl)
            .send(invalidlogin)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(400);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.IncorrectLoginDetails);
    }, 30000)

    test("should not login user with invalid mail", async () => {
        const res = await request
            .post(loginUrl)
            .send(wrongEmail)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(404);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.userNotFound);
    }, 30000)

    test("should get all users", async () => {
        const res = await request
            .get(getUsers)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
    }, 30000)

    test("should not get all users if token is not provided", async () => {
        const res = await request
            .get(getUsers)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(401);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.unAuthorized);
    })

    test("should not get all users if not admin token", async () => {
        const res = await request
            .get(getUsers)
            .set('authorization', `Bearer ${userToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(403);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    })

    test("should get a user", async () => {
        const res = await request
            .get(`${getUsers}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');

    }, 30000)

    test("should not get a user with invalid ID", async () => {
        const res = await request
            .get(`${getUsers}/${invalidId}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.castError);
    })

    test("should not get a user if not admin token", async () => {
        const res = await request
            .get(`${getUsers}/${id}`)
            .set('authorization', `Bearer ${userToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(403);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    })

    test("should not delete a user if not admin token", async () => {
        const res = await request
            .delete(`${getUsers}/${id}`)
            .set('authorization', `Bearer ${userToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(403);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    })

    test("should delete a user successfully", async () => {
        const res = await request
            .delete(`${getUsers}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.message).toEqual(messages.deleteMessage);
    })

    test("should not delete an un-exist user", async () => {
        const res = await request
            .delete(`${getUsers}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(404);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.notFound);
    })

    test("should not delete a user with an invalid ID", async () => {
        const res = await request
            .delete(`${getUsers}/${invalidId}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(400);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.castError);
    })

    test("should not get an un-exist user", async () => {
        const res = await request
            .get(`${getUsers}/${id}`)
            .set('authorization', `Bearer ${adminToken}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(404);
        expect(res.body.status).toEqual('error');
        expect(res.body.data.message).toEqual(messages.notFound);
    })

})
