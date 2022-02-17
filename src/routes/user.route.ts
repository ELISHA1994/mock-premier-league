import express, {Request, Response, IRouter} from "express";
import runValidation from "../validators";
import {userSigninValidator, userSignupValidator} from "../validators/auth.validator";
import {CreateUser, DeleteUser, GetUser, LoginUser} from "../controllers/user.controller";
import {verifyToken} from "../middlewares/Authentication";


const router: IRouter = express.Router();

// User Signup Routes
router.post('/signup', userSignupValidator, runValidation, CreateUser);

// User Login Routes
router.post('/login', userSigninValidator, runValidation, LoginUser);

// Get A User Routes
router.get('/:userId', verifyToken, GetUser);

// Delete User Routes
router.delete('/:userId', verifyToken, DeleteUser);

export default router;
