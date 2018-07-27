import React from 'react';
import moment from 'moment';

const EventHeader = ({
  eventItem, home, away, homePrefix, awayPrefix, scores,
}) => {
  const startTime = moment(eventItem.startTime).format('dddd Do MMMM YYYY h:mm');
  return (
    <div className="event-details__header">
      <div className="event-details__wrap event-details__wrap--center">
        <div className="event-details__teams">
          <span className="title">
            {home.name}
            &nbsp; v &nbsp;
            {away.name}
          </span>
        </div>
        <div className="event-details__type">
          <span className="type">
            {eventItem.linkedEventTypeName}
          </span>
        </div>
        <div className="event-details__time">
          <span className="start-time">
            {startTime}
          </span>
        </div>
      </div>
      <div className="event-details__wrap">
        <div className="event-details__score">
          <div className="event-details__score-title home">
            {homePrefix}
          </div>
          <div className="event-details__score-home event-details__scoreboard">
            {scores.home}
          </div>
          <div className="event-details__scoreboard-sep" />
          <div className="event-details__score-away event-details__scoreboard">
            {scores.away}
          </div>
          <div className="event-details__score-title away">
            {awayPrefix}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
