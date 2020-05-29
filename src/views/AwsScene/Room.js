import React , { useEffect , useState }from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../assets/AWS/awsbackground.jpg';
import Webinar from '../../components/Webinar'
import { getUserByToken } from '../../actions/actions';
import { notification , Button } from 'antd';
import { ArrowLeftOutlined  } from '@ant-design/icons'

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
            <BackWrapper>
                <Button type="primary" icon={<ArrowLeftOutlined></ArrowLeftOutlined>} size={`large`} 
                    onClick={()=>{
                        onChangeScene(0);
                    }}

                />
            </BackWrapper>
            <Webinar joinUrl={user.joinUrl}/>
        </Background>
    )

}

export default Room ;