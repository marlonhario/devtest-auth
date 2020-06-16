import React from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import { isAuth } from '../../helpers/auth';

const Register = () => (
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
        <div className="account__or">
          <p>Create new account</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  </div>
);

export default Register;
