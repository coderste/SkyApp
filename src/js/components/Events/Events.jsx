import React from 'react';

class Events extends React.Component {
  state = {
    events: [],
  };

  componentDidMount() {
    const { url } = this.props;
    this.storeEvents(url);
  }

  componentWillReceiveProps(nextProps) {
    const { url } = this.props;
    if (url !== nextProps.url) this.storeEvents(url);
  }

  storeEvents = (url) => {
    fetch(url)
      .then(response => response.json())
      .then((results) => {
        this.setState({ events: results.events });
      });
  };

  render() {
    const { events } = this.state;
    return (
      <ul className="list">
        {events.map(event => (
          <li key={event.eventId}>
            {event.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Events;
