/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Protected(props) {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      history.push('./');
    }
  }, []);

  return (
    <div>
      <props.Component />
    </div>
  );
}

export default Protected;
