/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push('/sweepstake');
    }
  }, []);

  const handleReset = async (data) => {
    setError(null);
    await axios
      .post('http://80.211.233.121/prize_junkys/api/auth/passwordreset', {
        email: data.email,
      })
      .then((response) => {
        console.log('response>>>', response);
        console.log('message>>>', response.data.message);
        if (response.data.message === 'We have emailed your password.') {
          console.log('message>>>', response.data.message);
          setEmail('');
          setMessage(response.data.message);
        } else {
          setError(response.data.errors.email);
        }
      });
  };

  const submitButton = (data) => {
    console.log('Form data : ', data);
    handleReset(data);
  };
  return (
    <div>
      <span>
        <Link to="/" className="left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </Link>
      </span>
      <h2 className="wolor">PRIZE JUNKYS</h2>
      <br />
      <h2 className="wolor">Forget Password?</h2>
      <br />
      <form onSubmit={handleSubmit(submitButton)}>
        <div className="form-outline fieldwidth">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Email"
            {...register('email', {
              required: 'The email field is required.',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Email format is invalid',
              },
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email ? (
            <h3 className="white">{errors.email.message}</h3>
          ) : (
            error && <h3 className="white">{error}</h3>
          )}
        </div>
        <br />
        <div>
          <input type="submit" className="btn-col" value="RESET PASSWORD" />
        </div>
      </form>
      <br />
      <br />
      <br />
      <div>
        {message && (
          <div>
            <h1 className="wolor">{message}</h1>
            <Link to="/">
              <button className="btn-col">BACK TO LOGIN</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
