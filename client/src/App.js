import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import Home from './containers/Home';

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Home/>
      </AppContainer>
    );
  }
}


export default App
