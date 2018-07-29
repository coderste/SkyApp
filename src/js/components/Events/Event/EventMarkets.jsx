import React from 'react';

/* Show the event markets */
const EventMarkets = ({ team, odds, oddsDisplay }) => {
  let oddValue;
  let teamValue;

  // Odds value
  if (oddsDisplay === 'fraction') {
    oddValue = `${odds.den}/${odds.num}`;
  } else {
    oddValue = `${odds.decimal}`;
  }

  /**
   * Only show the home or away label
   *
   */
  if (team !== 'draw') {
    teamValue = (
      <span className="team">
        {team}
      </span>
    );
  }

  return (
    <div className="event-item__market event-item__market--win">
      <span className="team">
        {teamValue}
      </span>
      {team}
      <span className="odds">
        {oddValue}
      </span>
    </div>
  );
};

export default EventMarkets;
