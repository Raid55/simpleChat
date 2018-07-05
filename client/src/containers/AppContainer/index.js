import React, { Component } from 'react';

import './styles.css';

class AppContainer extends Component {

  render() {
    return (
      <div id="grid-container">
        <div>
        </div>
        {this.props.children}
        <div>
        </div>
      </div>
    );
  }

}


export default AppContainer;
