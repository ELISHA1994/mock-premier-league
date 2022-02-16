import mongoose from "mongoose";
import {Request, Response, RequestHandler, } from "express";
import User from "../models/userModel";
import messages from "../utils/messages";
import Helper from "../helpers/helperFunctions";
import {generateToken} from "../middlewares/Authentication";

/**
 * Create user method
 * @param {object} req - response object
 * @param {object} res - response object
 * @returns {object} returns response
 *
 * @example
 */
export const CreateUser: RequestHandler = async (req: Request, res: Response) => {
    const {
        email, password, firstName, lastName
    } = req.body;
    try {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password: Helper.hashPassword(password),
            firstName,
            lastName
        })
        const token = generateToken(user._id, user.email, user.isAdmin);

        const doc = await user.save();
        if (doc) {
            return res.status(201).json({
                status: "success",
                data: {
                    token
                }
            })
        }
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

export const LoginUser: RequestHandler = async (req: Request, res: Response) => {
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
            return res.status(404).json({
                status: 'error',
                data: { message: messages.IncorrectLoginDetails }
            })
        }

        const token = generateToken(user._id, user.email, user.isAdmin)
        // Sanitise user object
        const userObject: any = {
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
