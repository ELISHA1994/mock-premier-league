import express, {Request, Response, IRouter} from "express";
import {addFixtureValidator, updateFixtureValidator} from "../validators/fixture.validator";
import runValidation from "../validators";
import {verifyToken} from "../middlewares/Authentication";
import checkTeamPresentInDatabase from "../middlewares/checkTeamPresentInDatabase";
import {
    AddFixture,
    EditFixture,
    RemoveFixture,
    ViewAFixture,
    ViewAllFixture,
    ViewCompletedFixture, ViewPendingFixture
} from "../controllers/fixture.controller";

const router: IRouter = express.Router();

// Create fixtures routes
router.post(
    '/fixture',
    addFixtureValidator,
    runValidation,
    verifyToken,
    checkTeamPresentInDatabase,
    AddFixture
)

// Edit Fixtures routes
router.put(
    '/fixture/:fixtureId',
    updateFixtureValidator,
    runValidation,
    verifyToken,
    checkTeamPresentInDatabase,
    EditFixture
)

// view a fixture route
router.get(
    '/fixture/:fixtureId',
    verifyToken,
    ViewAFixture
)

// View all fixture route
router.get('/fixtures', verifyToken, ViewAllFixture)

// Delete Fixtures routes
router.delete('/fixture/:fixtureId', verifyToken, RemoveFixture)

// view completed fixtures route
router.get('/fixtures/completed', verifyToken, ViewCompletedFixture)

// view all pending fixture route
router.get('/fixtures/pending', verifyToken, ViewPendingFixture)

export default router;
