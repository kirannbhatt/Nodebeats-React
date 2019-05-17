/**
 *
 * NewsCategory
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
import makeSelectNewsCategory from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class NewsCategory extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>NewsCategory</title>
          <meta name="description" content="Description of NewsCategory" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

NewsCategory.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newsCategory: makeSelectNewsCategory(),
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

const withReducer = injectReducer({ key: 'newsCategory', reducer });
const withSaga = injectSaga({ key: 'newsCategory', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsCategory);
