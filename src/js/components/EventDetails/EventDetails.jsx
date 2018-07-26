import React from 'react';

import moment from 'moment';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    let { eventId } = match.params;
    eventId = Number(eventId);

    this.state = {
      eventId,
      eventItem: {},
      market: {},
      outcomes: [],
      home: '',
      away: '',
      scores: '',
    };
  }

  componentDidMount() {
    const { url } = this.props;
    this.fetchData(url);
  }

  componentWillReceiveProps(nextProps) {
    const { url } = this.props;
    if (url !== nextProps.url) this.fetchData(url);
  }

  fetchData = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(results => this.storeData(results));
  };

  storeData = (results) => {
    const { eventId } = this.state;
    const { events, markets, outcomes } = results;

    let eventItem = {};
    events.forEach((item) => {
      if (item.eventId === eventId) {
        eventItem = item;
      }
    });

    let market = {};
    Object.keys(markets).map(key => markets[key].forEach((item) => {
      if (item.eventId === eventId) {
        market = item;
      }
    }));

    const outcome = [];
    Object.keys(outcomes).map(key => outcomes[key].forEach((item) => {
      if (item.marketId === market.marketId) {
        outcome.push(item);
      }
    }));

    let home = {};
    let away = {};
    eventItem.competitors.forEach((competitor) => {
      if (competitor.position === 'home') {
        home = competitor;
      } else {
        away = competitor;
      }
    });

    const { scores } = eventItem;

    this.setState({
      eventItem,
      market,
      outcomes: outcome,
      home,
      away,
      scores,
    });
  };

  render() {
    const { eventItem, home, away } = this.state;
    const startTime = moment(eventItem.startTime).format('dddd Do MMMM YYYY h:mm');

    return (
      <div className="event-details">
        <div className="event-details__header">
          <div className="event-details__teams">
            <span className="title home">
              {home.name}
            </span>
            <span className="title vs">
v
            </span>
            <span className="title away">
              {away.name}
            </span>
          </div>
          <div className="event-details__type">
            <span className="type">
              {eventItem.linkedEventTypeName}
            </span>
          </div>
          <div className="event-details__time">
            <span className="start-time">
              {startTime}
            </span>
          </div>
        </div>
        <div className="event-details__score">
          <div className="event-details__score-title" />
          <div className="event-details__score-home event-details__scoreboard">
            {/* {scores.home} */}
          </div>
          <div className="event-details__score-away event-details__scoreboard">
            {/* {scores.away} */}
          </div>
          <div className="event-details__score-title" />
        </div>
      </div>
    );
  }
}

export default EventDetails;
