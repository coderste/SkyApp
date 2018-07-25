import React from 'react';
import EventMarkets from './Event/EventMarkets';
// import { Link } from 'react-router-dom';

const Event = ({ event, outcome, oddsDisplay }) => {
  const outcomeItem = outcome.map(item => item);

  return (
    <div className="event-item">
      <div className="row">
        <div className="event-item__live">
          <span className="badge">
Live
          </span>
        </div>
        <div className="event-item__teams">
          {event.name}
        </div>
        <div className="event-item__markets">
          {outcomeItem.map((items) => {
            const outcomeEvent = items.map(item => (
              <EventMarkets
                key={item.outcomeId}
                team={item.type}
                odds={item.price}
                oddsDisplay={oddsDisplay}
              />
            ));

            return outcomeEvent;
          })}
        </div>
      </div>
    </div>
  );
};

export default Event;
