import pool from "../db/dbConnect.js";

export const getAuthenticatedUser = (request,response) => {
    const authenticatedUsername = request.user.username;
    const sql = `SELECT * FROM user WHERE username = ?`;
    pool.query(sql , authenticatedUsername , (error,row) => {
        if(error) return response.status(500).json({
            message : "Something went wrong"
        })
        response.status(200).json({
            message : "Get User Success",
            data    : row
        })
    })
}