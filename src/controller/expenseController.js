import pool from "../db/dbConnect.js";

export const addNewExpenseController = (request,response) => {
    const authenticatedUsername = request.user.username;
    const { title,type,category,description,expense_amount } = request.body;
    pool.query(`SELECT id FROM user WHERE username = ?`,authenticatedUsername , (error,row) => {
        if(error) return response.status(500).json({
            message : "Something Went Wrong"
        })
        // console.log(row[0].id);
        if(!title && !type && !category && !description && !expense_amount){
            return response.status(400).json({
                message : "Bad Request"
            })
        }
        const sql_insert = `INSERT INTO expense (title,type,category,description,expense_amount,user_id)
                                        VALUES (?,?,?,?,?,?)`;
        const insertValue = [title , type , category , description , expense_amount , row[0].id]
        pool.query(sql_insert , insertValue , (error,result) => {
            if(error) return response.status(500).json({
                message : "Add Failed",
            })
            if(type.toLowerCase() === "income"){
                const editBalanceSQL = `UPDATE user SET balance = balance + ? WHERE id = (SELECT user_id FROM expense WHERE user_id = ? ORDER BY user_id LIMIT 1)`
                pool.query(editBalanceSQL,[expense_amount,row[0].id],(error,result) => {
                    if(error) return response.status(500).json({
                        message : "Something went wrong"
                    })
                    response.status(200).json({
                        message : "Processing Transaction success",
                        result
                    })
                })
            }
            else{
                const editBalanceSQL = `UPDATE user SET balance = balance - ? WHERE id = (SELECT user_id FROM expense WHERE user_id = ? ORDER BY user_id LIMIT 1)`
                pool.query(editBalanceSQL,[expense_amount,row[0].id],(error,result) => {
                    if(error) return response.status(500).json({
                        message : "Something went wrong"
                    })
                    response.status(200).json({
                        message : "Processing Transaction success",
                        result
                    })
                })
            }
            
        })
    })
}