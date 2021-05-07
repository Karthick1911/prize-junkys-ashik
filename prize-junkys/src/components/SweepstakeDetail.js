/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query';
import MoreOption from './MoreOption';

const queryClient = new QueryClient();

function SweepstakeDetails(props) {
  const user = localStorage.getItem('token');
  const [items, setItems] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const { id } = useParams();
  //const key = id;
  console.log('id from sweep', id);

  const mutation = useMutation(async (id) => {
    try {
      //   const change = {
      //     old_password: data.old_password,
      //     new_password: data.new_password,
      //     confirm_password: data.confirm_password,
      //   };
      console.log('PARAM ID', id);
      const response = await axios.post(
        'http://80.211.233.121/prize_junkys/api/stakeform/store',
        { body: { sweep_stake_id: id } },
        { headers: { Authorization: 'Bearer' + user } }
      );
      console.log('subscription message :', response);
      //setResponse(response);
      //history.push('/');
    } catch (err) {
      console.log('CATCH ERROR: ', err.response);
      //setResponse(err.response);
    }
  });

  const mute = (id) => mutation.mutate(id);
  const { data } = useQuery('store', mute);

  useEffect(() => {
    console.log('SUBS DATA', data);
    axios
      .get('http://80.211.233.121/prize_junkys/api/sweepstake/details/' + id, {
        headers: { Authorization: 'Bearer' + user },
      })

      .then((res) => {
        console.log(res);
        let result = res.data.stake;
        console.log('subs result>>', result);
        setItems(result);
        console.log('title', items.title);
        setSubmitMessage(res.data.ratio);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   const subscribe = async () => {
  //     await axios
  //       .post('http://80.211.233.121/prize_junkys/api/stakeform/store', {
  //         sweep_stake_id: id,
  //         headers: { Authorization: 'Bearer' + user },
  //       })
  //       .then((res) => {
  //         console.log('subscription message :', res);
  //       });
  //   };

  //   useEffect(async () => {
  //     const response = await axios.post(
  //       'http://80.211.233.121/prize_junkys/api/stakeform/store',
  //       {
  //         sweep_stake_id: id,
  //         headers: { Authorization: 'Bearer' + user },
  //       }
  //     );

  //     console.log('subscription result', response);

  //     //   .then((res) => {
  //     //     console.log(res);
  //     //     let result = res.data;
  //     //     console.log('Subscribe result>>', result);
  //     //     //setData(result);
  //     //     console.log(data.title);
  //     //     //setSubmitMessage(res.data.ratio);
  //     //   });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);
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
              <img src={items.image} height="200" width="200" />
            </div>
            <h4>{items.title}</h4>
            {submitMessage && (
              <h7 className="redcolor">ODDS : {submitMessage}</h7>
            )}
            <br />
            <h7>{items.description}</h7>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

// Higher order function
const hof = (WrappedComponent) => {
  // Its job is to return a react component warpping the baby component
  return (props) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...props} />
    </QueryClientProvider>
  );
};

export default hof(SweepstakeDetails);
