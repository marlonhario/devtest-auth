import React, { useState } from 'react';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { toast } from 'react-toastify';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    textChange: '',
  });
  const { email, textChange } = formData;
  const handleChange = text => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email,
        })
        .then(() => {
          setFormData({
            ...formData,
            email: '',
          });
          toast.success('Please check your email');
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <button
        className="btn btn-primary account__btn account__btn--small"
        type="submit"
      >
        Update Password
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

export default RegisterForm;
