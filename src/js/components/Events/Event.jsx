import React from 'react';
import { Link } from 'react-router-dom';
import EventMarkets from './Event/EventMarkets';

const Event = ({ event, outcome, oddsDisplay }) => {
  const outcomeItem = outcome.map(item => item);
  const { name, status } = event;
  let liveGame;
  if (status.live) {
    liveGame = 'Live';
  } else {
    liveGame = '';
  }

  return (
    <div className="event-item">
      <div className="row">
        <Link className="event-item__link" to={`/football/live/${event.eventId}`}>
          <div className="event-item__live">
            <span className="badge">
              {liveGame}
            </span>
          </div>
          <div className="event-item__teams">
            {name}
          </div>
        </Link>
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
