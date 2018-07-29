import React from 'react';
import { Link } from 'react-router-dom';

const OtherEvent = ({ otherEvent }) => (
  <Link className="event-details__other" to={`/football/live/${otherEvent.eventId}`}>
    <div className="event-details__other-name">
      {otherEvent.name}
    </div>
  </Link>
);

export default OtherEvent;
