/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MoreOption from './MoreOption';

function MySweepstake(props) {
  const [items, setItems] = useState({ data: [] });
  const user = localStorage.getItem('token');
  useEffect(() => {
    axios
      .get('http://80.211.233.121/prize_junkys/api/subscription', {
        headers: { Authorization: 'Bearer' + user },
      })

      .then((res) => {
        console.log('subscription', res);
        let result = JSON.stringify(res.data.stakes);
        let arrayResult = JSON.parse(result);
        setItems({ data: arrayResult });
        console.log(arrayResult.data);
        console.log(typeof arrayResult.data);
      });
  }, []);

  const changeOption = (changeParam) => {
    console.log(changeParam);
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
      <div className="inline">
        <span>
          <span>
            <Link to="/SweepStake" className="left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </Link>
          </span>
          <span className="wolor">My Sweepstake</span>
          <MoreOption onClick={changeOption} />
        </span>
      </div>
      <div>
        {items.data.length ? (
          items.data.map((item) => (
            <div className="middle">
              <div className="productbg ">
                <div key={item.id} className="image">
                  <img src={item.image} height="150" width="150" />
                </div>
                <h4 className="desc" key={item.id}>
                  {item.title}
                </h4>
                <br />
                <h5>Start date : {item.start_date}</h5>
                <h5>Etart date : {item.end_date}</h5>
                <h5>Odds : {item.ratio}</h5>
                <h5>
                  Status :<span className="orange">{item.status_info}</span>
                </h5>
              </div>
            </div>
          ))
        ) : (
          <h2 className="white">No SweepStake</h2>
        )}
      </div>
    </div>
  );
}

export default MySweepstake;
