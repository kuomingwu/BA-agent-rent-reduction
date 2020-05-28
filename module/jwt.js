import jwt from 'jsonwebtoken';
import fs from 'fs' ;
export const privateKey = fs.readFileSync('./ssl/private.key');
export const publicKey = fs.readFileSync('./ssl/certificate.crt');


export async function grantAccessToken(user){
    
    return await jwt.sign(JSON.parse(JSON.stringify(user)), privateKey, { algorithm: 'RS256'});

}

export async function verifyAccessToken(token){
    
    return await jwt.verify(token, publicKey);

}