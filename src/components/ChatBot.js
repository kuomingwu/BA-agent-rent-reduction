import React, { useState, useEffect , useReducer } from 'react'
import ReactDom from 'react-dom'
import webSocket from 'socket.io-client'
import { Input , Button } from 'antd';
import styled from 'styled-components';
import { CloseOutlined  } from '@ant-design/icons';
require('dotenv').config()

const { REACT_APP_WS_DOMAIN } = process.env;

const Wrapper = styled.div `
    display : flex ; 
    justify-content : center ;
    width : 100vw ;
    height : 100vh ;
    align-items : center ;
    flex-direction : column ;
`

const MessageBox = styled.div `
    
    text-align : ${props=>props.from == "client" ? "right" : "left" } ;
    margin-bottom : 5px;
`

const MessageBoxWrapper = styled.div `
    background-color : white ; 
    padding : 20px;
    flex : 9 ;
    overflow : auto ;
`
const MessageContainer = styled.div `
    width: 60vw;
`

const UpWrapper = styled.div `
    display : flex ; 
    flex-direction : row ; 

`
const AvatarWrapper = styled.div `
    flex : 1 ;
    height : 60vh ;
    background-image : url(${props=>props.avatar}) ;
    background-repeat : no-repeat ; 
    background-size : 100% 100% ;
`
const RightWrapper = styled.div `
    flex : 2 ;
    height : 60vh ;
    background-color : white ; 
    display : flex ; 
    flex-direction : column ; 
    
`

const MessageText = styled.div `
    padding : 10px; 
    display: inline-block;
    background-color : ${props=>props.from == "client" ? "#cfd8dc" : "#eceff1" }
`

const ChatBot = ({ avatar }) =>{
    const [ ws , setWs ] = useState(null)
    const [ say , setSay ] = useState("");
    const [ init , setInit ] = useState(false);
    const [ initResponse , setInitResponse ] = useState(false);
    const [ messages , setMessages ] = useReducer((messages , messageEntity)=>{
        return [...messages , messageEntity];
    }, []);
    const connectWebSocket = () => {
        //開啟
        setWs(webSocket(REACT_APP_WS_DOMAIN))
        setInit(true);
    }

    useEffect(()=>{
        
        if(ws){
            
            if(init == true && initResponse == false){
                console.info("init socket!!");
                initWebSocket()
                setInitResponse(true);
                addMsgToStack( new MessageEntity({
                    from : "server" , 
                    msg : "您好，有什麼我可以為您服務的呢"
                }) );
            }
        }else{
            if(init == false){
                connectWebSocket();
            }
        }
        console.info({ messages });
    },[ws , messages])

    const initWebSocket = () => {
        ws.on('response', message => {
            message.map((msg)=>{
               
                addMsgToStack( new MessageEntity(msg) );
            })
        })
    }

    const addMsgToStack = (msgEntity) =>{
       
        setMessages(msgEntity);

    }

    const sendMessage = () => {
        ws.emit('getMessage', say);
    }

    return (
        <>
            <MessageContainer>
                
                <UpWrapper>
                    <AvatarWrapper avatar={ avatar } />
                    <RightWrapper>
                        <MessageBoxWrapper>
                            
                            {
                                messages.map((data)=><MessageBox {...data}><MessageText {...data}>{ data.msg }</MessageText></MessageBox>)
                            }
                        </MessageBoxWrapper>
                        <Input style={{ backgroundColor : '#e0e0e0' , flex : 1 }} value={say} onChange={(e)=>{
                            setSay(e.target.value);
                        }} onKeyPress={(e)=>{
                            if (e.key === 'Enter') {
                                
                                addMsgToStack(new MessageEntity({ from : 'client' , msg : say }));
                                sendMessage();
                                setSay("");
                            }
                        }} />
                    </RightWrapper>
                </UpWrapper>
                
            </MessageContainer>
        </>
    )

}

class MessageEntity {
    constructor( { from , msg } ){
      
        this.from = from ;
        this.msg = msg ; 
    }

}

export default ChatBot ; 