import express from 'express';
import { config } from 'dotenv';
import authRouter from './src/routes/authRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import expenseRouter from './src/routes/expenseRoute.js';
import pool from './src/db/dbConnect.js';
import { validateToken } from './src/utils/jwt_validate.js';
config();
// 1. initialize application
const app = express();
const port = process.env.port | 3000;
// 2. built-in middleware setup
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('public',express.static('uploads'));
// 3. initialize database
pool.getConnection((error,connection) => {
    if(error) return console.log(`Failed Connect Database`);
    console.log(`Success Connect Database`);
    connection.release();
});
// 4. route middleware
app.use('/api/auth/',authRouter);
app.use('/api/user/',userRouter);
app.use('/api/expense',expenseRouter);
//testing route
app.get('/' , validateToken , (request,response) => {
    response.send("Index Route")
})

app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`);
})