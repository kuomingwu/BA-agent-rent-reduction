import React , { useRef , useCallback , useState } from 'react';
import Webcam from "react-webcam";
import FaceRegBackgroundImg from '../assets/BA/facerecognition_background.png';
import styled from 'styled-components';
import { Button } from 'antd';
import { identifyUser } from '../actions/actions';
const FaceRegWrapper = styled.div `
    background-image : url(${FaceRegBackgroundImg}) ;
    background-repeat : no-repeat ; 
    background-size : 100% 100% ;
    width : 60vw ; 
    height : 60vh ;
    display : flex ; 
    justify-content : center ; 
    align-items:end ;
`;

const FaceReg = () =>{
    const [ code , setCode ] = useState("");
    
    const webcamRef = React.useRef(null);
    const videoConstraints = {
        width: 300,
        height: 300,
        facingMode: "user"
      };

     
    const capture = React.useCallback(
        async () => {
            const imageSrc = webcamRef.current.getScreenshot();
            try {
                await identifyUser(imageSrc);
                
            }catch(e){

            }
        },
        [webcamRef]
    );
    
    return (
       
        <FaceRegWrapper>    
            <Webcam
                audio={false}
                height={`50%`}
                width={`50%`}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <Button onClick={capture}>Signin</Button>
        </FaceRegWrapper>
    )


}

export default FaceReg ; 