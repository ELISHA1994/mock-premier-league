import express, {IRouter} from "express";
import runValidation from "../validators";
import {verifyToken} from "../middlewares/Authentication";
import {addTeamValidator} from "../validators/team.validator";
import {AddTeam, RemoveTeam} from "../controllers/team.controllers";

const router: IRouter = express.Router();

//  Create a Team
router.post('/team', addTeamValidator, runValidation, verifyToken, AddTeam)

// remove a team
router.delete('/team/:teamId', verifyToken, RemoveTeam)

export default router;
