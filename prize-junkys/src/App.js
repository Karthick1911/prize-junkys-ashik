import Login from './components/Login';
import SweepStake from './components/SweepStake';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import ProfileMessage from './components/ProfileMessage';
import SweepstakeDetails from './components/SweepstakeDetails';
import MySweepstake from './components/MySweepstake';
import Logout from './components/Logout';
import SweepstakeDetail from './components/SweepstakeDetail';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChangePassword from './components/ChangePassword';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/SweepStake" component={SweepStake} />
            <Route path="/Register" component={Register} />
            <Route path="/Profile" component={Profile} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <Route path="/ProfileMessage" component={ProfileMessage} />
            <Route path="/ChangePassword" component={ChangePassword} />
            <Route
              path="/SweepstakeDetails/:id"
              component={SweepstakeDetails}
            />
            <Route path="/MySweepstake" component={MySweepstake} />
            <Route path="/Logout" component={Logout} />
            <Route path="/SweepstakeDetail/:id" component={SweepstakeDetail} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
