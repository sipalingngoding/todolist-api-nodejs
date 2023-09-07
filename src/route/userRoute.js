import {Router} from "express";

const userRoute = Router();

import userController from "../controller/userController.js";

userRoute.post('/register',userController.register);

userRoute.post('/login',userController.login);

export default userRoute;
