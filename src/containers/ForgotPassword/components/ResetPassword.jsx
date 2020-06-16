import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';

const ResetPassword = ({ match, history }) => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: '',
    textChange: '',
  });
  const {
    password1,
    password2,
    textChange,
    token,
  } = formData;

  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const { params: matchParams } = match;
    const { token: matchToken } = matchParams;
    if (matchToken) {
      setFormData({ ...formData, token: matchToken });
    }
  }, []);

  const handleChange = text => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios.put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
        newPassword: password1,
        resetPasswordLink: token,
      })
        .then((res) => {
          setFormData({
            ...formData,
            password1: '',
            password2: '',
          });

          toast.success(res.data.message);
          history.push('/log_in');
        })
        .catch(() => {
          toast.error('Something is wrong try again');
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };

  return (
    <div className="account">
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
          <div className="account__or">
            <p>Reset Password</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__form-group">
              <span className="form__form-group-label">Password</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <KeyVariantIcon />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <button
                  className={`form__form-group-button${showPassword ? ' active' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                ><EyeIcon />
                </button>
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Confirm Password</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <KeyVariantIcon />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  onChange={handleChange('password2')}
                  value={password2}
                />
              </div>
            </div>
            <button
              className="btn btn-primary account__btn account__btn--small"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div className="form__form-group">
            <div className="account__forgot-password">
              <a href="/">Back to login page?</a>
            </div>
          </div>
          <span className="ml-3">{textChange}</span>
        </div>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

ResetPassword.defaultProps = {
  match: {
    pathname: '',
  },
};

export default withRouter(ResetPassword);
