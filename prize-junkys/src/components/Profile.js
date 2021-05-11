/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useMutation, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import MoreOption from './MoreOption';

const queryClient = new QueryClient();
function Profile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState({ data: {} });
  const [message, setMessage] = useState('');
  const [userInformation, setUserInformation] = useState({ information: {} });
  const history = useHistory();
  const user = localStorage.getItem('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(async (user) => {
    console.log('Token in useMutation :', user);
    await axios
      .post('http://80.211.233.121/prize_junkys/api/auth/me', [], {
        headers: { Authorization: 'Bearer' + user },
      })
      .then((res) => {
        console.log('Token in then :', user);
        console.log('Try Profile message :', res);
        console.log('resp data: ', res.data.data.email);
        if (res.data.message === 'User profile detail.') {
          setUserInformation({ information: res.data.data });
        }
      });
  });
  const mute = (user) => {
    console.log('Token in mute:', user);
    mutation.mutate(user);
  };
  useEffect(() => {
    let token = localStorage.getItem('token');
    mute(token);
  }, []);
  const submitForm = async (data, user) => {
    setError(null);
    const details = {
      first_name: data.name,
      email: data.email,
      mobile_no: data.phoneNumber,
      age: data.age,
      address: data.address,
    };
    await axios
      .post('http://80.211.233.121/prize_junkys/api/userprofile', details, {
        headers: { Authorization: 'Bearer' + user },
      })
      .then((response) => {
        console.log('Update response : ', response.data.message);
        console.log('Update error response : ', response.data.errors);
        if (response.data.message === 'The given data was invalid') {
          setResponse({ data: response.data.errors });
        }
        if (response.data.message === 'Your Profile Updated Successfully') {
          setMessage(response.data.message);
        }
      });
  };
  const handleChangePassword = () => {
    history.push('/changepassword');
  };

  const changeOption = (changeParam) => {
    console.log(changeParam);
    switch (changeParam) {
      case 'MySweepstake':
        history.push('/mysweepstake');
        break;
      case 'MyProfile':
        history.push('/profile');
        break;
      case 'Logout':
        history.push('/logout');
        break;
      default:
        break;
    }
  };

  const submitButton = (data) => {
    console.log('Form data : ', data);
    submitForm(data, user);
  };
  return (
    <div>
      <div className="headersec">
        <span>
          <Link to="/sweepstake" className="left">
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
        <span>
          <MoreOption onClick={changeOption} />
        </span>
        <h3>Profile</h3>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
        <br />
        <br />
        <br />
        <h2>PROFILE</h2>
      </div>

      <br />
      {message === '' && (
        <div>
          <form onSubmit={handleSubmit(submitButton)}>
            <div>
              <div className="form-outline fieldwidth">
                <input
                  type="text"
                  className="form-control form-control-lg "
                  placeholder={userInformation.information.first_name}
                  {...register('name', {
                    required: 'The Name field is required.',
                  })}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <h3 className="white">{errors.name.message}</h3>
                )}
                {/* {response.data.first_name && (
                  <h3 className="white">{response.data.first_name}</h3>
                )} */}
              </div>
              <br />
              <div className="form-outline fieldwidth">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={userInformation.information.email}
                  {...register('email', {
                    required: 'The Email field is required.',
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'Email format is invalid',
                    },
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <h3 className="white">{errors.email.message}</h3>
                )}
                {/* {response.data.email && (
                  <h3 className="white">{response.data.email}</h3>
                )} */}
              </div>
              <br />
              <div className="form-outline fieldwidth">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder={userInformation.information.mobile_no}
                  {...register('phoneNumber', {
                    required: 'The Phone Number field is required.',
                    pattern: {
                      value: /^\d{10,15}$/,
                      message:
                        'The mobile no must be between 10 and 15 digits.',
                    },
                  })}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && (
                  <h3 className="white">{errors.phoneNumber.message}</h3>
                )}
                {/* {response.data.mobile_no && (
                  <h3 className="white">{response.data.mobile_no}</h3>
                )} */}
              </div>
              <br />
              <div className="form-outline fieldwidth">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={userInformation.information.age}
                  {...register('age', {
                    required: 'The Age field is required.',
                    pattern: {
                      value: /^\d{1,3}$/,
                      message: 'The age must be 2 or 3 digits.',
                    },
                  })}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {errors.age && <h3 className="white">{errors.age.message}</h3>}
                {/* {response.data.age && (
                  <h3 className="white">{response.data.age}</h3>
                )} */}
              </div>
              <br />
              <div className="form-outline fieldwidth">
                <textarea
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={userInformation.information.address}
                  {...register('address', {
                    required: 'The Address field is required.',
                    maxLength: {
                      value: 150,
                      message: 'Address should be within 150 character',
                    },
                  })}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && (
                  <h3 className="white">{errors.address.message}</h3>
                )}
                {/* {response.data.address && (
                  <h3 className="white">{response.data.address}</h3>
                )} */}
              </div>
              <br />
              {error && <h2 className="error-msg-color">{error}</h2>}
              <div>
                <input
                  type="submit"
                  className="btn-col"
                  value="Update Profile"
                />
              </div>{' '}
              <br />
            </div>
          </form>
          <button className="btn-col" onClick={handleChangePassword}>
            CHANGE PASSWORD
          </button>
        </div>
      )}

      {message && (
        <div>
          <h1 className="white">{message}</h1>
          <Link to="/" onClick={localStorage.clear()} className="btn-col">
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
export default hof(Profile);
