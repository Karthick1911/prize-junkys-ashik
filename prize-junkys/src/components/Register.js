import React, { useState } from 'react';
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

  const handleSubmit = async () => {
    setError(null);
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
        if (response.data.message === 'User registered successfully') {
          console.log(response.data.message);
          localStorage.setItem('user-info', JSON.stringify(response.data));
          props.history.push('/');
        } else {
          console.log(response.data.message);
          setError(response.data.message);
        }
      });
  };

  const submitButton = () => {
    if (password === confirmPasssword) {
      handleSubmit();
    } else {
      setError('Check password');
    }
  };
  return (
    <div>
      <h2 className="wolor">Register</h2>

      <div class="form-outline fieldwidth">
        <input
          type="text"
          id="formControlLg"
          class="form-control form-control-lg "
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />
      <div class="form-outline fieldwidth">
        <input
          type="text"
          id="formControlLg"
          class="form-control form-control-lg"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div class="form-outline fieldwidth">
        <input
          type="text"
          id="formControlLg"
          class="form-control form-control-lg"
          placeholder="Phone Number*"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <br />
      <div class="form-outline fieldwidth">
        <input
          type="text"
          id="formControlLg"
          class="form-control form-control-lg"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <div class="form-outline fieldwidth">
        <input
          type="text"
          id="formControlLg"
          class="form-control form-control-lg"
          placeholder="Confirm Password*"
          value={confirmPasssword}
          onChange={(e) => setConfirmPasssword(e.target.value)}
        />
      </div>
      <br />
      <div class="form-outline fieldwidth">
        <input
          type="text"
          id="formControlLg"
          class="form-control form-control-lg"
          placeholder="Age*"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <br />
      <div class="form-outline fieldwidth">
        <textarea
          type="text"
          id="formControlLg"
          class="form-control form-control-lg"
          placeholder="Address*"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      {error && <h2 className="error-msg-color">{error}</h2>}
      <br />
      <button className="btn-col" onClick={submitButton}>
        SUBMIT
      </button>
    </div>
  );
}

export default Register;
