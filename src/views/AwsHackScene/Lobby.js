import React from 'react';
import BackgroundImage from '../../assets/AwsHack/informationcounter.jpg';
import styled from 'styled-components';
import Embed from '../../components/Embed';
import Lady from '../../assets/AwsHack/chatbotaa.jpg';
import FaceReg from '../../components/FaceReg';
import { useParams } from 'react-router';


const Background = styled.div `
    background-image : url(${BackgroundImage});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :100% ;
    height : 100% ;
`




const Lobby = ({ activity , onChangeScene }) =>{

    const Pins = [
        {
            width : `calc(100vw / 10)`,
            height : `calc(100vh / 4)`,
            top : `48%`,
            left : `45%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : Lady,
            type : "chatbot"
        },
        {
            width : `calc(100vw / 6)`,
            height : `calc(100vh / 3)`,
            top : `34%`,
            left : `78%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : <FaceReg activity={activity} onSigninSuccess={()=>{
                onChangeScene(1); // ba lobby  trans to street
            }} />,
            type : "component"
        },
        {
            width : `calc(100vw / 6)`,
            height : `calc(100vh / 3)`,
            top : `50%`,
            left : `25%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : `/activity/${activity.id}/register`,
            type : "link"
        },
        {
            width : `calc(100vw / 6)`,
            height : `calc(100vh / 3)`,
            top : `30%`,
            left : `1%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : `PF0xZpisKAA`,
            type : "youtube"
        }
    
    ]
    return (
        <Background>
            {
                Pins.map((pin)=><Embed {...pin}/>)
            }

        </Background>
    )

}


export default Lobby ; 