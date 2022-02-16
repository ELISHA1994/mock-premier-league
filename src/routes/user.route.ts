import express, {Request, Response, IRouter} from "express";
import runValidation from "../validators";
import {userSignupValidator} from "../validators/auth.validator";
import {CreateUser} from "../controllers/user.controller";


const router: IRouter = express.Router();


router.post('/signup', userSignupValidator, runValidation, CreateUser);

export default router;
