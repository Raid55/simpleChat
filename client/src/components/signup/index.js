import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Signup extends Component {
	render () {
		const { err, onChange, createUser, userValue } = this.props;
		const errMsg = "There was an error while logging you in or fetching your user info";
		const maxCharsUser = 18; // max chars for user creation

		return (
			<div id="signup-container">
				<div className="info">
					Pick a screen name to continue...
				</div>
				<form onSubmit={createUser} onChange={onChange}>
					<input maxLength={maxCharsUser} name="signupUsername" value={userValue}/>
					<button type="submit" name="createUserBtn">Log in</button>
				</form>
				{ err ? <div className="err">{errMsg}</div> : null }
			</div>
		);
	}
}

// TODO PROP TYPE PropTypes.func.isRequired
Signup.propTypes = {
	onChange: PropTypes.func.isRequired,
	userValue: PropTypes.string.isRequired,
	createUser: PropTypes.func.isRequired,
	err: PropTypes.bool.isRequired,
};

export default Signup;
