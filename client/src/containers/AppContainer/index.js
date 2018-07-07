import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { Emojione } from 'react-emoji-render';

class AppContainer extends Component {
	render () {
		return (
			<div id="grid-container">
				<div />
				<div id="container-default">
					{ this.props.children }
					<footer>
						<Emojione text=":computer: by Raid55, built with React" />
					</footer>
				</div>
				<div />
			</div>
		);
	}
}

// This component cannot be rendered without a child
AppContainer.propTypes = {
	children: PropTypes.element.isRequired,
};

export default AppContainer;
