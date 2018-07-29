import React from 'react';

class EventMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      homeOdds: {},
      drawOdds: {},
      awayOdds: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const { outcomes } = this.state;
    if (nextProps.outcomes !== outcomes) {
      this.storeOutcomes(nextProps.outcomes);
    }
  }

  storeOutcomes = (outcomes) => {
    outcomes.forEach((outcome) => {
      if (outcome.type === 'home') {
        this.setState({ homeOdds: outcome.price });
      } else if (outcome.type === 'draw') {
        this.setState({ drawOdds: outcome.price });
      } else if (outcome.type === 'away') {
        this.setState({ awayOdds: outcome.price });
      }
    });
  };

  render() {
    const { market, oddsDisplay } = this.props;
    let { homeOdds, drawOdds, awayOdds } = this.state;

    if (oddsDisplay === 'fraction') {
      homeOdds = `${homeOdds.den}/${homeOdds.num}`;
      drawOdds = `${drawOdds.den}/${drawOdds.num}`;
      awayOdds = `${awayOdds.den}/${awayOdds.num}`;
    } else {
      homeOdds = homeOdds.decimal;
      drawOdds = drawOdds.decimal;
      awayOdds = awayOdds.decimal;
    }

    return (
      <div className="event-details__markets">
        <div className="event-details__market">
          <div className="event-details__market-header">
            <span className="market">
              {market.name}
            </span>
          </div>
          <div className="event-details__market-details">
            <div className="event-details__market-detail home">
              Win
              <span className="odds">
                {homeOdds}
              </span>
            </div>
            <div className="event-details__market-detail draw">
              Draw
              <span className="odds">
                {drawOdds}
              </span>
            </div>
            <div className="event-details__market-detail away">
              Win
              <span className="odds">
                {awayOdds}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventMarket;
