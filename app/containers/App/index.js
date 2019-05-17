/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { createStructuredSelector } from 'reselect';
import { loginByTokenRequest } from 'containers/Login/actions';
import GlobalStyle from '../../global-styles';
import Route from './Routes';
import {
  makeSelectLoading,
  makeSelectLocation,
  makeSelectError,
  makeSelectUser,
  makeSelectDialog,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  // loading: makeSelectLoading(),
  location: makeSelectLocation(),
  // error: makeSelectError(),
  user: makeSelectUser(),
  // dialog: makeSelectDialog(),
});

const mapDispatchToProps = dispatch => ({
  // loadInitialData: () => dispatch(initializeRequest()),
  loginByTokenRequest: userId => dispatch(loginByTokenRequest(userId)),
});

class App extends React.Component {
  static propTypes = {
    // loadInitialData: PropTypes.func.isRequired,
    loginByTokenRequest: PropTypes.func.isRequired,
    // loading: PropTypes.number.isRequired,
  };
  state = {
    ownDashboard: true,
  };

  componentWillMount() {
    // this.props.loadInitialData();
    // todo move this to initialize saga
    const token =
      this.props.location.pathname.split('/')[1] === 'admin'
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token')
        ? sessionStorage.getItem('token')
        : localStorage.getItem('token');
    if (token && token === sessionStorage.getItem('token')) {
      this.setState({ ownDashboard: false });
    }
    try {
      const decoded = jwtDecode(token);
      if (
        typeof decoded === 'object' &&
        decoded.hasOwnProperty('user') &&
        decoded.hasOwnProperty('exp') &&
        decoded.exp > Date.now() / 1000
      ) {
        // if (decoded.user._id) this.props.loginByTokenRequest(decoded.user._id);
      }
    } catch (error) {}
  }

  render() {
    return (
      <div>
        <Route location={this.props.location} />
        <GlobalStyle />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
