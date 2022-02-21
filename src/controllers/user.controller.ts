import mongoose from "mongoose";
import {Request, Response, RequestHandler, } from "express";
import User from "../models/userModel";
import messages from "../utils/messages";
import Helper from "../helpers/helperFunctions";
import {generateToken} from "../middlewares/Authentication";
import {IGetUserAuthInfoRequest} from "../global.types";

/**
 * Create user method
 * @param {object} req - response object
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const CreateUser: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    //Todo: Remove isAdmin
    const {
        email, password, firstName, lastName, isAdmin
    } = req.body;
    try {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password: Helper.hashPassword(password),
            firstName,
            lastName,
            isAdmin,
        })
        const token = generateToken(user._id, user.email, user.isAdmin);

        await user.save();
        return res.status(201).json({
            status: "success",
            data: {
                message: messages.user,
                token
            }
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
 * Login user method
 * @param {object} req - response object
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const LoginUser: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({
                status: 'error',
                data: { message: messages.userNotFound }
            })
        }
        // compare user provided password against db
        if (!Helper.comparePassword(user.password, password)) {
            return res.status(400).json({
                status: 'error',
                data: { message: messages.IncorrectLoginDetails }
            })
        }

        const token = generateToken(user._id, user.email, user.isAdmin)
        // Sanitise user object
        const userObject: any = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin
        }

        return res.status(200).json({
            status: 'success',
            data: { token, user: userObject }
        })
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            status: 'error',
            data: { message: messages.error }
        })
    }
}

/**
 * Get a user method
 * @param {object} req - request params:- 620e1871925c8349bde219f0
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const GetUser: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    const { userId } = req.params;
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const user = await User.findById({ _id: userId })
            .select('_id email firstName lastName')
            .exec()
        if (!user) {
            return res.status(404).json({
                status: 'error',
                data: { message: messages.notFound}
            })
        }

        return res.status(200).json({
            status: 'success',
            user
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

/**
 * Get all user method
 * @param {object} req - request params:- 620e1871925c8349bde219f0
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const GetAllUser: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response): Promise<Response> => {
    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const users = await User.find()
            .select('email firstName lastName')
            .exec()

        return res.status(200).json({
            status: 'success',
            data: {
                users,
                count: users.length
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            data: { message: messages.error }
        })
    }
}

/**
 * Delete user method
 * @param {object} req - response object
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const DeleteUser: RequestHandler = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { userId } = req.params;
    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                data: { message: messages.unAuthorizedRoute }
            })
        }
        const user = await User.findOneAndDelete({ _id: userId }).exec();
        if (!user) {
            return res.status(404).json({
                status: 'error',
                data: { message: messages.notFound }
            })
        }
        return res.status(200).json({
            status: 'success',
            data: {
                message: messages.userDeleteMessage
            }
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBlMTM5YmYxOTE0NjE1ZjM3NDdmMWQiLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDUwODk3NjMsImV4cCI6MTY0NTE3NjE2M30.xnTzWuivIkRQyfxDCnghT8nBii6eJ4nDDt0xxCwyY7g
