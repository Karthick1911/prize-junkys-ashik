/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import MoreOption from './MoreOption';
import * as ReactBootstrap from 'react-bootstrap';

function SweepStake(props) {
  const [items, setItems] = useState({ data: [] });
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios
      .get('http://80.211.233.121/prize_junkys/api/sweepstake/', {})
      .then((res) => {
        let result = JSON.stringify(res.data.stakes);
        let arrayResult = JSON.parse(result);
        setItems({ data: arrayResult.data });
        console.log(arrayResult.data);
        console.log(typeof arrayResult.data);
        setIsLoading(true);
      });
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.data.filter((post) => {
        console.log('post title:', post.title);
        const title = post.title.toLowerCase();
        if (search) {
          return title.includes(search.toLowerCase());
        }
      })
    );
  }, [search, items.data]);

  console.log('normal post', items.data);
  console.log('filtered post:', filteredItems);

  const handleView = (key) => {
    const link = '/sweepstakedetails/' + key;
    console.log(link);
    history.push(link);
  };

  const changeOption = (changeParam) => {
    console.log(changeParam);
    switch (changeParam) {
      case 'MySweepstake':
        history.push('/mysweepstake');
        break;
      case 'MyProfile':
        history.push('/profile');
        break;
      case 'Logout':
        history.push('/logout');
        break;
      default:
        break;
    }
  };

  const listView = () => {
    setView('list');
    console.log(view);
  };

  const gridView = () => {
    setView('grid');
    console.log(view);
  };
  return (
    <div>
      <div>
        <span>
          <Link to="/logout" className="left">
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
        <span className="wolor">Sweepstake</span>
        {view === 'list' && (
          <span>
            <button className="transparent rightviewbtn" onClick={gridView}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-grid transparent rightviewbtn"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
              </svg>
            </button>
          </span>
        )}
        {view === 'grid' && (
          <span>
            <button className="transparent rightviewbtn" onClick={listView}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-list  transparent rightviewbtn"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </span>
        )}
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
              className="bi bi-search"
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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              let length = filteredItems.length;
              if (length > 1) {
                setFilteredItems((filteredItems[length] = []));
              }
            }}
          />
        </div>
      </div>

      {search && (
        <div>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div>
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
              </div>
            ))
          ) : (
            <h2 className="white">Not Found</h2>
          )}
        </div>
      )}
      <div>
        {view === 'list' && search === '' && (
          <div>
            {items.data.length &&
              items.data.map((item) => (
                <div>
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
                </div>
              ))}
          </div>
        )}

        {isLoading ? (
          view === 'grid' &&
          search === '' && (
            <div>
              {items.data.length &&
                items.data.map((item) => (
                  <span className=" gridinner">
                    <span className=" gridproduct">
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
                    </span>
                  </span>
                ))}
            </div>
          )
        ) : (
          <ReactBootstrap.Spinner animation="border" className="white" />
        )}
      </div>
    </div>
  );
}

export default SweepStake;
