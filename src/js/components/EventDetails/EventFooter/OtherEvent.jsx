import React from 'react';
import { Link } from 'react-router-dom';

const OtherEvent = ({ otherEvent }) => (
  <Link to={`/football/live/${otherEvent.eventId}`}>
    <div className="event-details__other">
      <div className="event-details__other-item">
        {otherEvent.name}
      </div>
    </div>
  </Link>
);

export default OtherEvent;
