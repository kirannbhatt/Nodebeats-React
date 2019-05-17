/**
 *
 * Blog
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
import makeSelectBlog from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  Form,
  Icon,
  Grid,
  Button,
  Segment,
  Divider,
  Card,
  Table,
} from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
export class Blog extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Blog</title>
          <meta name="description" content="Description of Blog" />
        </Helmet>
        <Segment>
          <Button color="violet">Add Blog</Button>
        </Segment>
        <Divider horizontal>Blog List</Divider>
        <Segment>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>S.N.</Table.HeaderCell>
                <Table.HeaderCell>Blog Title</Table.HeaderCell>
                <Table.HeaderCell>Blog Summary</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>Codementor</Table.Cell>
                <Table.Cell>Summary</Table.Cell>
                <Table.Cell>Kiran Bhatt</Table.Cell>
                <Table.Cell>
                  <div className="ui two buttons">
                    <Button basic color="blue">
                      Edit
                    </Button>
                    <Button basic color="red">
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

Blog.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
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

const withReducer = injectReducer({ key: 'blog', reducer });
const withSaga = injectSaga({ key: 'blog', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Blog);
