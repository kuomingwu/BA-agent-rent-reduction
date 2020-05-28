import React from 'react';
import styled from 'styled-components';


export const IframeWrapper = styled.div `
    width : 60vw;
    @media only screen and (min-width: 768px) {
        height : 60% ;
    }
    @media only screen and (max-width: 768px) {
        height : 700px ; 
    }

`

const Webinar = ({ joinUrl }) =>{
    
    return (
        <IframeWrapper>
            <iframe width={`100%`} height={`100%`} src={`${joinUrl}?clientType=html5`}/>
            
        </IframeWrapper>
    )
}

export default Webinar ;