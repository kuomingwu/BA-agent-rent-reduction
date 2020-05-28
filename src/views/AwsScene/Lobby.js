import React from 'react';
import BackgroundImage from '../../assets/AWS/awsmainpage.png';
import styled from 'styled-components';
import Embed from '../../components/Embed';
import Staff from '../../assets/AWS/staff.png';
import FaceReg from '../../components/FaceReg';



const Background = styled.div `
    background-image : url(${BackgroundImage});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :100% ;
    height : 100% ;
`



const AwsLobby = ({ activity , onChangeScene }) =>{
    const Pins = [
    
        {
            width : `calc(100vw / 6)`,
            height : `calc(100vh / 3)`,
            top : `34%`,
            left : `10%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : "https://www.ubereats.com/tw",
            type : "link"
        },
        {
            width : `calc(100vw / 6)`,
            height : `calc(100vh / 3)`,
            top : `75%`,
            left : `10%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : "IdVVH_WMAgc",
            type : "youtube"
        },
        {
            width : `calc(100vw / 6)`,
            height : `calc(100vh / 3)`,
            top : `60%`,
            left : `30%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : `/activity/${activity.id}/register`,
            type : "link"
        },
        {
            width : `calc(100vw / 6)`,
            height : `calc(100vh / 3)`,
            top : `40%`,
            left : `53%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : Staff,
            type : "chatbot"
        },
        {
            width : `calc(100vw / 6)`,
            height : `calc(100vh / 3)`,
            top : `13%`,
            left : `82%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                
            },
            source : <FaceReg activity={activity} onSigninSuccess={()=>{
                onChangeScene(1); // aws lobby  trans to room
            }} />,
            type : "component"
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


export default AwsLobby ; 

