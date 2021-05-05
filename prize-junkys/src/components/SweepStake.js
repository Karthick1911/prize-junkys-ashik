/* eslint-disable jsx-a11y/alt-text */
import MoreOption from './MoreOption';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  // const options = () => {
  //   props.history.push('/components/Profile');
  // };

  const handleView = (key) => {
    const link = '/components/SweepstakeDetails/' + key;
    console.log(link);
    props.history.push(link);
  };

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
      <div>
        <span className="wolor">Sweepstake</span>
        <MoreOption onClick={changeOption} />
        {/* <div className="header-right ">
          <button type="button" className="transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-grid "
              viewBox="0 0 16 16"
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
            </svg>
          </button> 

          {/* <button type="button" className="transparent" onClick={options}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-three-dots-vertical "
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
        </div> */}

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

      {/* <div>{activePage === 'page2' && <SweepstakeDetails key={key} />}</div> */}
    </div>
  );
}

export default SweepStake;
