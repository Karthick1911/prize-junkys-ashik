import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import MoreOption from './MoreOption';
function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleReset = async () => {
    setError(null);
    await axios
      .post('http://80.211.233.121/prize_junkys/api/changepassword', {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
      .then((response) => {
        if (newPassword !== confirmPassword) {
          setError('Your password and confirmation password do not match');
        } else if (response.data.message === 'Contact Admin') {
          console.log(response.data.message);
          localStorage.setItem('user-info', JSON.stringify(response.data));
          props.history.push('/ProfileMessage');
        } else {
          console.log(response.data.message);
          setError(response.data.message);
        }
      });
  };

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
        <h2 className="wolor">Change Password?</h2>
        <br />
      </div>

      <div>
        <form onSubmit={handleSubmit(handleReset)}>
          <div class="form-outline fieldwidth">
            <input
              type="text"
              className="form-control form-control-lg "
              placeholder="Enter Old Password"
              {...register('oldPassword', { required: true })}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {errors.oldPassword && (
              <h4 className="wolor">Old Password is required*</h4>
            )}
          </div>
          <br />

          <div class="form-outline fieldwidth">
            <input
              type="text"
              className="form-control form-control-lg "
              placeholder="Enter New Password"
              {...register('newPassword', { required: true })}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && (
              <h4 className="wolor">New Password is required*</h4>
            )}
          </div>
          <br />

          <div class="form-outline fieldwidth">
            <input
              type="text"
              className="form-control form-control-lg "
              placeholder="Confirm New Password"
              {...register('confirmPassword', { required: true })}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <h4 className="wolor">Confirm Password is required*</h4>
            )}
          </div>
          <br />
          {error && <h2 className="error-msg-color">{error}</h2>}
          <br />
          <input type="submit" className="btn-col" />
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
