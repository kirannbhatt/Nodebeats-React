import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import jwtDecode from 'jwt-decode';
import { makeSelectUser, makeSelectLocation } from '../App/selectors';
import AdminRoutes from './Routes';
import { push } from 'connected-react-router';
import { Segment } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import LogIn from 'containers/LogIn/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SideBar from 'components/SideBar';
import Testimonial from 'containers/Testimonial/Loadable';
import Nav from 'components/Nav';
import TestimonialForm from 'containers/TestimonialForm/Loadable';
import TestimonialEditForm from 'containers/TestimonialEditForm/Loadable';
import Blog from 'containers/Blog/Loadable';
import Newss from 'containers/Newss/Loadable';
import NewsForm from 'containers/NewsForm/Loadable';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  // user: makeSelectUser()
});

const mapDispatchToProps = dispatch => ({
  // logout: () => dispatch(logoutRequest()),
  // clearDistributorState: () => dispatch(clearAllStates()),
  navigateToProfilePage: () => dispatch(push('/admin/dashboard/profile')),
  redirect: path => dispatch(push(path)),
});

class AdminDashboard extends React.Component {
  componentWillMount() {}

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.redirect('/login');
    }
  }

  render() {
    return (
      <div>
        <style>
          {`
          #outer-container {
            display: table;
            width: 100%;
            height: 100%;margin: 5px;
          }
          #sidebar {
            display: table-cell;
            width: 20%;
            vertical-align: top;
            height: 100vh;
            padding: 5px;
            padding-top: 15px;
          }

          #content {
            display: table-cell;
            width: 80%;
            vertical-aestimoniallign: top;
            padding: 5px;
          }
        `}
        </style>
        <div id="outer-container">
          <div id="sidebar">
            <SideBar />
          </div>
          <div id="content">
            <Nav />

            <Segment>
              <Switch>
                <Route path="/admin/login" component={LogIn} />
                <Route path="/admin/testimonial" component={Testimonial} />
                <Route
                  exact
                  path="/admin/testimonialform"
                  component={TestimonialForm}
                />
                <Route
                  path="/admin/testimonialform/:test_id"
                  component={TestimonialForm}
                />
                <Route path="/admin/blog" component={Blog} />
                <Route path="/admin/news" component={Newss} />
                <Route exact path="/admin/newsform" component={NewsForm} />
                <Route path="/admin/newsform/:edit_id" component={NewsForm} />

                <Route component={NotFoundPage} />
              </Switch>
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AdminDashboard),
);
