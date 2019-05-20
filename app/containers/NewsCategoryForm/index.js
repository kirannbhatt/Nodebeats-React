/**
 *
 * NewsCategoryForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNewsCategoryForm, {
  makeSelectGeyNewsCategoryById,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Segment, Form, Button, Checkbox } from 'semantic-ui-react';
import { addCategory, getCategoryById, editCategory } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class NewsCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        categoryName: '',
        categoryDescription: '',
        urlSlogCategory: '',
      },
      active: true,
    };
  }

  componentDidMount() {
    const id =
      this.props.match.params && this.props.match.params.edit_id
        ? this.props.match.params.edit_id
        : null;
    id ? this.props.getCategoryById(id) : null;
  }

  handleChange = e => {
    const category = this.state.category;
    const field = e.target.name;
    category[field] = e.target.value;

    this.setState({
      category,
    });
  };
  toggleChange = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const id =
      this.props.match.params && this.props.match.params.edit_id
        ? this.props.match.params.edit_id
        : null;
    const categoryDatas = {
      categoryName: this.state.category.categoryName,
      categoryDescription: this.state.category.categoryDescription,
      urlSlogCategory: this.state.category.urlSlogCategory,
      active: this.state.active,
    };
    id
      ? this.props.editCategory(categoryDatas, id)
      : this.props.addCategory(categoryDatas);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryById !== this.props.categoryById) {
      const categoryData = nextProps.categoryById.toJS();
      this.setState({
        category: {
          categoryName: categoryData.categoryName,
          categoryDescription: categoryData.categoryDescription,
          urlSlogCategory: categoryData.urlSlogCategory,
        },
        active: categoryData.active,
      });
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>NewsCategoryForm</title>
          <meta name="description" content="Description of NewsCategoryForm" />
        </Helmet>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="Category"
              name="categoryName"
              onChange={this.handleChange}
              value={this.state.category.categoryName}
            />
            <Form.TextArea
              placeholder="Category Description"
              name="categoryDescription"
              onChange={this.handleChange}
              value={this.state.category.categoryDescription}
            />
            <Form.Input
              placeholder="Url Slog"
              name="urlSlogCategory"
              onChange={this.handleChange}
              value={this.state.category.urlSlogCategory}
            />
            <Checkbox
              onChange={this.toggleChange}
              name="active"
              label="Active"
              checked={this.state.active}
            />
            <br />
            <Button type="submit" color="olive">
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  newsCategoryForm: makeSelectNewsCategoryForm(),
  categoryById: makeSelectGeyNewsCategoryById(),
});

const mapDispatchToProps = dispatch => {
  return {
    addCategory: catData => dispatch(addCategory(catData)),
    getCategoryById: id => dispatch(getCategoryById(id)),
    editCategory: (data, id) => dispatch(editCategory(data, id)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'newsCategoryForm', reducer });
const withSaga = injectSaga({ key: 'newsCategoryForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsCategoryForm);
