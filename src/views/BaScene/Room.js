import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../assets/BA/meetingroom.jpg';


const Background = styled.div `
    background-image : url(${BackgroundImage});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :100% ;
    height : 100% ;
`

const Room = ({ activity , onChangeScene })=>{

    return (
        <Background>
        </Background>
    )

}

export default Room ;