import React , { useEffect , useState }from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../assets/AWS/awsbackground.jpg';
import Webinar from '../../components/Webinar'
import { getUserByToken } from '../../actions/actions';
import { notification } from 'antd';
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
            <Webinar joinUrl={user.joinUrl}/>
        </Background>
    )

}

export default Room ;