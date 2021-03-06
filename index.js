require('dotenv').config()
import express from 'express'
import cors from 'cors'
import path from 'path';
import bodyParser  from 'body-parser';
import helmet from 'helmet';
import * as aws from './module/aws';
import * as jwt from './module/jwt';
import * as webinar from './module/webinar';
import * as activity from './module/activity';
import multer from 'multer';
import bearerToken from 'express-bearer-token';
import https from 'https';
import fs from 'fs';
const {parse, stringify} = require('flatted/cjs');
require('express-group-routes');
const session = require('express-session');
const app = express();
const upload = multer();
const http = require('http').Server(app);




app.use(express.static('src'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bearerToken());

if(process.env.DEBUG_MODE == 'true'){
	app.use(cors());
	
}else{
	
	app.use(helmet());
	
}
app.set('trust proxy', 1) // trust first proxy

const { 
    AWS_ACCESS_KEY_ID , 
    AWS_SECRET_ACCESS_KEY ,
    AWS_S3_REGION ,
    AWS_S3_BUCKET
} = process.env ; 

app.group('/api/activity' , (router)=>{
	router.post('/' , async(req , res , next)=>{
		try {
			//transaction
			const { name , scene , meetings } = req.body ; 
			await activity.createActivity({ name , scene , meetings });
			res.send({ msg : "create activity success" })
		}catch(e){
			console.info({ e })
			res.status(500).send({ error : "create activity failed" })
		}
	})

	router.get('/' , async(req , res , next)=>{
		try {
			let list = await activity.getActivityList();
			res.send({ list });
		}catch(e){
			console.info({ e });
			res.status(500).send({ error : "get activity list error" });
		}
	})
	router.post('/:activityId/signin' , upload.array('file' , 1) , async (req , res , next)=>{
		const { activityId } = req.params ;
		//先存到s3 , 在research all register from activity , 有比對到即登入成功
		const fileName = "temp-"+new Date().getTime()+".jpg" ; 
		
		const buffer = req.files[0].buffer ;
		
		let r = await aws.uploadS3(buffer , fileName);
		
		const url = `https://${AWS_S3_BUCKET}.s3-${AWS_S3_REGION}.amazonaws.com/${fileName}`
		 
		try{ 
			const { accessToken , user } = await activity.faceSignin({ sourceName : fileName , activityId })
			res.send( { accessToken , user} ) ;
		}catch(e){
			console.info({e})
			res.status(500).send({ error : "signin failed" });
		}
		


	})

	router.get('/:activityId' , async (req , res , next)=>{
		const { activityId } = req.params ;
		try {
			let result = await activity.getActivityMettingById({ activityId });

			res.send( { activity : result } ) ;
		}catch(e){
			console.info({ e })
			res.status(500).send({ error : "get activity failed" });
		}
	})

	router.post('/:activityId/register' , async (req , res , next)=>{
		//register all meeting from activity
		const { activityId } = req.params ; 
		const { firstName , lastName , email , avatar } = req.body ; 
		let { meetings } = await activity.getActivityMettingById({ activityId });
		
		let jobs = meetings.map(async( { webinarKey } )=>{

			try {
				console.info({ webinarKey , firstName , lastName , email });
				let { joinUrl , hijackEmail } =	await webinar.register({webinarKey , firstName , lastName , email });
				
				//create link
				const data = {
					joinUrl , 
					webinarKey , 
					firstName , 
					lastName , 
					email , 
					hijackEmail ,
					activityId , 
					avatar
				}
				await activity.createRegisterLink(data);
				await activity.sendRegisterConfirmEamil(data);
				return data ; 
			}catch(e){
				console.info({ e });
				return res.status(500).send({ error : "activity register failed" });
			} 

		})
		Promise.all(jobs).then((values)=>{

			return res.send(values);
		})

	})
})


app.group('/webinar' , (router)=>{
	router.get('/token' , async(req , res , next)=>{
		try {
			let accessToken = await webinar.getAccessToken();
			return res.send(accessToken) ; 
		}catch(e){
			console.info({ e });
			return res.status(500).send({ error : "get token error" })
		}
	})
	router.post('/meeting' , async(req , res , next)=>{
		const { subject , description , times } = req.body ;
		try {
			let meeting =	await webinar.create({ subject , description , times });
			return res.send(meeting);
		}catch(e){
			console.info({ e });
			return res.status(500).send({ error : "create meeting failed" })
		}
	})

	router.get('/meeting/:webinarKey' , async(req , res , next)=>{
		const { webinarKey } = req.params ; 
		let webinarInfo = await webinar.getWebinarByKey({ webinarKey });
		


		return res.send(webinarInfo);
	})

	router.post('/meeting/:webinarKey' , async(req , res , next)=>{
		const { webinarKey } = req.params ; 
		const { firstName , lastName , email , activityId , avatar } = req.body ; 
		try {
			let { joinUrl , hijackEmail } =	await webinar.register({webinarKey , firstName , lastName , email });
			//create link
			const data = {
				joinUrl , 
				webinarKey , 
				firstName , 
				lastName , 
				email , 
				hijackEmail ,
				activityId , 
				avatar
			}
			await activity.createRegisterLink(data);
			
			return res.send(data);
		}catch(e){
			console.info({ e });
			return res.status(500).send({ error : "register meeting failed" })
		}
		
	})
	router.post('/meeting/activity/register/link' , async (req , res , next)=>{
		const { webinarKey , activityId , firstName , lastName , email , hijackEmail , joinUrl , avatar } = req.body ; 
		try {
			let rows = await activity.createRegisterLink(req.body);
			return res.send({ status : true , msg : "create link success" });
		}catch(e){
			console.info({ e });
			return res.status(500).send({ error : "error to link register" });
		}
	})
})



app.group('/api' , (router)=>{
	
	router.post('/face/verify' , upload.array('file' , 1) , async(req , res , next)=>{
		//get token if verify success
		const { sourceName , targetName } = req.body ;
		//upload to s3

		const fileName = "gallery-"+new Date().getTime()+".jpg" ; 
		try {
			
			const buffer = req.files[0].buffer ;
			
			let r = await aws.uploadS3(buffer , fileName);
			
			const url = `https://${AWS_S3_BUCKET}.s3-${AWS_S3_REGION}.amazonaws.com/${fileName}`
			
		}catch(error){
			console.info({error});
			res.status(500).send({ "error":"upload failed" });
		}

		console.info({ fileName });

		try {
			const r =  await aws.compareImage({
				sourceName : "golden01.jpg" , 
				targetName : fileName
			})
			let verify = false ;
			r.FaceMatches.map((face)=>{
				if(face.Similarity > 90){ verify = true }
			})

			if(verify == true){ 
				let accessToken = await jwt.grantAccessToken({
					account : "admin" , 
					role : "owner"
				});
				
				return res.status(200).send({ accessToken }) 
			}else{
				return res.status(401).send({ error : "auth fail" })
			}

		}catch(e){
			console.info({ e })
			return res.status(500).send({
				error : "internal error , compare exception"
			})
		}
		
	})	
	router.post('/upload/photo' , upload.array('file' , 1) , async(req , res , next)=>{
		
		try {
			
			const buffer = req.files[0].buffer ;
			const fileName = "gallery-"+new Date().getTime()+".jpg" ; 
			let r = await aws.uploadS3(buffer , fileName);
			
			const url = `https://${AWS_S3_BUCKET}.s3-${AWS_S3_REGION}.amazonaws.com/${fileName}`
			
			res.send({ ...r , endpoint : url , fileName });
			
				
			
		}catch(error){
			console.info({error});
			res.status(500).send({ "error":"upload failed" });
		}
	})
	
	router.use(async (req , res , next)=>{
		//middleware
		if(!req.token){
			res.status(403).send({ "status" : false , "msg" : "authorization failed" });
		}else{
			try {
				let user = await jwt.verifyAccessToken(req.token);
				req.user = user ; 
				next();
			}catch(e){
				res.status(500).send({ "status" : false , "msg" : "invalid token" });
			}
		}
	})
	router.get('/token/auth' , async(req , res , next)=>{
		res.send(req.user);
	})
})

app.group('/' , (router)=>{
	
	router.get('*' , (req , res , next)=>{
		
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
		
	})
	
})

let io ; 

if(process.env.DEBUG_MODE == 'true'){
	const server = http.listen(process.env.SERVER_PORT || 3001, () => {
		console.log('Started dev');
	});
	io = require('socket.io')(server);

}else{
	const options = {
		key: fs.readFileSync('./ssl/private.key'),
		cert: fs.readFileSync('./ssl/certificate.crt'),
		ca:fs.readFileSync('./ssl/ca_bundle.crt')
	};

	const server = https.createServer(options, app).listen(process.env.SERVER_PORT || 3001, () => {
		console.log('Started prod');
	});
	io = require('socket.io')(server);
}


io.on('connection', (socket) => {
    socket.on('getMessage' , (data)=>{
		let response = "晚安 洗澡去";
		if(data == "安安妳好幾歲住哪"){ response = "已婚" }
		if(data == "我在找一本書"){ response = "什麼書" }
		if(data == "妳的臉書"){ response = "https://www.facebook.com/BATWsmartBiz/" }
		

		socket.emit("response" , [
			{ from : "server" , msg : response }
		]);
	})
})