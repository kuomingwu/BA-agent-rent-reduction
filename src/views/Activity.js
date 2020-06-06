import React , { useState , useEffect } from 'react';
import styled from 'styled-components';
import { getActivityByActivityId } from '../actions/actions';
import { useParams } from 'react-router';
import { Route , Switch } from 'react-router-dom';
import * as Ba from './BaScene/Route';
import * as Aws from './AwsScene/Route';
import * as AwsHack from './AwsHackScene/Route';
import {  Spin , Button , notification } from 'antd';
const Wrapper = styled.div `
  width : 100vw ;
  height : 100vh ;
`

const Activity = () =>{
    const { activityId } = useParams();
    const [ init , setInit ] = useState(false);
    const [ activity , setActivity ] = useState({});
    const [ spinning , setSpinning ] = useState(true);
    console.info({ activityId });    
    async function initAction(){
        const result = await getActivityByActivityId({ activityId });
        setInit(true);
        setActivity(result.activity);
        setSpinning(false);
    }

    useEffect(()=>{
        if(init == false){
            initAction();
        }
    }, [init])

    return (
        <Spin spinning={spinning}>
        <Wrapper>
            {
                (activity.scene == "ba") && (
                    <Ba.Scene activity={activity}></Ba.Scene>
                )
            }
            {
                (activity.scene == "aws") && (
                    <Aws.Scene activity={activity}></Aws.Scene>
                )
            }
            {
                (activity.scene == "awshack") && (
                    <AwsHack.Scene activity={activity}></AwsHack.Scene>
                )
            }
        </Wrapper>
        </Spin>
    )

}

export default Activity ; 