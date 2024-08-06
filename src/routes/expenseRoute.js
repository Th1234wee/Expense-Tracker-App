import { Router } from "express";
import { validateToken } from "../utils/jwt_validate.js";
import { addNewExpenseController } from "../controller/expenseController.js";
const expenseRouter = Router();

expenseRouter.use(validateToken);
expenseRouter.post('/addExpense' , addNewExpenseController);

export default expenseRouter;