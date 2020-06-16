import React, { useState, useEffect } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from '../../../helpers/auth';
import CheckBox from '../../../shared/components/form/CheckBox';

function LogInForm(props) {
  const { history } = props;
  const [isCheckedRemember, setRemember] = useState(false);
  localStorage.setItem('isRemember', isCheckedRemember);
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In',
  });
  const { email, password1 } = formData;

  useEffect(() => {
    const checkRemeber = localStorage.getItem('isRemember');
    const checkEmail = localStorage.getItem('isRememberEmail');
    const checkPassword = localStorage.getItem('isRememberPassword');

    if (checkRemeber === true || checkEmail) {
      setRemember(Boolean(checkRemeber));
      setFormData({ ...formData, email: checkEmail, password1: checkPassword });
    } else {
      setRemember(false);
    }
  }, []);

  const handleChange = text => (e) => {
    e.preventDefault();
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1,
        })
        .then((res) => {
          authenticate((res), () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Submitted',
            });

            if (isCheckedRemember) {
              localStorage.setItem('isRemember', isCheckedRemember);
              localStorage.setItem('isRememberPassword', password1);
              localStorage.setItem('isRememberEmail', email);
            } else {
              localStorage.setItem('isRemember', isCheckedRemember);
              localStorage.setItem('isRememberPassword', '');
              localStorage.setItem('isRememberEmail', '');
            }

            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
            return isAuth() && isAuth().role === 'admin'
              ? history.push('/dashboard_default') : false;
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In',
          });
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <ToastContainer />
      {isAuth() ? <Redirect to="/dashboard_default" /> : null}
      <div className="form__form-group">
        <span className="form__form-group-label">Email</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <input
            name="email"
            type="text"
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
        <div className="account__forgot-password">
          <a href="/">Forgot a password?</a>
        </div>
        <Link
          to="/users/password/forget"
          className="account__forgot-password"
        >
          Forgot a password?
        </Link>
      </div>
      <div className="form__form-group">
        <div className="form__form-group-field">
          <CheckBox
            name="remember_me"
            label="Remember me"
            value={isCheckedRemember}
            onChange={() => setRemember(!isCheckedRemember)}
          />
        </div>
      </div>
      <button
        className="btn btn-primary account__btn account__btn--small"
        type="submit"
      >
        Sign In
      </button>
      <a href="/register" className="btn btn-outline-primary account__btn account__btn--small">Create Account</a>
    </form>
  );
}

LogInForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LogInForm);
