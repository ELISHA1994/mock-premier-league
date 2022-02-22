import express, {IRouter} from "express";
import runValidation from "../validators";
import {verifyToken} from "../middlewares/Authentication";
import {addTeamValidator, updateTeamValidator} from "../validators/team.validator";
import {AddTeam, EditTeam, RemoveTeam, SearchTeam, ViewAllTeam, ViewATeam} from "../controllers/team.controller";

const router: IRouter = express.Router();

//  Create a Team
router.post('/team', addTeamValidator, runValidation, verifyToken, AddTeam)

// Edit a team route
router.put('/team/:teamId', updateTeamValidator, runValidation, verifyToken, EditTeam)

// View a team route
router.get('/team/:teamId', verifyToken, ViewATeam)

// View all team route
router.get('/teams', verifyToken, ViewAllTeam)

// remove a team
router.delete('/team/:teamId', verifyToken, RemoveTeam)

// search team robustly
router.post('/teams/search',  SearchTeam)


export default router;
