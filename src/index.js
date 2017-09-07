/*
    Module: @mitchallen/react-cognito-signup
    Author: Mitch Allen
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import CardGrey from '@mitchallen/react-card-grey';
import { orange500, cyanA100, grey400 } from 'material-ui/styles/colors';
import EmailInputField from '@mitchallen/react-email-input-field';
import PasswordInputField from '@mitchallen/react-password-input-field';
import NumberInputField from '@mitchallen/react-number-input-field';
import LoaderButton from '@mitchallen/react-loader-button';
// import {
//   AuthenticationDetails,
//   CognitoUserPool,
//   CognitoUserAttribute,
// } from 'amazon-cognito-identity-js';
// import config from '../config.js';
// import './CognitoSignup.css';

const textFieldStyle = {
  whiteStyle: {
    color: '#FFFFFF',
  },
  hintStyle: {
    color: grey400,
  },
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: grey400,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: cyanA100,
  },
};

class CognitoSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null
    };
  }

  validateForm() {
    try {
    return this.state.username.length > 0
      && this.state.password.length > 0
      && this.state.password === this.state.confirmPassword;
    } catch(e) {
      alert(e);
    }
  }

  validateConfirmationForm() {
    try {
      return this.state.confirmationCode.length > 0;
    } catch(e) {
      alert(e);
    }
  }

  handleChange = (event) => {
    try {
      this.setState({
        [event.target.id]: event.target.value
      });
    } catch(e) {
      alert(e);
    }
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
    
      this.setState({ isLoading: true });
    
      try {
        const newUser = await this.signup(this.state.username, this.state.password);
        this.setState({
          newUser: newUser
        });
      }
      catch(e) {
        alert(e);
      }
    
      this.setState({ isLoading: false });

    } catch(e) {
      alert(e);
    }
  }

  handleConfirmationSubmit = async (event) => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode);
      const userToken = await this.authenticate(
        this.state.newUser,
        this.state.username,
        this.state.password
      );
  
      this.props.updateUserToken(userToken);
      this.props.history.push('/');
    }
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  signup(username, password) {
    try {

      const userPool = new this.props.amazonCognitoIdentity.CognitoUserPool({
        UserPoolId: this.props.cognitoUserPoolId,
        ClientId: this.props.cognitoAppClientId
      });

      const attributeEmail = new this.props.amazonCognitoIdentity.CognitoUserAttribute({ Name : 'email', Value : username });
    
      return new Promise((resolve, reject) => (
        userPool.signUp(username, password, [attributeEmail], null, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
    
          resolve(result.user);
        })
      ));

    } catch(e) {
      alert(e);
    }
  }
  
  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) => (
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    ));
  }
  
  authenticate(user, username, password) {
    try {
      const authenticationData = {
        Username: username,
        Password: password
      };

      const authenticationDetails = new this.props.amazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
      return new Promise((resolve, reject) => (
        user.authenticateUser(authenticationDetails, {
          onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
          onFailure: (err) => reject(err),
        })
      ));
    } catch(e) {
      alert(e);
    }
  }

  renderConfirmationForm() {
    return (
      <CardGrey>
        <div className='SignupConfirmation'>
          <form onSubmit={this.handleConfirmationSubmit}>
            <NumberInputField
              floatingLabelText='enter confirm code (check email)'
              id='confirmationCode'
              fieldStyle={textFieldStyle}
              defaultValue={this.state.confirmationCode}
              onChange={this.handleChange}
            />
            <LoaderButton
              disabled={ !this.validateConfirmationForm() }
              type='submit'
              isLoading={this.state.isLoading}
              text='Verify'
              loadingText='Verifying…' />
          </form>
        </div>
      </CardGrey>
    );
  }

  renderForm() {
    return (
      <CardGrey>
        <div className='Signup'>
          <form onSubmit={this.handleSubmit}>
            <EmailInputField
              id='username'
              fieldStyle={textFieldStyle}
              defaultValue={this.state.username}
              onChange={this.handleChange}
            />
            <PasswordInputField
              id='password'
              fieldStyle={textFieldStyle}
              defaultValue={this.state.password}
              onChange={this.handleChange}
            />
            <PasswordInputField
              floatingLabelText='confirm password'
              id='confirmPassword'
              fieldStyle={textFieldStyle}
              defaultValue={this.state.password}
              onChange={this.handleChange}
            />
            <LoaderButton
              primary
              disabled={ !this.validateForm() }
              type='submit'
              isLoading={this.state.isLoading}
              text='Signup'
              loadingText='Signing up…' />
          </form>
        </div>
      </CardGrey>
    );
  }

  render() {
    return (
      <div className='Signup'>
        { this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm() }
      </div>
    );
  }
}

CognitoSignup.propTypes = {
  amazonCognitoIdentity: PropTypes.object.isRequired,
  updateUserToken: PropTypes.func.isRequired,
  cognitoUserPoolId: PropTypes.string.isRequired, 
  cognitoAppClientId: PropTypes.string.isRequired  
};

// export default withRouter(CognitoSignup);

export default CognitoSignup;
