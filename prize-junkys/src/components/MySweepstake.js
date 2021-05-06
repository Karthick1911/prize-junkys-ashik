/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <h2>No SweepStake</h2>
        )}
      </div>
    </div>
  );
}

export default MySweepstake;
