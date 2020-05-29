## Environment
1. `$nvm & npm 10.15.0`
2. `$npm install yarn -g`
3. `$npm install forever -g`
4. `$npm install nodemon -g (debug)`

## Init
1. git clone https://github.com/kuomingwu/BA-agent-rent-reduction.git
2. 在根目錄建立 .env 檔案並設定以下資料 : 

<pre>
    SERVER_PORT = 
    AWS_ACCESS_KEY_ID = 
    AWS_SECRET_ACCESS_KEY = 
    AWS_S3_REGION = 
    AWS_S3_BUCKET = 
    DB_HOST = 
    DB_ACCOUNT = 
    DB_PASSWORD = 
    DB_NAME = 
    REACT_APP_WS_DOMAIN = 
    REACT_APP_API_DOMAIN = 
    FRONTEND_DOMAIN = 
    DEBUG_MODE = <true 為debug 模式 , 將使用cors>
    WEBINAR_KEY = 
    WEBINAR_SECRET = 
    WEBINAR_USERNAME = 
    WEBINAR_PASSWORD = 
    WEBINAR_COMPANY_DOMAIN = 
    SENDGRID_API_KEY = 
    SENDGRID_FROM = 
</pre>

3. 建立ssl folder在根目錄 , 並放置憑證 (jwt & https會使用到)
4. yarn install & yarn run build
5. forver start start.js / nodemon start.js

## Demo
https://aws.hack.skywork.tech/

## API reference
https://documenter.getpostman.com/view/1901900/SztD67dE?version=latest

## Aws Service
EC2 S3 RDS Rekognition

## Other Service
Gotowebinar Sendgrid

## FlowChart
```flow
st=>start: Create activity and publish
register=>operation: User register Activity
facedetect=>operation: Face detect
cond=>condition: face detect success or not
e=>end: To next scene

st->register->facedetect->cond
cond(yes)->e
cond(no)->op1

```
