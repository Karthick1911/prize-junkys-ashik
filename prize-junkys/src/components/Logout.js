import React from 'react';
import { useHistory } from 'react-router-dom';
function Logout(props) {
  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  const cancel = () => {
    history.push('/sweepstake');
  };

  const history = useHistory();

  return (
    <div className="popup">
      <div className="popup_inner">
        <h4>Do you want to Logout?</h4>
        <br />
        <button onClick={cancel} className="logoutbtn">
          CANCEL
        </button>
        &nbsp;
        <button onClick={logout} className="logoutbtn">
          OKAY
        </button>
      </div>
    </div>
  );
}

export default Logout;
