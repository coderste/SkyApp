import React from 'react';
import { Link } from 'react-router-dom';
import EventMarkets from './Event/EventMarkets';

const Event = ({ event, outcome, oddsDisplay }) => {
  // The outcome results for this event
  const outcomeItem = outcome.map(item => item);

  // Name of the event and the status (live or not)
  const { name, status } = event;

  /**
   * If the game is live
   * store the liveBadge value
   */
  let liveBadge;
  if (status.live) {
    liveBadge = 'Live';
  } else {
    liveBadge = '';
  }

  return (
    <div className="event-item">
      <div className="row">
        <Link className="event-item__link" to={`/football/live/${event.eventId}`}>
          <div className="event-item__live">
            <span className="badge">
              {liveBadge}
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
