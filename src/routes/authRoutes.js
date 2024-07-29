import { Router } from "express";
import upload from "../utils/image_handler.js";
import { userLoginController, userRegisterController } from "../controller/authController.js";
const authRouter = Router();

authRouter.post('/register' , upload.single('file') , userRegisterController);
authRouter.post('/login',userLoginController);


export default authRouter;