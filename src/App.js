import React , { Suspense } from 'react'
import { BrowserRouter as Router , Route , Swich } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as Ba from './views/BaScene/Route';
import styled from 'styled-components';
import * as Aws from './views/AwsScene/Route';
import * as AwsHack from './views/AwsHackScene/Route';
import Form from './views/Form';

import Activity from './views/Activity';
import Portal from './views/Portal';

const Wrapper = styled.div `
  width : 100vw ;
  height : 100vh ;
`


const App = () => {
  return (
    
    <Router>
      <Route exact path={`/`}>
        <Portal />
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
