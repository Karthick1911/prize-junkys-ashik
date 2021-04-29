import Login from './components/Login';
import SweepStake from './components/SweepStake';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
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
            <Route
              path="/components/ForgotPassword"
              component={ForgotPassword}
            />
            <Route path="/components/ResetPassword" component={ResetPassword} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
