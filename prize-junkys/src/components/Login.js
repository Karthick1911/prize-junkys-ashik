/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
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

  const handleLogin = async () => {
    setError(null);
    console.log(email, password);
    await axios
      .post('http://80.211.233.121/prize_junkys/api/auth/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log('response>>>', response);
        console.log('message>>>', response.data.message);
        if (response.data.message === 'User logged in successfully') {
          localStorage.setItem('user-info', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.data.access_token);
          history.push('/sweepstake');
        } else {
          setError(response.data.message);
        }
      });
  };

  const siginButton = (data) => {
    console.log(data);
    handleLogin(data);
  };
  const handleResister = () => {
    history.push('/register');
  };
  return (
    <div>
      <h1 className="wolor">Login</h1>
      <h3 className="wolor">Welcome to</h3>
      <h3 className="wolor">Prize Junkys</h3>
      <form onSubmit={handleSubmit(siginButton)}>
        <div className="col-sm-6 offset-sm-3 d-flex justify-content-between border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
          </svg>
          <input
            type="text"
            placeholder="Email"
            className="form-control transparent-input white"
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
        </div>
        {errors.email && <h3 className="white">{errors.email.message}</h3>}
        <br />
        <div className="col-sm-6 offset-sm-3 d-flex justify-content-between border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-key"
            viewBox="0 0 16 16"
          >
            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="form-control transparent-input white"
            {...register('password', {
              required: 'The Password field is required.',
              minLength: {
                value: 6,
                message: 'The new password must be at least 6 characters.',
              },
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && (
          <h3 className="white">{errors.password.message}</h3>
        )}
        {error && (
          <div className="error-msg-color wolor">
            <h3>{error + '*'}</h3>
          </div>
        )}
        <br />
        <div>
          <input type="submit" className="btn-col" value="SIGN IN" />
        </div>
      </form>
      <br />

      <button className="btn-col" onClick={handleResister}>
        REGISTER
      </button>
      <br />
      <br />
      <Link className="wolor" to="/forgotpassword">
        <div>Forgot Password?</div>
      </Link>
    </div>
  );
}

export default Login;
