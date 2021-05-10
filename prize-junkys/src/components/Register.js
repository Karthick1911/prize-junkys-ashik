/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push('/SweepStake');
    }
  }, []);

  const handleSubmit = async () => {
    setData({});
    setError('');
    await axios
      .post('http://80.211.233.121/prize_junkys/api/auth/register', {
        first_name: name,
        email: email,
        password: password,
        mobile_no: phoneNumber,
        age: age,
        address: address,
      })
      .then((response) => {
        console.log(response.data.errors);
        console.log(typeof response.data.errors);
        if (response.data.message === 'User registered successfully') {
          console.log(response.data.message);
          localStorage.setItem('user-info', JSON.stringify(response.data));
          history.push('/');
        } else {
          console.log(response.data.message);
          setData(response.data.errors);
          if (confirmPasssword === '') {
            setError('The confirm password field is required.');
          }
        }
      });
  };

  const submitButton = () => {
    if (password === confirmPasssword) {
      handleSubmit();
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

      <div className="form-outline fieldwidth">
        <input
          type="text"
          id="formControlLg"
          className="form-control form-control-lg "
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {data.first_name && <h4 className="white">{data.first_name}</h4>}
      </div>
      <br />
      <div className="form-outline fieldwidth">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {data.email && <h4 className="white">{data.email}</h4>}
      </div>
      <br />
      <div className="form-outline fieldwidth">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Phone Number*"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {data.mobile_no && <h4 className="white">{data.mobile_no}</h4>}
      </div>
      <br />
      <div className="form-outline fieldwidth">
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {data.password && <h4 className="white">{data.password}</h4>}
      </div>
      <br />
      <div className="form-outline fieldwidth">
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Confirm Password*"
          value={confirmPasssword}
          onChange={(e) => setConfirmPasssword(e.target.value)}
        />
        {error && <h4 className="white">{error}</h4>}
      </div>
      <br />
      <div className="form-outline fieldwidth">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Age*"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {data.age && <h4 className="white">{data.age}</h4>}
      </div>
      <br />
      <div className="form-outline fieldwidth">
        <textarea
          type="text"
          className="form-control form-control-lg"
          placeholder="Address*"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {data.address && <h4 className="white">{data.address}</h4>}
      </div>

      <br />
      <button className="btn-col" onClick={submitButton}>
        SUBMIT
      </button>
    </div>
  );
}

export default Register;
