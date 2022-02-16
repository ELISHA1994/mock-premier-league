import express, {Request, Response, IRouter} from "express";
import runValidation from "../validators";
import {userSigninValidator, userSignupValidator} from "../validators/auth.validator";
import {CreateUser, LoginUser} from "../controllers/user.controller";


const router: IRouter = express.Router();

// User Signup Routes
router.post('/signup', userSignupValidator, runValidation, CreateUser);

// User Login Routes
router.post('/login', userSigninValidator, runValidation, LoginUser);

export default router;
