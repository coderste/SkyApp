import React from 'react';
import { hot } from 'react-hot-loader';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Events from '../components/Events/Events';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

class App extends React.Component {
  state = {
    url: 'http://localhost:8888/football/live?primaryMarkets=true',
    odds: 'fraction',
  };

  toggleOdds = () => {
    const { odds } = this.state;

    if (odds === 'fraction') {
      this.setState({
        odds: 'decimal',
      });
    } else {
      this.setState({
        odds: 'fraction',
      });
    }
  };

  render() {
    const { url, odds } = this.state;

    return (
      <Router>
        <div className="site-wrap">
          <Header toggleOdds={this.toggleOdds} odds={odds} />
          <div className="site-wrap__container">
            <Sidebar />
            <div className="site-wrap__content">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Events oddsDisplay={odds} url={url} {...props} />}
                />
              </Switch>
            </div>
            <Sidebar />
          </div>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
