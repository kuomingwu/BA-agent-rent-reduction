require('dotenv').config()
import mysql from 'mysql2';


const { DB_HOST , DB_ACCOUNT , DB_PASSWORD , DB_NAME } = process.env ;

export const pool = mysql.createPool({
    host : DB_HOST ,
    user : DB_ACCOUNT,
    password : DB_PASSWORD ,
    database : DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
