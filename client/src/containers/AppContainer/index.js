import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class AppContainer extends Component {

  render() {
    return (
      <div id="grid-container">
        <div>
        </div>
        <div id="container-default">
          { this.props.children }
          <footer>
            coded by Raid55, built with React
          </footer>
        </div>
        <div>
        </div>
      </div>
    );
  }

}

// This component cannot be rendered without a child
AppContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default AppContainer;
