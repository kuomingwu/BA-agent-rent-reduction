import React , { useState , useEffect } from 'react';
import styled from 'styled-components';
import { getActivityByActivityId } from '../actions/actions';
import { useParams } from 'react-router';
import { Route , Switch } from 'react-router-dom';
import * as Ba from './BaScene/Route';
import * as Aws from './AwsScene/Route';

const Wrapper = styled.div `
  width : 100vw ;
  height : 100vh ;
`

const Activity = () =>{
    const { activityId } = useParams();
    const [ init , setInit ] = useState(false);
    const [ activity , setActivity ] = useState({});
    console.info({ activityId });    
    async function initAction(){
        const result = await getActivityByActivityId({ activityId });
        setInit(true);
        setActivity(result.activity);
    }

    useEffect(()=>{
        if(init == false){
            initAction();
        }
    }, [init])

    return (
        <Wrapper>
            {
                (activity.scene == "ba") && (
                    <Ba.Lobby activity={activity}></Ba.Lobby>
                )
            }
            {
                (activity.scene == "aws") && (
                    <Aws.Lobby activity={activity}></Aws.Lobby>
                )
            }
        </Wrapper>
    )

}

export default Activity ; 