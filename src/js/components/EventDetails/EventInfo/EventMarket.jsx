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
    const { market } = this.props;
    const { homeOdds, drawOdds, awayOdds } = this.state;

    return (
      <div className="event-details__markets">
        <div className="event-details__market">
          <div className="event-details__market-header">
            <span className="market">
              {market.name}
            </span>
          </div>
          <div className="event-details__market-details">
            <div className="event-details__maret-details-home">
              {homeOdds.decimal}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventMarket;
