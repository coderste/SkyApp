import React from 'react';

const EventMarkets = ({ team, odds, oddsDisplay }) => {
  let oddValue;
  let teamValue;

  if (oddsDisplay === 'fraction') {
    oddValue = `${odds.den}/${odds.num}`;
  } else {
    oddValue = `${odds.decimal}`;
  }

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
