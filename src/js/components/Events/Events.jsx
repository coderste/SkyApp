import React from 'react';
import Event from './Event';

/* Store the event data and display them */
class Events extends React.Component {
  state = {
    events: [],
    markets: [],
    outcomes: [],
  };

  componentDidMount() {
    const { url } = this.props;
    // Fetch the data from the API
    this.fetchData(url);
  }

  componentWillReceiveProps(nextProps) {
    const { url } = this.props;
    if (url !== nextProps.url) {
      this.fetchData(url);
    }
  }

  fetchData = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => this.storeData(data)); // Store the data we received from the API
  };

  storeData = (data) => {
    const events = data.events.map((event) => {
      /* Only store the data we require */
      const {
        eventId,
        name,
        className,
        typeId,
        typeName,
        linkedEventTypeId,
        linkedEventTypeName,
        startTime,
        scores,
        competitors,
        status,
      } = event;

      return {
        eventId,
        name,
        className,
        typeId,
        typeName,
        linkedEventTypeId,
        linkedEventTypeName,
        startTime,
        scores,
        competitors,
        status,
      };
    });

    /* Get the markets and outcomes from the data */
    let { markets, outcomes } = data;

    /* Take the market and outcome object and store them as array's */
    markets = Object.keys(markets).map(key => markets[key]);
    outcomes = Object.keys(outcomes).map(key => outcomes[key]);

    markets = markets.map((market) => {
      const marketList = market.map((marketItem) => {
        /* Return only the data we require */
        const {
          marketId, eventId, name, type, status, liabilities,
        } = marketItem;

        return {
          marketId,
          eventId,
          name,
          type,
          status,
          liabilities,
        };
      });

      return marketList;
    });

    outcomes = outcomes.map((outcome) => {
      const outcomeList = outcome.map((outcomeItem) => {
        /* Return only the data we require */
        const {
          outcomeId, marketId, eventId, name, result, type, price, status,
        } = outcomeItem;

        return {
          outcomeId,
          marketId,
          eventId,
          name,
          result,
          type,
          price,
          status,
        };
      });

      return outcomeList;
    });

    this.setState({ events, markets, outcomes });
  };

  render() {
    const { events, outcomes } = this.state;
    const { oddsDisplay } = this.props;

    return (
      <section className="live-events">
        <div className="live-events__header">
          <h3 className="title">
Football
          </h3>
        </div>
        <div className="live-events__list">
          {events.map((event) => {
            const id = event.eventId;

            return (
              <Event
                key={id}
                event={event}
                outcome={outcomes.filter(outcome => outcome[0].eventId === id)}
                oddsDisplay={oddsDisplay}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default Events;
