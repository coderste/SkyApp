import React from 'react';

const EventDetails = ({ match }) => (
  <h2>
    Hello, World
    {match.params.eventId}
  </h2>
);

export default EventDetails;
