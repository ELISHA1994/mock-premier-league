import {Request, Response, RequestHandler, Errback} from "express";
import mongoose from "mongoose";
import Fixture from "../models/fixtureModel";
import messages from "../utils/messages";
import compareTwoTeams from "../helpers/compareTwoTeam";
import {IGetUserAuthInfoRequest} from "../global.types";

/**
 * Admin can add fixture
 * @param {object} req - response object
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const AddFixture: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    // console.log("Executing AddFixture");
    const { teamA, teamB, matchInfo } = req.body;
    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
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
                data: { message: messages.sameTeam }
            })
        }

        const results = await Fixture.find({ teamA, teamB, matchInfo });
        const itsPendingFixture = results.filter(result => result.status === 'pending');
        if (itsPendingFixture.length >= 1) {
            return res.status(409).json({
                status: 'error',
                data: { message: messages.existingFixture }
            })
        }
        const createdFixture = await fixture.save();
        return res.status(201).json({
            status: 'success',
            data: {createdFixture}
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            body: { message: messages.error }
        })
    }
}

export const RemoveFixture: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    const { fixtureId } = req.params;
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const fixture: mongoose.Document = await Fixture.findByIdAndDelete({ _id: fixtureId }).exec();
        if (!fixture) {
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

export const EditFixture: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    const { fixtureId } = req.params;
    const {
        teamA, teamB, matchInfo, status
    } = req.body;
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const fixture: mongoose.Document = await Fixture.findByIdAndUpdate(
            { _id: fixtureId },
            {
                $set: {
                    teamA,
                    teamB,
                    matchInfo,
                    status
                }
            },
            { useFindAndModify: false }
        ).exec()
        if (!fixture) {
            return res.status(404).json({
                status: 'error',
                data: { message: messages.notFound }
            })
        }
        return res.status(200).json({
            status: 'success',
            data: { message: messages.updateMessage}
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

export const ViewAFixture: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    const { fixtureId } = req.params
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const fixture: mongoose.Document = await Fixture.findById({ _id: fixtureId })
            .exec();
        if (!fixture) {
            return res.status(404).json({
                status: 'error',
                data: { message: messages.notFound }
            })
        }
        return res.status(200).json({
            status: 'success',
            data: fixture
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

export const ViewAllFixture: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const fixture = await Fixture.find().exec()
        return res.status(200).json({
            status: 'success',
            data: {
                fixture,
                count: fixture.length
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            data: { message: messages.error }
        })
    }
}

export const ViewCompletedFixture: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    try {
        const fixture =  await Fixture.find(
            { status: 'completed'}
        ).exec();
        return res.status(200).json({
            status: 'success',
            body: {
                fixture,
                count: fixture.length
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            data: { message: messages.error }
        })
    }
}

export const ViewPendingFixture: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    try {
        const fixture =  await Fixture.find(
            { status: 'pending'}
        ).exec();
        return res.status(200).json({
            status: 'success',
            body: {
                fixture,
                count: fixture.length
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            data: { message: messages.error }
        })
    }
}
