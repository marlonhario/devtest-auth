import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { toast } from 'react-toastify';
import axios from 'axios';

function RegisterForm(props) {
  const { history } = props;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const {
    name,
    email,
    password1,
    password2,
    textChange,
  } = formData;

  const handleChange = text => (e) => {
    e.preventDefault();
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Submitted',
            });

            history.push('/log_in');
            toast.success(res.data.message);
          })
          .catch((err) => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Sign Up',
            });

            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__form-group">
        <span className="form__form-group-label">Username</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange('name')}
            value={name}
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Email</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange('email')}
            value={email}
          />
        </div>
      </div>
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
      <div className="form__form-group">
        <div className="account__forgot-password">
          <a href="/">Back to login page?</a>
        </div>
      </div>
      <span className="ml-3">{textChange}</span>
    </form>
  );
}

RegisterForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(RegisterForm);
