/**
 *
 * TestimonialForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTestimonialForm, {
  makeSelectTestimoialData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  addTestimonial,
  getTestimonialById,
  editTestimonialById,
} from './actions';

import { Segment, Form, Button } from 'semantic-ui-react';
/* eslint-disable react/prefer-stateless-function */
export class TestimonialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      testimonial: {
        personName: '',
        testimonialContent: '',
        organization: '',
      },
      imageName: null,
    };
  }

  componentDidMount() {
    const id =
      this.props.match && this.props.match.params.test_id
        ? this.props.match.params.test_id
        : null;
    if (id) this.props.dataRequest(id);
  }

  handleChange = e => {
    const testimonial = this.state.testimonial;
    const field = e.target.name;
    testimonial[field] = e.target.value;

    this.setState({
      testimonial,
    });
  };

  handleFileChange = e => {
    const file = e.target.files[0];
    this.setState({
      imageName: file,
    });
  };

  // validate = () => {
  //   const { testimonial } = this.state;
  //   let errors;
  //   if (!testimonial.personName) errors.personName = "Can't be blank";
  //   if (!testimonial.organization) errors.organization = "Can't be blank";

  //   if (!testimonial.testimonialContent)
  //     errors.testimonialContent = "Can't be blank";

  //   return errors;
  // };

  handleSubmit = e => {
    e.preventDefault();
    // let errors = this.validate();
    // this.setState({
    //   errors,
    // });
    // if (Object.keys(errors).length > 0)
    const id =
      this.props.match && this.props.match.params.test_id
        ? this.props.match.params.test_id
        : null;
    if (id) {
      this.props.editTestimonials(
        this.state.testimonial,
        this.state.imageName,
        id,
      );
    } else {
      this.props.addTestimonials(this.state.testimonial);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.testimonialData !== this.props.testimonialData) {
      const testiData = nextProps.testimonialData.toJS();
      this.setState({
        testimonial: {
          personName: testiData.personName,
          testimonialContent: testiData.testimonialContent,
          organization: testiData.organization,
        },
      });
    }
  }

  render() {
    // const { errors } = this.state;
    return (
      <div>
        <Helmet>
          <title>TestimonialForm</title>
          <meta name="description" content="Description of TestimonialForm" />
        </Helmet>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              fluid
              placeholder="Person Name"
              name="personName"
              onChange={this.handleChange}
              value={this.state.testimonial.personName}
            />

            <Form.Input
              fluid
              placeholder="Testimonial Content"
              name="testimonialContent"
              onChange={this.handleChange}
              value={this.state.testimonial.testimonialContent}
            />

            <Form.Input
              fluid
              placeholder="Organization"
              name="organization"
              onChange={this.handleChange}
              value={this.state.testimonial.organization}
            />
            <Form.Input
              fluid
              type="file"
              name="imageName"
              onChange={this.handleFileChange}
            />
            <Button type="submit" color="olive">
              Submit
            </Button>
          </Form>
        </Segment>{' '}
      </div>
    );
  }
}

// TestimonialForm.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  testimonialForm: makeSelectTestimonialForm(),
  testimonialData: makeSelectTestimoialData(),
});

function mapDispatchToProps(dispatch) {
  return {
    addTestimonials: testimonialData =>
      dispatch(addTestimonial(testimonialData)),
    dataRequest: id => dispatch(getTestimonialById(id)),
    editTestimonials: (newData, image, id) =>
      dispatch(editTestimonialById(newData, image, id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'testimonialForm', reducer });
const withSaga = injectSaga({ key: 'testimonialForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TestimonialForm);
