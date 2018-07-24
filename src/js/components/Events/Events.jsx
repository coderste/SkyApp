import React from 'react';
import Event from './Event';

class Events extends React.Component {
  state = {
    events: [],
    markets: [],
    outcomes: [],
  };

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
      .then(data => this.storeData(data));
  };

  storeData = (data) => {
    const events = data.events.map((event) => {
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

    const { markets, outcomes } = data;

    this.setState({ events, markets, outcomes });
  };

  render() {
    const { events, markets } = this.state;

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
            return <Event key={id} event={event} />;
          })}
        </div>
      </section>
    );
  }
}

export default Events;
