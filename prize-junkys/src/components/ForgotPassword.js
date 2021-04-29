import React, { useState } from 'react';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const handleReset = () => {
    props.history.push('/components/ResetPassword');
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
      <br />
      <button className="btn-col" onClick={handleReset}>
        RESET PASSWORD
      </button>
    </div>
  );
}

export default ForgotPassword;
