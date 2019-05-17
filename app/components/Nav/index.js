/**
 *
 * Nav
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

class Nav extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.redirect('/login');
  };
  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name="home">
            <Link to="/dashboard/login">Dashboard</Link>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item name="logout" as="a" onClick={this.handleLogout} />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
Nav.propTypes = {};

const mapDispatchToProps = dispatch => ({
  redirect: path => dispatch(push(path)),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Nav);
