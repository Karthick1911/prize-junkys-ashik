/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
//import { set } from 'react-hook-form';

function SweepstakeDetails(props) {
  const [data, setData] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [hideButton, setHideButton] = useState(true);
  let { id } = useParams();
  console.log(id);
  const user =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vODAuMjExLjIzMy4xMjEvcHJpemVfanVua3lzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjIwMTM5NjgxLCJleHAiOjE2MjAxNDMyODEsIm5iZiI6MTYyMDEzOTY4MSwianRpIjoid0NrcVcyOFhmd09FNlFTbiIsInN1YiI6MTAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Kjd0l-uI4ZYQjSK0HI7OpWYNH7a5_Efk58PPIwBAaWc';
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

  return (
    <div>
      <div className="headersec">
        <h2>Sweepstake Details</h2>
      </div>

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
