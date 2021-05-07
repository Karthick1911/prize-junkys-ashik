/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useMutation, QueryClient, QueryClientProvider } from 'react-query';
import MoreOption from './MoreOption';

const queryClient = new QueryClient();

function SweepstakeDetails(props) {
  const user = localStorage.getItem('token');
  const [items, setItems] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [response, setResponse] = useState('');
  const { id } = useParams();
  console.log('id from sweep', id);

  const mutation = useMutation(async (id) => {
    console.log('PARAM ID', id);
    await axios
      .post(
        'http://80.211.233.121/prize_junkys/api/stakeform/store',
        { sweep_stake_id: id },
        { headers: { Authorization: 'Bearer' + user } }
      )
      .then((response) => {
        console.log('subscription message :', response.data.message);
        // switch (response.data.message) {
        //   case 'Details are already submitted.':
        //     setResponse(response.data.message);
        //     break;
        //   case 'Cannot find sweepstake details':
        //     setResponse(response.data.message);
        //     break;
        //   case 'Sweepstake form submitted successfully.':
        //     setResponse(response.data.message);
        //     break;
        //   default:
        //     break;
        // }
        if (response.data.message === 'Details are already submitted.') {
          setResponse(response.data.message);
        }
        if (response.data.message === 'Cannot find sweepstake details') {
          setResponse(response.data.message);
        }
        if (
          response.data.message === 'Sweepstake form submitted successfully.'
        ) {
          setResponse(
            response.data.message + 'Check MySweepstake for more details'
          );
        }
      });
  });

  const mute = (id) => mutation.mutate(id);
  // const { data } = useQuery('store', mute);
  //console.log('SUBS DATA', data);
  useEffect(() => {
    let key = id;
    mute(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
        {response && <h2 className="white">{response}</h2>}
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
