import React , { Suspense } from 'react'
import { BrowserRouter as Router , Route , Swich } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as Ba from './views/BaScene/Route';
import styled from 'styled-components';
import * as Aws from './views/AwsScene/Route';
import Form from './views/Form';

import Activity from './views/Activity';

const Wrapper = styled.div `
  width : 100vw ;
  height : 100vh ;
`


const App = () => {
  return (
    
    <Router>
      <Route exact path={`/ba/lobby`}>
        <Wrapper>
          <Ba.Lobby></Ba.Lobby>
        </Wrapper>
      </Route>

      <Route exact path={`/aws/lobby`}>
        <Wrapper>
          <Aws.Lobby></Aws.Lobby>
        </Wrapper>
      </Route>

      <Route exact path={`/ba/register`}>
        <Wrapper>
          <Form></Form>
        </Wrapper>
      </Route>

      <Route exact path={`/activity/:activityId`}>
        <Activity />
      </Route>

      <Route exact path={`/activity/:activityId/register`}>
        <Wrapper>
          <Form></Form>
        </Wrapper>
      </Route>

    </Router>
  )
}



export default App;
