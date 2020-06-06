import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../assets/AwsHack/rooms.jpg';
import Embed from '../../components/Embed';
const Background = styled.div `
    background-image : url(${BackgroundImage});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :100% ;
    height : 100% ;
`

const Street = ({ activity , onChangeScene })=>{

    const Pins = [
        {
            width : `calc(100vw / 10)`,
            height : `calc(100vh / 4)`,
            top : `32%`,
            left : `35%`,
            path : `20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%`,
            onClick : ()=>{
                onChangeScene(2);
            },
            source : "",
            type : "onClick"
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

export default Street ; 