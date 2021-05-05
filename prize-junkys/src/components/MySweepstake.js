/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoreOption from './MoreOption';

function MySweepstake(props) {
  const [items, setItems] = useState({ data: [] });
  const user =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vODAuMjExLjIzMy4xMjEvcHJpemVfanVua3lzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjIwMjA4ODAzLCJleHAiOjE2MjAyMTI0MDMsIm5iZiI6MTYyMDIwODgwMywianRpIjoiRktFRGxKbWw4ZEtXcVlBZCIsInN1YiI6MTAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.smdaOcjUaHG0zLsimojhrrcnz-ZyFKK_Ue2XQMvaVQc';
  useEffect(() => {
    axios
      .get('http://80.211.233.121/prize_junkys/api/subscription', {
        headers: { Authorization: 'Bearer' + user },
      })

      .then((res) => {
        console.log(res);
        let result = JSON.stringify(res.data.stakes);
        let arrayResult = JSON.parse(result);
        setItems({ data: arrayResult.data });
        console.log('result>>', arrayResult.length);
        //setData(result);
        //console.log(data.title);
      });
  }, []);

  const changeOption = (changeParam) => {
    console.log(changeParam);
    switch (changeParam) {
      case 'MySweepstake':
        props.history.push('/components/MySweepstake');
        break;
      case 'MyProfile':
        props.history.push('/components/Profile');
        break;
      case 'Logout':
        props.history.push('/components/Logout');
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
        {items.length ? (
          <div>
            {items.map((item) => (
              <div className="middle">
                <div className="productbg ">
                  <div key={item.id} className="image">
                    <img src={item.image} height="100" width="100" />
                  </div>
                  <h4 className="desc" key={item.id}>
                    {item.title}
                  </h4>
                  <br />
                  <button
                    key={item.id}
                    className="view"
                    //   onClick={() => {
                    //     handleView(item.id);
                    //   }}
                  >
                    view
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="wolor">No Sweepstakes</h2>
        )}
      </div>
    </div>
  );
}

export default MySweepstake;
