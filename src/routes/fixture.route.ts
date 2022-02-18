import express, {Request, Response, IRouter} from "express";
import {addFixtureValidator} from "../validators/fixture.validator";
import runValidation from "../validators";
import {verifyToken} from "../middlewares/Authentication";
import checkTeamPresentInDatabase from "../middlewares/checkTeamPresentInDatabase";
import {AddFixture, RemoveFixture} from "../controllers/fixture.controller";

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

// Delete Fixtures routes
router.delete('/fixture/:fixtureId', verifyToken, RemoveFixture)

export default router;
