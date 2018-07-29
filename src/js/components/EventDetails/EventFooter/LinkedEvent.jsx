import React from 'react';
import { Link } from 'react-router-dom';

const LinkedEvent = ({ linkedEvent }) => (
  <Link className="event-details__linked" to={`/football/live/${linkedEvent.eventId}`}>
    <div className="event-details__linked-name">
      {linkedEvent.name}
    </div>
  </Link>
);

export default LinkedEvent;
