import React from 'react';

function Logout(props) {
  const logout = () => {
    localStorage.clear();
    props.history.push('/');
  };

  const cancel = () => {
    props.history.push('/SweepStake');
  };

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
