import React from 'react';

const Header = ({ toggleOdds, odds }) => (
  <header className="site-header">
    <div className="container">
      <div className="site-header__row row">
        <div className="site-header__logo">
          <img className="image" src="/assets/images/skybet-mobile-logo.png" alt="Sky Bet Logo" />
        </div>
        <div className="site-header__controls">
          <button type="button" className="odds-toggle" onClick={toggleOdds}>
            Toggle Odds:
            {' '}
            {odds}
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
