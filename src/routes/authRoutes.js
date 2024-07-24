import { Router } from "express";
import upload from "../utils/image_handler.js";
import { userRegisterController } from "../controller/authController.js";
const authRouter = Router();

authRouter.post('/register' , upload.single('file') , userRegisterController);


export default authRouter;