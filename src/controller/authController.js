import pool from "../db/dbConnect.js";
import generateToken from "../utils/generate_token.js";
import bcrypt from 'bcrypt';
import { config } from "dotenv";
config();

export const userRegisterController = (request,response) => {
    const image = request.file;
    const { username , email , password , balance } = request.body;
    const hashedPassword = bcrypt.hash(password,process.env.round_number);
    if(username && email && hashedPassword && balance && image){
        const sql = `INSERT INTO user (username,email,hashedPassword,balance,profile_image) VALUES (?,?,?,?,?)`;
        const insertValue = [username,email,password,balance,image.filename];
        pool.query(sql,insertValue,(error,result) => {
            if(error) return response.status(500).json({message : "Something Went Wrong"});
            response.status(200).json({
                message : "Register Success",
                token : generateToken({ username })
            })
        })
    }else{
        response.status(403).json({
            message : "All Field Must Not Be Empty"
        });
    }
}