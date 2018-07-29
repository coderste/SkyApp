import React from 'react';
import LinkedEvent from './LinkedEvent';
import OtherEvent from './OtherEvent';

class EventFooter extends React.Component {
  constructor(props) {
    super(props);

    const { linkedEventType, linkedEvents, otherEvents } = this.props;
    this.state = {
      linkedEventType,
      linkedEvents,
      otherEvents,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { linkedEvents, otherEvents } = this.state;
    if (nextProps.linkedEvents !== linkedEvents || nextProps.otherEvents !== otherEvents) {
      this.setState({
        linkedEvents: nextProps.linkedEvents,
        otherEvents: nextProps.otherEvents,
      });
    }
  }

  render() {
    const { linkedEventType, linkedEvents, otherEvents } = this.state;

    let linked;
    if (linkedEvents.length > 0) {
      linked = (
        <div className="event-details__linked">
          <div className="event-details__linked-title">
            <span className="title">
              Other Live events from
              {linkedEventType}
            </span>
          </div>
          {linkedEvents.map(linkedEvent => (
            <LinkedEvent id={linkedEvent.eventId} linkedEvent={linkedEvent} />
          ))}
        </div>
      );
    }

    let other;
    if (otherEvents.length > 0) {
      other = (
        <div className="event-details__others">
          <div className="event-details__others-title">
            <span className="title">
Other Live Events
            </span>
          </div>
          {otherEvents.map(otherEvent => (
            <OtherEvent id={otherEvent.eventId} otherEvent={otherEvent} />
          ))}
        </div>
      );
    }

    return (
      <div className="event-details__footer">
        {linked}
        {other}
      </div>
    );
  }
}

export default EventFooter;
