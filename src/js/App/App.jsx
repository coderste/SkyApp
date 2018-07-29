import React from 'react';
import { hot } from 'react-hot-loader';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Events from '../components/Events/Events';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import EventDetails from '../components/EventDetails/EventDetails';

class App extends React.Component {
  state = {
    url: 'http://localhost:8888/football/live?primaryMarkets=true',
    odds: 'fraction',
  };

  /* Toggle whether the odds are decimal or fraction based */
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
                <Route
                  path="/football/live/:eventId"
                  render={props => <EventDetails oddsDisplay={odds} url={url} {...props} />}
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
