import { Router } from "express";
import { validateToken } from "../utils/jwt_validate.js";
import { getAuthenticatedUser } from "../controller/userController.js";
const userRouter = Router();

userRouter.use(validateToken);
userRouter.get('/getAuthenticatedUser' , getAuthenticatedUser);









export default userRouter;