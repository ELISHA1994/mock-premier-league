import express, {Request, Response, IRouter} from "express";
import {addFixtureValidator} from "../validators/fixture.validator";
import runValidation from "../validators";
import {verifyToken} from "../middlewares/Authentication";
import checkTeamPresentInDatabase from "../middlewares/checkTeamPresentInDatabase";
import {AddFixture} from "../controllers/fixture.controller";

const router: IRouter = express.Router();

router.post(
    '/fixture',
    addFixtureValidator,
    runValidation,
    verifyToken,
    checkTeamPresentInDatabase,
    AddFixture
)

export default router;
