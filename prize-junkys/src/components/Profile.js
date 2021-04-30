import React, { useState } from 'react';
import axios from 'axios';

function Profile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const submitButton = async () => {
    setError(null);
    await axios
      .post('http://80.211.233.121/prize_junkys/api/userprofile', {
        first_name: name,
        email: email,
        mobile_no: phoneNumber,
        age: age,
        address: address,
      })
      .then((response) => {
        if (response.data.message === 'Contact Admin') {
          console.log(response.data.message);
          localStorage.setItem('user-info', JSON.stringify(response.data));
          props.history.push('/components/ProfileMessage');
        } else {
          console.log(response.data.message);
          setError(response.data.message);
        }
      });
  };
  return (
    <div>
      <div className="headersec">
        <h4>Profile</h4>
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
      <div>
        <div className="form-outline fieldwidth">
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
        <div className="form-outline fieldwidth">
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
        <div className="form-outline fieldwidth">
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
        <div className="form-outline fieldwidth">
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
        <div className="form-outline fieldwidth">
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
        {error && <h2 className="error-msg-color">{error}</h2>}
        <button className="btn-col" onClick={submitButton}>
          SUBMIT
        </button>
        <br />
        <button className="btn-col">CHANGE PASSWORD</button>
      </div>
    </div>
  );
}

export default Profile;
