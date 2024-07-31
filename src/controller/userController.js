import pool from "../db/dbConnect.js";

export const getAuthenticatedUserController = (request,response) => {
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
export const editAuthenticatedUserController = (request,response) => {
    const authenticatedUsername = request.user.username;
    const { balance }           = request.body;
    const fileName              = request.file.filename;

    if(!authenticatedUsername) return response.status(500).json({
        message : "Unauthorized"
    })

    const sql = `UPDATE user SET profile_image = ? , balance = ? WHERE username = ?`
    const updatedValue = [fileName , balance , authenticatedUsername];
    pool.query(sql,updatedValue,(error,result) => {
        if(error) return response.status(500).json({
            message : "Something Went Wrong"
        })
        response.status(200).json({
            message : result
        })
    })
}