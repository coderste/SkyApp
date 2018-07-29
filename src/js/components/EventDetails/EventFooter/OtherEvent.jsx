import React from 'react';

const OtherEvent = ({ otherEvent }) => (
  <div className="event-details__other">
    <div className="event-details__other-item">
      {otherEvent.name}
    </div>
  </div>
);

export default OtherEvent;
