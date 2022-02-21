import { Request, Response, RequestHandler } from "express";
import mongoose from "mongoose";
import Team from "../models/teamModel";
import messages from "../utils/messages";
import {IGetUserAuthInfoRequest} from "../global.types";

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
                data: { message: messages.unAuthorizedRoute }
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
            data: { team: team }
        })
    } catch (error) {
        if (error.errors.teamName.name === 'ValidatorError') {
            return res.status(409).json({
                status: 'error',
                data: { message: messages.duplicateName }
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
export const EditTeam: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
    const { teamName, teamMembers, description } = req.body;
    const { teamId } = req.params;
    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const team = await Team.findByIdAndUpdate(
            { _id: teamId },
            {
                $set: {
                    teamName,
                    teamMembers,
                    description,
                }
            },
            { useFindAndModify: false }
        ).exec();
        if (!team) {
            return res.status(404).json({
                status: 'error',
                data: { message: messages.notFound }
            })
        }
        // console.log(team);
        return res.status(200).json({
            status: 'success',
            data: { message: messages.updateMessage }
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

export const ViewATeam: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    const { teamId } = req.params;
    try {
        const team = await Team.findById({ _id: teamId })
            .select('_id teamName teamMembers description')
            .exec();
        if (!team) {
            return res.status(404).json({
                status: 'error',
                data: { message: messages.notFound }
            })
        }
        return res.status(200).json({
            status: 'success',
            data: {team}
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

export const ViewAllTeam: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const teams = await Team.find()
            .select('_id teamName teamMembers description')
            .exec();
        return res.status(200).json({
            status: 'success',
            data: { teams, count: teams.length }
        })
    } catch (error) {
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
export const RemoveTeam: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
    const { teamId } = req.params;
    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const team = await Team.findByIdAndDelete({ _id: teamId }).exec()
        if (!team) {
            return res.status(404).json({
                status: 'error',
                data: { message: messages.notFound }
            })
        }
        return res.status(200).json({
            status: 'success',
            data: { message: messages.deleteMessage }
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
