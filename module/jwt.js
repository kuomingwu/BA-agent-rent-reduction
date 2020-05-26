import jwt from 'jsonwebtoken';
import fs from 'fs' ;
export const privateKey = fs.readFileSync('./ssl/private.key');
export const publicKey = fs.readFileSync('./ssl/certificate.crt');


export async function grantAccessToken({ account , role }){
    
    return await jwt.sign({ account , role }, privateKey, { algorithm: 'RS256'});

}

export async function verifyAccessToken(token){
    
    return await jwt.verify(token, publicKey);

}