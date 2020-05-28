import axios from 'axios';
import Cookie from 'js-cookie';
require('dotenv').config()

const { REACT_APP_API_DOMAIN } = process.env ; 

export function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}




export async function identifyUser(base64Image){
    const endpoint = `${REACT_APP_API_DOMAIN}/api/face/verify`;
    const formData = new FormData();
    
    formData.append('file', dataURItoBlob(base64Image));
    
    try {
        let { accessToken } = ( await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }) ).data
        Cookie.set("accessToken" , accessToken);
        alert("Login success");
        return true ; 
    }catch(e){
        alert("Login failed");
        return false ;
    }
    

}


export async function getActivityByActivityId({ activityId }){
    const endpoint = `${REACT_APP_API_DOMAIN}/api/activity/${activityId}`;
    return ( await axios.get(endpoint, {
        headers: {

        }
    }) ).data

}


export async function registerActivity({ activityId , firstName , lastName , email , avatar }){
    
    const endpoint = `${REACT_APP_API_DOMAIN}/api/activity/${activityId}/register`;
    return ( await axios.post(endpoint,{
        firstName , lastName , email , avatar
    } , {
        headers: {

        }
    }) ).data

}