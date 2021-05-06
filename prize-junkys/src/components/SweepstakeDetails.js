/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MoreOption from './MoreOption';

function SweepstakeDetails(props) {
  const [data, setData] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [hideButton, setHideButton] = useState(true);
  let { id } = useParams();
  console.log(id);
  const user =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vODAuMjExLjIzMy4xMjEvcHJpemVfanVua3lzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjIwMjgzNzUxLCJleHAiOjE2MjAyODczNTEsIm5iZiI6MTYyMDI4Mzc1MSwianRpIjoiVFFJWmNMNlluaWl0N2JBQiIsInN1YiI6MTAzLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.4incjFScfG6t4dmfP8RHQmGi2KYBwa1kcLCKez0AOZs';
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
  }, [data.title, id]);

  const handleSubmit = () => {
    axios
      .get('http://80.211.233.121/prize_junkys/api/sweepstake/details/' + id, {
        headers: { Authorization: 'Bearer' + user },
      })

      .then((res) => {
        console.log(res.data.ratio);
        setSubmitMessage(res.data.ratio);
        setHideButton(false);
      });
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
            {submitMessage && (
              <h7 className="redcolor">ODDS : {submitMessage}</h7>
            )}
            <br />
            <h7>{data.description}</h7>
            <br />
            <div>
              {hideButton && (
                <button className="view" onClick={handleSubmit}>
                  SUBMIT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SweepstakeDetails;
