import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/home';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {/* <Route exact path="/:rId" component={}></Route> */}
      </Switch>
    );
  }
}


export default App
