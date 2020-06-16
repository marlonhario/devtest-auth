import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { authenticate, isAuth } from '../../helpers/auth';
import LogInForm from './components/LogInForm';

function LogIn(props) {
  const { history } = props;
  const googleClientId = '1021933614011-7777qoabc5qmqs193io1k106459fnb2a.apps.googleusercontent.com';
  const facebookAppId = '539673530035980';

  const informParent = (response) => {
    authenticate(response, () => {
      if (isAuth() && isAuth().role === 'admin') {
        history.push('/admin');
      } else {
        history.push('/dashboard_default');
      }
    });
  };

  const sendGoogleToken = (tokenId) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId,
      })
      .then((res) => {
        informParent(res);
      })
      .catch((error) => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken,
      })
      .then((res) => {
        informParent(res);
      })
      .catch((error) => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };

  const responseGoogle = (response) => {
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = (response) => {
    sendFacebookToken(response.userID, response.accessToken);
  };

  return (
    <div className="account">
      {isAuth() ? <Redirect to="/dashboard_default" /> : null}
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">Welcome to
              <span className="account__logo"> Easy
                <span className="account__logo-accent">DEV</span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">Start your business easily</h4>
          </div>
          <LogInForm />
          <div className="account__or">
            <p>Or Easily Using</p>
          </div>
          <div className="account__social">
            <FacebookLogin
              appId={facebookAppId}
              autoLoad={false}
              callback={responseFacebook}
              render={renderProps => (
                <button
                  type="button"
                  className="account__social-btn account__social-btn--facebook"
                  onClick={renderProps.onClick}
                >
                  <FacebookIcon />
                </button>
              )}
            />
            <GoogleLogin
              clientId={googleClientId}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
              render={renderProps => (
                <button
                  type="button"
                  className="account__social-btn account__social-btn--google"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <GooglePlusIcon />
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

LogIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LogIn);
