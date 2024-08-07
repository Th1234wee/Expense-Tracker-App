import { Router } from "express";
import { validateToken } from "../utils/jwt_validate.js";
import { addNewExpenseController, editAuthenticatedUserExpense, getAllAuthenticatedUserExpense } from "../controller/expenseController.js";
const expenseRouter = Router();

expenseRouter.use(validateToken);
expenseRouter.post('/addExpense' , addNewExpenseController);
expenseRouter.get('/getAllExpenses',getAllAuthenticatedUserExpense);
expenseRouter.put('/editExpense/:id' , editAuthenticatedUserExpense)

export default expenseRouter;