import React , { useEffect , useState }from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../assets/AwsHack/meetingroom.jpg';
import Webinar from '../../components/Webinar'
import { getUserByToken } from '../../actions/actions';
import { notification , Button } from 'antd';
import { ArrowLeftOutlined  } from '@ant-design/icons'
import Logo from '../../assets/AwsHack/skyworklogo.png';
import WebsiteImage from '../../assets/AwsHack/website.png';
import PDFdownloadImage from '../../assets/AwsHack/pdfdownload.png';
import Embed from '../../components/Embed';

const WebsiteGround = styled.div `
    background-image : url(${WebsiteImage});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :100px ;
    height : 100px ;
    
`

const PDFGround = styled.div `
    background-image : url(${PDFdownloadImage});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :100px ;
    height : 100px ;
    
`

const LogoGround = styled.div `
    position : fixed ;
    top : 10%;
    left : 5%;
    background-image : url(${Logo});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :75px ;
    height : 50px ;
`

const Background = styled.div `
    background-image : url(${BackgroundImage});
    background-repeat : no-repeat ;
    background-size : 100% 100% ;
    width :100% ;
    height : 100% ;
    display:flex ; 
    justify-content : center ;
    align-items:center ;
`
const BackWrapper = styled.div `
    position : fixed ;
    top : 20px;
    left : 20px;
    cursor : pointer ; 
    style : 2rem ;
    color : #0d47a1 ;
    font-weight : bold ;
`
const Room = ({ activity , onChangeScene })=>{
    const [ user , setUser ] = useState({});
    const [ init , setInit ] = useState(false);

    
    
    
    const initAction = async() =>{
        try {
            let result = await getUserByToken();
            setUser(result);
            setInit(true);
            
        }catch(e){
            notification.error({
                message : "尚未登入" ,
                description : "請進行登入"
            })
        }
    }

    useEffect(()=>{
        if(init == false){
            initAction();
        }
    },[init])
    
    if(init == false){
        return (
            <></>
        )
    }


    return (
        <Background>
            <LogoGround />
            <a target="_blank" href="https://skywork.tech"> 
                <WebsiteGround onClick={()=>{

                }} />
            </a>
            <Webinar joinUrl={user.joinUrl}/>
            <a target="_blank" href="https://tokyoveryhot.s3-ap-northeast-1.amazonaws.com/Multi-Cloud+Intelligent+Resources+Planning+and+Monitoring+System_%E8%B7%A8%E9%9B%B2%E7%AB%AF%E6%99%BA%E6%85%A7%E8%B3%87%E7%94%A2%E7%AE%A1%E7%90%86%E8%88%87%E7%9B%A3%E6%8E%A7%E7%B3%BB%E7%B5%B1.pdf"> 
                <PDFGround onClick={()=>{
                    
                }}/>
            </a>
            <BackWrapper>
                
                <Button type="primary" icon={<ArrowLeftOutlined></ArrowLeftOutlined>} size={`large`} 
                    onClick={()=>{
                        onChangeScene(0);
                    }}

                />
            </BackWrapper>
            
            
        </Background>
    )

}

export default Room ;