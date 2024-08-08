import { Router } from "express";
import { validateToken } from "../utils/jwt_validate.js";
import { addNewExpenseController, editAuthenticatedUserExpense, expensePagination, getAllAuthenticatedUserExpense } from "../controller/expenseController.js";
const expenseRouter = Router();

expenseRouter.use(validateToken);
expenseRouter.post('/addExpense' , addNewExpenseController);
expenseRouter.get('/getAllExpenses',getAllAuthenticatedUserExpense);
expenseRouter.put('/editExpense/:id' , editAuthenticatedUserExpense);
expenseRouter.get('/paginations' , expensePagination);

export default expenseRouter;