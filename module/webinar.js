import axios from 'axios';
import base64 from 'base-64';
import qs from 'querystring';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config()


const { WEBINAR_KEY , WEBINAR_SECRET , WEBINAR_USERNAME , WEBINAR_PASSWORD , WEBINAR_COMPANY_DOMAIN } = process.env ; 

const getBasicToken = () =>{
    return base64.encode(`${WEBINAR_KEY}:${WEBINAR_SECRET}`);
}


export const getAccessToken = async ()=>{
    const basicToken = getBasicToken();
    const endpoint = `https://api.getgo.com/oauth/v2/token`;
    return ( await axios.post(endpoint , qs.stringify({
        grant_type : "password",
        username : WEBINAR_USERNAME ,
        password : WEBINAR_PASSWORD 
    }) , {
        headers : {
            "Authorization" : `Basic ${basicToken}`,
            "Content-Type" : `application/x-www-form-urlencoded`
        }
    }) ).data 
}

export const register = async ({ webinarKey , firstName , lastName , email }) =>{
    const { access_token , organizer_key  } = await getAccessToken();
    
    const endpoint = `https://api.getgo.com/G2W/rest/v2/organizers/${organizer_key}/webinars/${webinarKey}/registrants?resendConfirmation=false`;
    
    const id = uuidv4() ;
    
    const hijackEmail = `${id}@${WEBINAR_COMPANY_DOMAIN}`;

    const { joinUrl , asset , registrantKey , status } = (await axios.post(endpoint , {
        firstName , 
        lastName , 
        email : hijackEmail
    } , {
            headers : {
                "Authorization" : `Bearer ${access_token}`
            }
    }) ).data ;
    return { joinUrl , asset , registrantKey , status , hijackEmail }
} 

export const create = async ({ subject , description , times , ...args }) =>{
    
    /**
     *  
        @response { string } webinarKey
     * 
     */
    const { access_token , organizer_key ,email , firstName , lastName } = await getAccessToken();
    const endpoint = `https://api.getgo.com/G2W/rest/v2/organizers/${organizer_key}/webinars`;
    let { webinarKey } = ( await axios.post(endpoint , {
        subject  ,
        description ,
        timeZone : "Asia/Taipei" ,
        times : [
            times
        ] ,
        ...args
    } , {
        headers : {
            "Authorization" : `Bearer ${access_token}`,
            "Content-Type" : `application/json`
        }
    }) ).data
    return { webinarKey , organizer_key }
}


export const getWebinarByKey = async ({ webinarKey }) =>{
    const { access_token , organizer_key  } = await getAccessToken();
    const endpoint = `https://api.getgo.com/G2W/rest/v2/organizers/${organizer_key}/webinars/${webinarKey}`;
    const { name , subject , description , times , registrationUrl } =  ( await axios.get(endpoint , {
        headers : {
            "Authorization" : `Bearer ${access_token}`,
            "Content-Type" : `application/json`
        }
    } ) ).data
    return { webinarKey , name , subject , description , times , registrationUrl } ;
}