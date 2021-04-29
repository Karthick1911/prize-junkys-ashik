import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import PasswordMessage from './PasswordMessage';
import axios from 'axios';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const handleReset = async () => {
    setError(null);
    await axios
      .post('http://80.211.233.121/prize_junkys/api/auth/passwordreset', {
        email: email,
      })
      .then((response) => {
        console.log('response>>>', response);
        console.log('message>>>', response.data.message);
        if (response.data.message === 'We have emailed your password.') {
          localStorage.setItem('user-info', JSON.stringify(response.data));
          console.log('message>>>', response.data.message);
          setMessage(response.data.message);
        } else {
          setError(response.data.errors.email);
        }
      });
  };

  return (
    <div>
      <h2 className="wolor">PRIZE JUNKYS</h2>
      <br />
      <h2 className="wolor">Forget Password?</h2>
      <br />
      <div class="form-outline fieldwidth">
        <input
          type="text"
          id="formControlLg"
          class="form-control form-control-lg "
          placeholder="Email Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <h4 className="error-msg-color">{error}</h4>}
      <br />
      <button className="btn-col" onClick={handleReset}>
        RESET PASSWORD
      </button>
      <br />
      <br />
      <br />
      <div>
        {message && (
          <div>
            <h1 className="wolor">{message}</h1>
            <Link to="/">
              <button className="btn-col">BACK TO LOGIN</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
