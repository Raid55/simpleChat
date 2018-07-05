import React, { Component } from 'react';

import './styles.css';

import Signup from '../../components/signup';


class Home extends Component {

  // constructor(props) {
  //   super(props);
  //   // this.state = {
      
  //   // }
  // }

  render() {
    return (
      <div className="container-default" id="container-home">
        <div id="welcome">
          welcome to chat app!
        </div>
        <hr />
        <Signup />
      </div>
    );
  }
}


export default Home;
