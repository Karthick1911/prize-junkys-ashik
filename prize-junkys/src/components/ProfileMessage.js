import React from 'react';
import { Link } from 'react-router-dom';

function ProfileMessage() {
  return (
    <div>
      <h1 className="wolor">Contact Admin</h1>
      <Link to="/SweepStake" className="btn-col">
        Back to Home
      </Link>
    </div>
  );
}

export default ProfileMessage;
