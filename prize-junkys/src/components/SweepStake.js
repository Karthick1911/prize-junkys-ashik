/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MoreOption from './MoreOption';
//import MoreOption from './MoreOption';
function SweepStake(props) {
  const [items, setItems] = useState({ data: [] });
  useEffect(() => {
    axios
      .get('http://80.211.233.121/prize_junkys/api/sweepstake/', {})
      .then((res) => {
        let result = JSON.stringify(res.data.stakes);
        let arrayResult = JSON.parse(result);
        setItems({ data: arrayResult.data });
        console.log(arrayResult.data);
        console.log(typeof arrayResult.data);
      });
  }, []);

  const handleView = (key) => {
    const link = '/SweepstakeDetails/' + key;
    console.log(link);
    props.history.push(link);
  };

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
      <div>
        <span>
          <Link to="/Logout" className="left">
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
        <span className="wolor">Sweepstake</span>
        <MoreOption onClick={changeOption} />

        <br />
        <br />
        <div className="input-group bordernone searchbar input-group-text">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>
          <input
            type="search"
            className="form-control transparent-input"
            placeholder="Search by Sweepstake Titles"
            aria-label="Search"
            aria-describedby="search-addon"
          />
        </div>
      </div>
      <div>
        <div>
          {items.data.length &&
            items.data.map((item) => (
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
                    onClick={() => {
                      handleView(item.id);
                    }}
                  >
                    view
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SweepStake;
