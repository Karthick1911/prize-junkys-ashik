/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function MoreOption(props) {
  const handleSweep = () => {
    props.onClick('MySweepstake');
  };

  const handleProfile = () => {
    props.onClick('MyProfile');
  };

  const handleLogout = () => {
    props.onClick('Logout');
  };

  return (
    <div className="header-right-width ">
      <div id="container">
        <nav>
          <ul>
            <li>
              <button className="transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical "
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </button>
              <ul>
                <li>
                  <button className="transparent" onClick={handleSweep}>
                    My Sweepstake
                  </button>
                </li>
                <li>
                  <button className="transparent" onClick={handleProfile}>
                    My Profile
                  </button>
                </li>
                <li>
                  <button className="transparent" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MoreOption;
