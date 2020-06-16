import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuth } from '../../../helpers/auth';

const Activate = (props) => {
  const { match, history } = props;
  const { params: matchParams } = match;
  const { token: matchToken } = matchParams;
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    show: true,
  });

  useEffect(() => {
    const token = matchToken;
    const { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name);
  }, [match.params]);
  const { name, token } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/activation`, {
        token,
      })
      .then((res) => {
        setFormData({
          ...formData,
          show: false,
        });

        history.push('/log_in');
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
      });
  };

  return (
    <div className="account">
      <div className="account__wrapper">
        {isAuth() ? <Redirect to="/" /> : null}
        <ToastContainer />
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
            <h3 className="account__title">
              Welcome {name}
            </h3>
          </div>
          <form
            className="w-full flex-1 mt-8 text-indigo-500"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto max-w-xs relative ">
              <button
                className="btn btn-primary account__btn account__btn--small"
                type="submit"
              >
                Activate your Account
              </button>
            </div>
            <div className="my-12 border-b text-center">
              <a
                href="/"
                target="_self"
              >
                <span className="flex flex-col items-center">Go to login</span>
              </a>
            </div>
            <div className="my-12 border-b text-center">
              <div>
                Or sign up again
              </div>
            </div>
            <div className="my-12 border-b text-center">
              <a
                href="/register"
                target="_self"
              >
                <span className="flex flex-col items-center">Sign Up</span>
              </a>
            </div>
          </form>
        </div>
      </div>
      ;
    </div>
  );
};

Activate.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Activate.defaultProps = {
  match: {
    pathname: '',
  },
};

export default withRouter(Activate);
