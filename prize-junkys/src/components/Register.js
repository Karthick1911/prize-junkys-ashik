/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasssword, setConfirmPasssword] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push('/sweepstake');
    }
  }, []);

  const registerSubmit = async (data) => {
    setError('');
    await axios
      .post('http://80.211.233.121/prize_junkys/api/auth/register', {
        first_name: data.name,
        email: data.email,
        password: data.password,
        mobile_no: data.phoneNumber,
        age: data.age,
        address: data.address,
      })
      .then((response) => {
        console.log(response.data.errors);
        console.log(typeof response.data.errors);
        if (response.data.message === 'User registered successfully') {
          console.log(response.data.message);
          history.push('/');
        } else {
          console.log(response.data.message);
        }
      });
  };

  const submitButton = (data) => {
    console.log('data:', data);
    if (data.password === data.confirmPasssword) {
      registerSubmit(data);
    } else {
      setError('Password and Confirm Password not Matched');
    }
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
      <h2 className="wolor">Register</h2>
      <form onSubmit={handleSubmit(submitButton)}>
        <div className="form-outline fieldwidth">
          <input
            type="text"
            id="formControlLg"
            className="form-control form-control-lg "
            placeholder="Name*"
            {...register('name', {
              required: 'The name field is required.',
            })}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <h3 className="white">{errors.name.message}</h3>}
        </div>
        <br />
        <div className="form-outline fieldwidth">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Email*"
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
          {errors.email && <h3 className="white">{errors.email.message}</h3>}
        </div>
        <br />
        <div className="form-outline fieldwidth">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Phone Number*"
            {...register('phoneNumber', {
              required: 'The mobile no field is required.',
              pattern: {
                value: /^\d{10,15}$/,
                message: 'The mobile no must be between 10 and 15 digits.',
              },
            })}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && (
            <h3 className="white">{errors.phoneNumber.message}</h3>
          )}
        </div>
        <br />
        <div className="form-outline fieldwidth">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Password*"
            {...register('password', {
              required: 'The password field is required.',
              minLength: {
                value: 6,
                message: 'The password must be at least 6 characters.',
              },
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <h3 className="white">{errors.password.message}</h3>
          )}
        </div>
        <br />
        <div className="form-outline fieldwidth">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Confirm Password*"
            {...register('confirmPasssword', {
              required: 'The confirm password field is required.',
              minLength: {
                value: 6,
                message: 'The confirm password must be at least 6 characters.',
              },
            })}
            value={confirmPasssword}
            onChange={(e) => setConfirmPasssword(e.target.value)}
          />
          {errors.confirmPasssword ? (
            <h3 className="white">{errors.confirmPasssword.message}</h3>
          ) : (
            error && <h3 className="white">{error}</h3>
          )}
        </div>
        <br />
        <div className="form-outline fieldwidth">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Age*"
            {...register('age', {
              required: 'The age field is required.',
              pattern: {
                value: /^\d{1,3}$/,
                message: 'The age must be 2 or 3 digits.',
              },
            })}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <h3 className="white">{errors.age.message}</h3>}
        </div>
        <br />
        <div className="form-outline fieldwidth">
          <textarea
            type="text"
            className="form-control form-control-lg"
            placeholder="Address*"
            {...register('address', {
              required: 'The address field is required.',
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
        </div>
        <br />
        <div>
          <input type="submit" className="btn-col" value="SUBMIT" />
        </div>
      </form>
    </div>
  );
}

export default Register;
