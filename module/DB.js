require('dotenv').config()
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { grantAccessToken } from './jwt';

const { host , password , user , database } = process.env ;

export const pool = mysql.createPool({
    host,
    user,
    password ,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function createUser ({ account , password , role}){
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
   
    let result  = await pool.query(`
        insert into user (account, password , role) values (? , ? , ?)
    `, [account , hash , role]);
    console.info({ result });
}

export async function signin ({ account , password }){
    const [fields, rows] = await pool.query(`
        select * from user where account = ? limit 1 
    ` , [account]);
    
    if(fields.length == 0){
        return {
            stataus : "error" , 
            msg : "user not found"
        }
    }


     
    const res = await bcrypt.compare(password, fields[0].password)
    
    let token ;
    if(res == true) { 
        const { account , role } = fields[0] ;
        token ={ 
            accessToken : await grantAccessToken({ account , role })
        }
    }

    return { 
        status : res , 
        msg : ( res == true ) ? "signin success" : "signin failed" ,
        ...token
    }; 
}


export async function createActivity ({ account , page , bookId , version}){
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
   
    let result  = await pool.query(`
        insert into activity (account, page , bookId , version) values (? , ? , ? , ?)
    `, [account , page , bookId , version]);
    console.info({ result });
}


export async function getContent(){
    /**
     * api version 
     * books 
     *  -content
     * reference
     */
    const [fields, rows]   = await pool.query(`
        select version as apiversion from api limit 1
    `, []);
    if(fields.length == 0){ return { status : false , msg : "invalid api version" } }
    
    const { apiversion } = fields[0] ;
    return {
        apiversion ,
        books : await getBooks() , 
        reference : await getReference()

    }



}

export async function getBooks(){
    const [fields, rows]   = await pool.query(`
        select * from book
    `, []);

    let jobs = fields.map(async (book)=>{

        return await getBookContent(book.id);

    })

    const values = await Promise.all(jobs)

    values.map((content , i)=>{
        fields[i].contents = content ;
    })
    

    return fields ;


}


export async function getBookContent(bookId){
    const [fields, rows]   = await pool.query(`
        select * from content where bookId = ?
    `, [bookId]);

    return fields ;

}

export async function getReference(){
    const [fields, rows]   = await pool.query(`
        select * from reference
    `, []);

    return fields ;

}