/**
 *
 * LogIn
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogIn, { makeSelectPath } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { fetchLogin } from './actions';

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
export class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: 'superadmin',
        password: 'superadmin@123',
      },
    };
  }
  handleChange = e => {
    const user = this.state.user;
    const field = e.target.name;
    user[field] = e.target.value;

    this.setState({
      user,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.user);
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.redirect('/admin');
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.logIn !== this.props.logIn) {
  //     this.props.redirect(nextProps.loginRedirect);
  //   }
  // }

  render() {
    return (
      <div>
        <Helmet>
          <title>LogIn</title>
          <meta name="description" content="Description of LogIn" />
        </Helmet>
        <div className="login-form">
          <style>
            {`tyo xodnu na
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}
          </style>
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Log-in to your account
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.user.username}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="text"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.user.password}
                  />

                  <Button color="teal" fluid size="large">
                    Login
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  logIn: makeSelectLogIn(),
  loginRedirect: makeSelectPath(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: user => dispatch(fetchLogin(user)),
    redirect: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'logIn', reducer });
const withSaga = injectSaga({ key: 'logIn', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LogIn);
