import Login from './components/Login';
import SweepStake from './components/SweepStake';
import Reagister from './components/Register';

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
            <Route path="/components/Register" component={Reagister} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
