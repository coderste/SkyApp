import React from 'react';

import EventHeader from './EventInfo/EventHeader';
import EventMarket from './EventInfo/EventMarket';

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
    const {
      eventItem, home, away, scores, market, outcomes,
    } = this.state;

    let homePrefix = home.name;
    let awayPrefix = away.name;

    if (
      typeof homePrefix !== 'undefined'
      && typeof awayPrefix !== 'undefined'
      && homePrefix.substring(0, 3) !== awayPrefix.substring(0, 3)
    ) {
      homePrefix = homePrefix.substring(0, 3);
      awayPrefix = awayPrefix.substring(0, 3);
    } else if (typeof homePrefix !== 'undefined' && typeof awayPrefix !== 'undefined') {
      homePrefix = homePrefix.substring(0, 8);
      awayPrefix = awayPrefix.substring(0, 8);
    }

    return (
      <div className="event-details">
        <EventHeader
          home={home}
          away={away}
          homePrefix={homePrefix}
          awayPrefix={awayPrefix}
          eventItem={eventItem}
          scores={scores}
        />
        <EventMarket eventItem={eventItem} market={market} outcomes={outcomes} />
      </div>
    );
  }
}

export default EventDetails;
