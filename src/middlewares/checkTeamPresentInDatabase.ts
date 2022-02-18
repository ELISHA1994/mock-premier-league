import Team from "../models/teamModel";
import messages from "../utils/messages";
import {RequestHandler, Request, Response, NextFunction} from "express";

const checkTeamPresentInDatabase: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const teamA = req.body.teamA[0].name;
    const teamB = req.body.teamB[0].name;

    try {
        const team1 = await Team.find({ teamName: teamA }).exec();
        const team2 = await Team.find({ teamName: teamB }).exec();
        if (team1.length <= 0 || team2.length <= 0) {
            return res.status(404).json({
                status: 'error',
                message: messages.teamNotFound
            })
        }
        return next();
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            body: { message: messages.error }
        })
    }
}

export default checkTeamPresentInDatabase
