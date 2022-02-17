import { Request, Response, RequestHandler } from "express";
import mongoose from "mongoose";
import Team from "../models/teamModel";
import messages from "../utils/messages";

/**
 * Admin can add team
 * @param {object} req - response object
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const AddTeam: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    const {
        teamName, teamMembers, description
    } = req.body;
    try {
        // @ts-ignore
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                body: { message: messages.unAuthorizedRoute }
            })
        }

        const team = new Team({
            _id: new mongoose.Types.ObjectId(),
            teamName,
            teamMembers,
            description
        })
        await team.save();
        return res.status(201).json({
            status: 'success',
            data: team
        })
    } catch (error) {
        if (error.errors.email.name === 'ValidatorError') {
            return res.status(409).json({
                status: 'error',
                data: { message: messages.duplicate }
            })
        }

        return res.status(400).json({
            status: 'error',
            data: { message: messages.error }
        })
    }
}

/**
 * admin can a remove team
 * @param {object} req - response object
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const RemoveTeam: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    const { teamId } = req.params;
    try {
        // @ts-ignore
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                body: { message: messages.unAuthorizedRoute }
            })
        }
        const team = await Team.findByIdAndDelete({ _id: teamId }).exec()
        if (!team) {
            return res.status(404).json({
                status: 'error',
                body: { message: messages.notFound }
            })
        }
        return res.status(200).json({
            status: 'success',
            body: { message: messages.deleteMessage }
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                status: 'error',
                data: { message: messages.castError }
            })
        }
        return res.status(400).json({
            status: 'error',
            data: { message: messages.error }
        })
    }
}
