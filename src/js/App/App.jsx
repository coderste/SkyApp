import React from 'react';
import { hot } from 'react-hot-loader';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Events from '../components/Events/Events';

class App extends React.Component {
  state = {
    url: 'http://localhost:8888/football/live',
  };

  render() {
    const { url } = this.state;

    return (
      <Router>
        <div className="site-wrap">
          <Switch>
            <Route exact path="/" render={props => <Events url={url} {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
