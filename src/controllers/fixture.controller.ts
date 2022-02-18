import {Request, Response, RequestHandler, Errback} from "express";
import mongoose from "mongoose";
import Fixture from "../models/fixtureModel";
import messages from "../utils/messages";
import compareTwoTeams from "../helpers/compareTwoTeam";

/**
 * Admin can add fixture
 * @param {object} req - response object
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const AddFixture: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const { teamA, teamB, matchInfo } = req.body;
    try {
        // @ts-ignore
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                body: { message: messages.unAuthorizedRoute }
            })
        }

        const fixture = new Fixture({
            _id: new mongoose.Types.ObjectId(),
            teamA,
            teamB,
            matchInfo
        });

        const compare = await compareTwoTeams(teamA, teamB);
        if (compare) {
            return res.status(409).json({
                status: 'error',
                body: { message: messages.sameTeam }
            })
        }

        const result = await Fixture.find({ teamA, teamB, matchInfo });
        if (result.length >= 1) {
            return res.status(409).json({
                status: 'error',
                body: { message: messages.existingFixture }
            })
        }
        const createdFixture = await fixture.save();
        return res.status(201).json({
            status: 'success',
            data: createdFixture
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            body: { message: messages.error }
        })
    }
}

export const RemoveFixture: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const { fixtureId } = req.params;
    try {
        // @ts-ignore
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                body: { message: messages.unAuthorizedRoute }
            })
        }
        const fixture: mongoose.Document = await Fixture.findByIdAndDelete({ _id: fixtureId }).exec();
        if (!fixture) {
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
