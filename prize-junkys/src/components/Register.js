import React, { useState } from 'react';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasssword, setConfirmPasssword] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    props.history.push('/');
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
      <br />
      <button className="btn-col" onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
}

export default Register;
