import React from 'react';
import BackgroundImage from '../assets/BA/informationcounter.jpg';
import styled from 'styled-components';
import Embed from '../components/Embed';
import Lady from '../assets/BA/chatbotaa.jpg';
import FaceReg from '../components/FaceReg';

const Background = styled.div `
    background-image : url(${BackgroundImage});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :100% ;
    height : 100% ;
`

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
        source : <FaceReg />,
        type : "component"
    }

]


const BaLobby = () =>{
    
    return (
        <Background>
            {
                Pins.map((pin)=><Embed {...pin}/>)
            }

        </Background>
    )

}


export default BaLobby ; 