import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import MoreOption from './MoreOption';
//import { useEffect } from 'react/cjs/react.development';

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
  const user = localStorage.getItem('token');

  const { register, handleSubmit } = useForm();

  const mutation = useMutation(async (user) => {
    try {
      const response = await axios.post(
        'http://80.211.233.121/prize_junkys/api/auth/me',
        { Authorization: 'Bearer ' + user }
        //{ body: { sweep_stake_id: id } },
      );
      console.log('Try Profile message :', response);
      //setResponse(response);
      //history.push('/');
    } catch (err) {
      console.log('CATCH ERROR: ', err.response);
      //setResponse(err.response);
    }
  });
  const mute = (user) => mutation.mutate(user);

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
    props.history.push('/ChangePassword');
  };

  const changeOption = (changeParam) => {
    console.log(changeParam);
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

  const submitButton = (data) => {
    console.log('Form data : ', data);
    submitForm(data, user);
    //mutation.mutate(data);
  };
  return (
    <div>
      <div className="headersec">
        <span>
          <MoreOption onClick={changeOption} />
        </span>
        <h3>Profile</h3>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          fill="currentColor"
          class="bi bi-person-circle"
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
                  class="form-control form-control-lg "
                  placeholder="Name*"
                  {...register('name', {})}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {response.data.first_name && (
                  <h3 className="white">{response.data.first_name}</h3>
                )}
              </div>
              <br />
              <div className="form-outline fieldwidth">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Email*"
                  {...register('email', {})}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {response.data.email && (
                  <h3 className="white">{response.data.email}</h3>
                )}
              </div>
              <br />
              <div className="form-outline fieldwidth">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Phone Number*"
                  {...register('phoneNumber', {})}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {response.data.mobile_no && (
                  <h3 className="white">{response.data.mobile_no}</h3>
                )}
              </div>
              <br />
              <div className="form-outline fieldwidth">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Age*"
                  {...register('age', {})}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {response.data.age && (
                  <h3 className="white">{response.data.age}</h3>
                )}
              </div>
              <br />
              <div className="form-outline fieldwidth">
                <textarea
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Address*"
                  {...register('address', {})}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {response.data.address && (
                  <h3 className="white">{response.data.address}</h3>
                )}
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
export default hof(Profile);
