import React , { Suspense } from 'react'
import { BrowserRouter as Router , Route , Swich } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as Ba from './views/BaRoute';
import styled from 'styled-components';

const Wrapper = styled.div `
  width : 100vw ;
  height : 100vh ;
`


const App = () => {
  return (
    
    <Router>
      <Route exact path={`/ba/lobby`}>
        <Wrapper>
          <Ba.BaLobby></Ba.BaLobby>
        </Wrapper>
      </Route>
    
    </Router>
  )
}



export default App;
