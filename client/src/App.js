import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import Home         from './containers/Home';
import Room         from './containers/Room';

class App extends Component {
	render() {
		return (
			<AppContainer>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/:rId" component={Room} />
				</Switch>
			</AppContainer>
		);
	}
}


export default App
