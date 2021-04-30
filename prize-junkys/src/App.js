import Login from './components/Login';
import SweepStake from './components/SweepStake';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import ProfileMessage from './components/ProfileMessage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/components/SweepStake" component={SweepStake} />
            <Route path="/components/Register" component={Register} />
            <Route path="/components/Profile" component={Profile} />
            <Route
              path="/components/ForgotPassword"
              component={ForgotPassword}
            />
            <Route
              path="/components/ProfileMessage"
              component={ProfileMessage}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
