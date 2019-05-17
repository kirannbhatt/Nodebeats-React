/**
 *
 * Testimonial
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
import makeSelectTestimonial, { makeDeleteResponse } from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  deleteTestimonial,
  fetchTestimonials,
  editTestimonial,
} from './actions';
import { ToastContainer, toast } from 'react-toastify';
import { push } from 'connected-react-router';
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

import TestimonialEditForm from '../TestimonialEditForm/Loadable';

/* eslint-disable react/prefer-stateless-function */
export class Testimonial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonialList: null,
    };
  }
  componentDidMount() {
    this.props.fetchTestimonial();
    const id =
      this.props.match && this.props.match.params.testimonial_id
        ? this.props.match.params.testimonial_id
        : null;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.testimonial !== this.props.testimonial) {
      const testimon = nextProps.testimonial.toJS();
      this.setState({
        testimonialList: testimon.dataList,
      });
    }
    if (
      nextProps.deleteResponse !== '' &&
      nextProps.deleteResponse !== this.props.deleteResponse
    ) {
      this.props.fetchTestimonial();
    }
  }
  addNewTestimonial = () => {
    this.props.redirect('/admin/testimonialform');
  };

  onEdit = id => {
    this.props.redirect(`/admin/testimonialform/${id}`);
  };
  onDelete = id => {
    this.props.deleteTestimonial(id);
  };
  render() {
    return (
      <div>
        <Helmet>
          <title>Testimonial</title>
          <meta name="description" content="Testimonial" />
        </Helmet>
        <ToastContainer />
        <Segment>
          <Button color="violet" onClick={this.addNewTestimonial}>
            Add New Testimonial
          </Button>
        </Segment>
        <Divider horizontal>Testimonial List </Divider>
        <Segment placeholder>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>S.N.</Table.HeaderCell>
                <Table.HeaderCell>personName</Table.HeaderCell>
                <Table.HeaderCell>testimonialContent</Table.HeaderCell>
                <Table.HeaderCell>organization</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.testimonialList &&
                this.state.testimonialList.length > 0 &&
                this.state.testimonialList.map((element, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{element.personName}</Table.Cell>
                    <Table.Cell>{element.testimonialContent}</Table.Cell>
                    <Table.Cell>{element.organization}</Table.Cell>
                    <Table.Cell>
                      <div className="ui two buttons">
                        <Button
                          basic
                          color="blue"
                          onClick={() => this.onEdit(element._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          basic
                          color="red"
                          onClick={() => this.onDelete(element._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

// Testimonial.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  testimonial: makeSelectTestimonial(),
  deleteResponse: makeDeleteResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTestimonial: () => dispatch(fetchTestimonials()),
    redirect: path => dispatch(push(path)),
    deleteTestimonial: test_id => dispatch(deleteTestimonial(test_id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'testimonial', reducer });
const withSaga = injectSaga({ key: 'testimonial', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Testimonial);
