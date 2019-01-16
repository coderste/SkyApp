import React from 'react';

import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.settings = React.createRef();
  }

  openSettings = event => {
    const { target } = event;
    const setting = this.settings.current;

    const { offsetLeft, offsetTop } = target;
    setting.style.left = `${offsetLeft + 6}px`;
    setting.style.top = `${offsetTop + 30}px`;

    if (setting.classList.contains('open')) {
      setting.style.display = 'none';
      setting.classList.remove('open');
    } else {
      setting.style.display = 'block';
      setting.classList.add('open');
    }
  };

  toggleOdds = event => {
    const { target } = event;
    const { toggleOdds } = this.props;

    if (!target.classList.contains('fractions')) {
      target.classList.remove('decimals');
      target.classList.add('fractions');
    } else {
      target.classList.remove('fractions');
      target.classList.add('decimals');
    }

    toggleOdds();
  };

  render() {
    const { odds } = this.props;

    let oddsText;
    if (odds !== 'fraction') {
      oddsText = 'fraction';
    } else {
      oddsText = 'decimal';
    }

    return (
      <header className="site-header">
        <div className="container">
          <div className="site-header__row row">
            <div className="site-header__logo">
              <Link to="/">
                <img
                  className="image"
                  src="/assets/images/skybet-mobile-logo.png"
                  alt="Sky Bet Logo"
                />
              </Link>
            </div>
            <div className="site-header__controls">
              <button type="button" className="odds-toggle" onClick={eve => this.openSettings(eve)}>
                <i className="far fa-cog" />
              </button>
              <div ref={this.settings} className="odds-toggle__overlay" style={{ display: 'none' }}>
                <button
                  type="button"
                  className="odds-toggle fractions"
                  onClick={eve => this.toggleOdds(eve)}
                >
                  {oddsText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
