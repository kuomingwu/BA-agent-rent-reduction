require('dotenv').config()
import S3 from 'aws-s3';
import fs from 'fs';
import AWS from 'aws-sdk';

const { 
    AWS_ACCESS_KEY_ID , 
    AWS_SECRET_ACCESS_KEY ,
    AWS_S3_REGION ,
    AWS_S3_BUCKET
} = process.env ; 

AWS.config.update({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region:AWS_S3_REGION
});

export async function uploadS3(fileContent , fileName){
	
	let params = {
		Bucket: AWS_S3_BUCKET,
		Key: fileName,
		Body: fileContent
	};
	
	try {
		let d = await new AWS.S3().putObject(params).promise();
		console.info({ d });
		return d ;
	}catch(e){
		
		console.info({e});
		return false ;
	}
}


export async function compareImage({ sourceName , targetName }){
    const rekognition = new AWS.Rekognition();
    return new Promise((resolve , reject)=>{
        var params = {
            SimilarityThreshold: 90, 
            SourceImage: {
                S3Object: {
                    Bucket: AWS_S3_BUCKET, 
                    Name: sourceName
                }
            }, 
            TargetImage: {
                S3Object: {
                    Bucket: AWS_S3_BUCKET, 
                    Name: targetName
                }
            }
        };
        rekognition.compareFaces(params , function (err, data) {
            if (err) reject(err, err.stack); // an error occurred
            else     resolve(data);           // successful response
        });
    })
    
}