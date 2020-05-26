import React , { Suspense } from 'react'
import { Button } from 'antd';
import styled from 'styled-components';
import Webcam from "react-webcam";

const Signin = () =>{

  const webcamRef = React.useRef(null);
  const videoConstraints = {
      width: 300,
      height: 300,
      facingMode: "user"
    };
  const capture = React.useCallback(
    async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.info( { imageSrc });
    },
    [webcamRef]
  );
      return (
        <>
          <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={720}
              videoConstraints={videoConstraints}
          />
          <Button className="capture" onClick={capture}>Capture photo</Button>
  
        </>
  
      )
  }


  export default Signin ; 