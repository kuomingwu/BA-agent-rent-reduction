import { pool } from './db';
import * as webinar from './webinar';
import sgMail from '@sendgrid/mail';

require('dotenv').config()
const { SENDGRID_API_KEY , SENDGRID_FROM , FRONTEND_DOMAIN } = process.env;

export const changeAcitivtyWebinarPropery = async ({ webinarKey , activityName }) =>{

    pool.query(`
        INSERT INTO activity (webinarKey , name ) VALUES( ? ,  ?) ON DUPLICATE KEY UPDATE webinarKey=?
    ` , [ webinarKey , activiityName , webinarKey ] , (err, rows, fields)=>{

        

    })
    
}


export const createRegisterLink = async ({ webinarKey , activityId , firstName , lastName , email , hijackEmail , joinUrl , avatar }) =>{
    return new Promise((resolve , reject)=>{
        pool.query(`
            INSERT INTO register (
                webinarKey , 
                activityId ,
                firstName ,
                lastName ,
                email ,
                hijackEmail ,
                joinUrl , 
                avatar
                
            ) VALUES( ? ,  ? , ? , ? , ? , ? , ? , ? )
        ` , [ webinarKey , activityId , firstName , lastName , email , hijackEmail , joinUrl , avatar ] , (err, rows, fields)=>{
            
            if(err) return reject(err);
            return resolve(rows);
        })
    })
}


export const sendRegisterConfirmEamil = async ({ 
        webinarKey , 
        firstName , 
        lastName , 
        email , 
        activityId 
    }) =>{
    
    const { name , subject , description , times  } = await webinar.getWebinarByKey({ webinarKey });
    
    const { startTime , endTime } = times[0] ;

    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: SENDGRID_FROM,
        subject: subject,
        text: description,
        html: `<strong><div>Hi ${firstName} ${lastName}</div><div>會議開始時間 ${startTime} ~ ${endTime}</div><div><a href="${FRONTEND_DOMAIN}/activity/${activityId}" >請點擊連結進入展場</a></div></strong>`,
    };
    //ES6
    await sgMail.send(msg)


}


export const getActivityMettingById = async ({ activityId }) => {
    let activity = await getActivityById({ activityId });
    let meetings = await getMeetingByActivityId({ activityId });
    activity.meetings = meetings ;
    return activity ; 
}


export const getActivityById = async ({ activityId }) =>{

    return new Promise((resolve , reject)=>{
        pool.query(`
            SELECT * FROM activity where id = ?
        ` , [ activityId ] , (err, rows, fields)=>{
            
            if(err || rows.length < 1 ) return reject(err);
            return resolve(rows[0]);
        })
    })


}


export const getMeetingByActivityId = async ({ activityId }) =>{

    return new Promise((resolve , reject)=>{
        pool.query(`
            SELECT * FROM meeting where activityId = ?
        ` , [ activityId ] , async(err, rows, fields)=>{
            
            if(err) return reject(err);
            
            let jobs = rows.map(async ( { webinarKey } )=>{
                return await webinar.getWebinarByKey({ webinarKey });
            })

            Promise.all(jobs).then(meetings=>{
               
                return resolve(meetings);
            })

           
        })
    })


}