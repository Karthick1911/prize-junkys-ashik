/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import MoreOption from './MoreOption';

function SweepstakeDetails(props) {
  const [data, setData] = useState({});
  let { id } = useParams();
  console.log(id);
  const user = localStorage.getItem('token');
  useEffect(() => {
    axios
      .get('http://80.211.233.121/prize_junkys/api/sweepstake/details/' + id, {
        headers: { Authorization: 'Bearer' + user },
      })

      .then((res) => {
        console.log(res);
        let result = res.data.stake;
        console.log('result>>', result);
        setData(result);
        console.log(data.title);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    props.history.push('/SweepstakeDetail/' + id);
  };

  const changeOption = (changeParam) => {
    switch (changeParam) {
      case 'MySweepstake':
        props.history.push('/MySweepstake');
        break;
      case 'MyProfile':
        props.history.push('/Profile');
        break;
      case 'Logout':
        props.history.push('/Logout');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
        <span>
          <Link to="/SweepStake" className="left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </Link>
        </span>
        <span className="wolor ">Sweepstake Details</span>
        <MoreOption onClick={changeOption} />
      </div>
      <br />
      <br />
      <div>
        <div className="middle">
          <div className="productbg ">
            <div>
              <img src={data.image} height="200" width="200" />
            </div>
            <h4>{data.title}</h4>
            <br />
            <h7>{data.description}</h7>
            <br />
            <div>
              <button className="view" onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SweepstakeDetails;
