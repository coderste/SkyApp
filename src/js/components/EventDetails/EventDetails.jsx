import React from 'react';

import EventHeader from './EventInfo/EventHeader';
import EventMarket from './EventInfo/EventMarket';
import EventFooter from './EventFooter/EventFooter';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    let { eventId } = match.params;
    const oldId = eventId;
    eventId = Number(eventId);

    this.state = {
      eventId,
      eventItem: {},
      market: {},
      outcomes: [],
      home: '',
      away: '',
      scores: '',
      otherEvents: [],
      otherLinkedEvents: [],
      oldId,
    };
  }

  componentDidMount() {
    const { url } = this.props;
    this.fetchData(url);
  }

  componentWillReceiveProps(nextProps) {
    const { url } = this.props;
    const { oldId } = this.state;

    if (url !== nextProps.url || oldId !== nextProps.match.params.eventId) {
      const { match } = nextProps;
      let { eventId } = match.params;
      eventId = Number(eventId);

      this.setState({
        eventId,
        oldId: eventId,
      });

      this.fetchData(url);
    }
  }

  fetchData = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(results => this.storeData(results));
  };

  storeData = (results) => {
    const { eventId } = this.state;
    const { events, markets, outcomes } = results;

    // Store this event in an object for easy accessibility
    let eventItem = {};
    const otherEvents = [];
    const otherLinkedEvents = [];

    events.forEach((item) => {
      if (item.eventId === eventId) {
        eventItem = item;
      }
    });

    events.forEach((item) => {
      if (
        item.linkedEventTypeName === eventItem.linkedEventTypeName
        && item.eventId !== eventId
        && typeof item.linkedEventTypeName !== 'undefined'
      ) {
        otherLinkedEvents.push(item);
      } else if (
        item.eventId !== eventId
        && item.linkedEventTypeName
          !== (eventItem.linkedEventTypeName || typeof item.linkedEventTypeName === 'undefined')
      ) {
        otherEvents.push(item);
      }
    });

    // Store the scores of this event
    const { scores } = eventItem;

    // Store the full-time result market in an object
    let market = {};
    Object.keys(markets).map(key => markets[key].forEach((item) => {
      if (item.eventId === eventId) {
        market = item;
      }
    }));

    // Store the outcomes
    const outcome = [];
    Object.keys(outcomes).map(key => outcomes[key].forEach((item) => {
      if (item.marketId === market.marketId) {
        outcome.push(item);
      }
    }));

    // Store the home and away team in an object
    let home = {};
    let away = {};
    eventItem.competitors.forEach((competitor) => {
      if (competitor.position === 'home') {
        home = competitor;
      } else {
        away = competitor;
      }
    });

    this.setState({
      eventItem,
      market,
      outcomes: outcome,
      home,
      away,
      scores,
      otherEvents,
      otherLinkedEvents,
    });
  };

  render() {
    const {
      eventItem,
      home,
      away,
      scores,
      market,
      outcomes,
      otherEvents,
      otherLinkedEvents,
    } = this.state;

    const { oddsDisplay } = this.props;
    const { history } = this.props;

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
        <EventMarket
          oddsDisplay={oddsDisplay}
          eventItem={eventItem}
          market={market}
          outcomes={outcomes}
        />
        <EventFooter
          history={history}
          linkedEventType={eventItem.linkedEventTypeName}
          linkedEvents={otherLinkedEvents}
          otherEvents={otherEvents}
        />
      </div>
    );
  }
}

export default EventDetails;
