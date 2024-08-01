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
            response.status(200).json({
                message : "Add Success",
                result
            })
        })
    })
}