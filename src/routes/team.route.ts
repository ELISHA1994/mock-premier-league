import express, {IRouter} from "express";
import runValidation from "../validators";
import {verifyToken} from "../middlewares/Authentication";
import {addTeamValidator} from "../validators/team.validator";
import {AddTeam} from "../controllers/team.controllers";

const router: IRouter = express.Router();

//  Create a Team
router.post('/team', addTeamValidator, runValidation, verifyToken, AddTeam)

export default router;
