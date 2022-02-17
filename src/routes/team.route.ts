import express, {IRouter} from "express";
import runValidation from "../validators";
import {verifyToken} from "../middlewares/Authentication";
import {addTeamValidator, updateTeamValidator} from "../validators/team.validator";
import {AddTeam, EditTeam, RemoveTeam} from "../controllers/team.controllers";

const router: IRouter = express.Router();

//  Create a Team
router.post('/team', addTeamValidator, runValidation, verifyToken, AddTeam)

// Edit a team route
router.put('/team/:teamId', updateTeamValidator, runValidation, verifyToken, EditTeam)

// remove a team
router.delete('/team/:teamId', verifyToken, RemoveTeam)

export default router;
