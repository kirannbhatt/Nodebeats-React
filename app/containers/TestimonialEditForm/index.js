/**
 *
 * TestimonialEditForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTestimonialEditForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class TestimonialEditForm extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Edit Testimonial</title>
          <meta
            name="description"
            content="Description of TestimonialEditForm"
          />
        </Helmet>
        <h1> Hello there</h1>
      </div>
    );
  }
}

TestimonialEditForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  testimonialEditForm: makeSelectTestimonialEditForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'testimonialEditForm', reducer });
const withSaga = injectSaga({ key: 'testimonialEditForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TestimonialEditForm);
