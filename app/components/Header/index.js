import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import logoImg from 'assets/img/logo.png';
import messages from './messages';
import {
  makeSelectLocation,
  makeSelectHeaderShade,
} from '../../containers/App/selectors';
import LocaleToggle from '../../containers/LocaleToggle';
import { Container, Icon } from 'semantic-ui-react';
import logo from '../../assets/image/xcelpay.png';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    // isHeaderShaded: PropTypes.bool.isRequired,
  };
  state = {
    chkbox: false,
  };
  handleChangeChk = () =>
    this.setState({
      chkbox: !this.state.chkbox,
    });
  handleScrollView = el => {
    if (document.getElementById(el))
      document.getElementById(el).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  };
  handleScrollView = el => {
    if (document.getElementById(el))
      document.getElementById(el).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  };
  render() {
    const { chkbox } = this.state;
    const { location, isHeaderShaded } = this.props;
    const isAdminDashboard = location.pathname.split('/')[1] === 'admin';
    if (isAdminDashboard) return null;
    return (
      <Container>
        <div className="header">
          <div className="d-flex">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <input className="input-opener" htmlFor="opener" type="checkbox" />
            <label id="opener" className="opener" />
            <div className="menu d-flex ml-auto">
              {/*<div className="menu-list">*/}
              {/*<Link to="/about">About</Link>*/} {/*</div>*/}
              <div className="menu-list">
                <Link
                  to="/#about"
                  onClick={() => this.handleScrollView('about')}
                >
                  About
                </Link>
              </div>
              {/* <div className="menu-list">
                          <a href=""> Usecases </a>
                        </div> */}
              {/*<div className="menu-list">*/}
              {/*<Link to="/how-it-works">How it works</Link>*/} {/*</div>*/}
              <div className="menu-list">
                <Link
                  to="/#how-it-works"
                  onClick={() => this.handleScrollView('how-it-works')}
                >
                  How it works
                </Link>
              </div>
              {/*<div className="menu-list">*/}
              {/*<Link to="/xcelpay-wallet">XcelPay Wallet</Link>*/}
              {/*</div>*/}
              <div className="menu-list">
                <Link
                  to="/#xcelpay-wallet"
                  onClick={() => this.handleScrollView('xcelpay-wallet')}
                >
                  XcelPay Wallet
                </Link>
              </div>
              <div className="menu-list">
                <Link to="/faqs"> FAQs </Link>
              </div>
              <div className="menu-list">
                <Link to="/support"> Support </Link>
              </div>
              {/* <LocaleToggle /> */}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  // isHeaderShaded: makeSelectHeaderShade(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Header);
