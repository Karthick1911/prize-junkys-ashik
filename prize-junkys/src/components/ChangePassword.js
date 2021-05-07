import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation, QueryClient, QueryClientProvider } from 'react-query';
import MoreOption from './MoreOption';

const queryClient = new QueryClient();

function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState({ data: {} });
  const [message, setMessage] = useState('');
  const user = localStorage.getItem('token');

  const { register, handleSubmit } = useForm();

  const changeOption = (changeParam) => {
    switch (changeParam) {
      case 'MySweepstake':
        props.history.push('/MySweepstake');
        break;
      case 'MyProfile':
        props.history.push('/Profile');
        break;
      case 'Logout':
        props.history.push('/Logout');
        break;
      default:
        break;
    }
  };

  const mutation = useMutation(async (data) => {
    try {
      const change = {
        old_password: data.oldPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      };
      const response = await axios.post(
        'http://80.211.233.121/prize_junkys/api/changepassword',
        change,
        { headers: { Authorization: 'Bearer' + user } }
      );
      console.log('Try Response: ', response.data);
      setResponse({ data: response.data });
      console.log('Message :', response.data.message);
      if (response.data.message === 'Incorrect old password!') {
        setError(response.data.message);
      }
      if (response.data.message === 'Your password changed successfully!') {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log('catch Response', err.response);
    }
  });

  const handleReset = (data) => {
    console.log('Form data : ', data);
    mutation.mutate(data);
  };
  return (
    <div>
      <div>
        <span className="wolor ">Change Password</span>
        <MoreOption onClick={changeOption} />
      </div>
      <br />
      <br />
      <div>
        <h2 className="wolor">Prize junkys</h2>
        <br />
      </div>
      {message === '' && (
        <div>
          <h2 className="wolor">Change Password?</h2>
          <form onSubmit={handleSubmit(handleReset)}>
            <div class="form-outline fieldwidth">
              <input
                type="password"
                name="oldPassword"
                className="form-control form-control-lg "
                placeholder="Enter Old Password"
                {...register('oldPassword', {})}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {error && <h3 className="white">{error}</h3>}
              {response.data.errors && (
                <h3 className="white">{response.data.errors.old_password}</h3>
              )}
            </div>
            <br />

            <div class="form-outline fieldwidth">
              <input
                type="password"
                name="newPassword"
                className="form-control form-control-lg "
                placeholder="Enter New Password"
                {...register('newPassword', {})}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {response.data.errors && (
                <h3 className="white">{response.data.errors.new_password}</h3>
              )}
            </div>
            <br />

            <div class="form-outline fieldwidth">
              <input
                type="password"
                name="confirmPassword"
                className="form-control form-control-lg "
                placeholder="Confirm New Password"
                {...register('confirmPassword', {})}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {response.data.errors && (
                <h3 className="white">
                  {response.data.errors.confirm_password}
                </h3>
              )}
            </div>
            <br />
            <div>
              <input type="submit" className="btn-col" />
            </div>

            <br />
          </form>
        </div>
      )}
      {message && (
        <div>
          <h1 className="white">{message}</h1>
          <Link to="/" className="btn-col">
            Go to Login Page
          </Link>
        </div>
      )}
    </div>
  );
}

// Higher order function
const hof = (WrappedComponent) => {
  // Its job is to return a react component warpping the baby component
  return (props) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...props} />
    </QueryClientProvider>
  );
};

export default hof(ChangePassword);
