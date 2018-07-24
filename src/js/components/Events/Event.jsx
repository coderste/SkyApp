import React from 'react';
// import { Link } from 'react-router-dom';

const Event = ({ event }) => (
  <div className="event-item">
    <div className="row">
      <div className="event-item__live">
        <span className="badge">
          {event.status.live ? 'live' : ''}
        </span>
      </div>
      <div className="event-item__teams">
        {event.name}
      </div>
      <div className="event-iteam__markets">
        {/* <Link to={} /> */}
      </div>
    </div>
  </div>
);

export default Event;
