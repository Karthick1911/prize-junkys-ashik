import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SweepStake from './components/SweepStake';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import SweepstakeDetails from './components/SweepstakeDetails';
import MySweepstake from './components/MySweepstake';
import Logout from './components/Logout';
import SweepstakeDetail from './components/SweepstakeDetail';
import Protected from './components/Protected';
import ChangePassword from './components/ChangePassword';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotpassword" component={ForgotPassword} />

          <Route path="/sweepstake">
            <Protected Component={SweepStake} />
          </Route>

          <Route path="/profile">
            <Protected Component={Profile} />
          </Route>

          <Route path="/changepassword">
            <Protected Component={ChangePassword} />
          </Route>
          <Route path="/sweepstakedetails/:id">
            <Protected Component={SweepstakeDetails} />
          </Route>
          <Route path="/mysweepstake">
            <Protected Component={MySweepstake} />
          </Route>
          <Route path="/sweepstakedetail/:id">
            <Protected Component={SweepstakeDetail} />
          </Route>

          <Route path="/logout">
            <Protected Component={Logout} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
