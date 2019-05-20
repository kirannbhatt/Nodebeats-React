/**
 *
 * NewsCategory
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
import makeSelectNewsCategory, {
  makeSelectDeleteNewsCategory,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { push } from 'connected-react-router';
import { getNewsCategory, deleteNewsCategory } from './actions';
import { Segment, Table, Button, Divider } from 'semantic-ui-react';
/* eslint-disable react/prefer-stateless-function */
export class NewsCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCategory: null,
    };
  }
  componentDidMount() {
    this.props.getCategory();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newsCategory !== this.props.newsCategory) {
      const newsCategory = nextProps.newsCategory.toJS();
      console.log(newsCategory);
      this.setState({
        newsCategory: newsCategory,
      });
    }
    if (
      (nextProps.deleteResponse !== '') &
      (nextProps.deleteResponse !== this.props.deleteResponse)
    ) {
      this.props.getCategory();
    }
  }
  addNewTestimonial = () => {
    this.props.redirect('/admin/newscategoryform');
  };
  onDelete = id => {
    this.props.deleteNewsCategory(id);
  };
  onEdit = id => {
    this.props.redirect(`/admin/newscategoryform/${id}`);
  };
  render() {
    return (
      <div>
        <Helmet>
          <title>NewsCategory</title>
          <meta name="description" content="Description of NewsCategory" />
        </Helmet>
        <Segment>
          <Button color="violet" onClick={this.addNewTestimonial}>
            Add New News Category
          </Button>
        </Segment>
        <Divider horizontal>News Category </Divider>
        <Segment placeholder>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>S.N.</Table.HeaderCell>
                <Table.HeaderCell>Category Name</Table.HeaderCell>
                <Table.HeaderCell>Category Description</Table.HeaderCell>
                <Table.HeaderCell>Url Slog Category</Table.HeaderCell>
                <Table.HeaderCell>Active</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.newsCategory &&
                this.state.newsCategory.length > 0 &&
                this.state.newsCategory.map((element, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{element.categoryName}</Table.Cell>
                    <Table.Cell>{element.categoryDescription}</Table.Cell>
                    <Table.Cell>{element.urlSlogCategory}</Table.Cell>
                    <Table.Cell>{element.active}</Table.Cell>

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

// NewsCategory.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  newsCategory: makeSelectNewsCategory(),
  deleteResponse: makeSelectDeleteNewsCategory(),
});

const mapDispatchToProps = dispatch => ({
  getCategory: () => dispatch(getNewsCategory()),
  redirect: path => dispatch(push(path)),
  deleteNewsCategory: id => dispatch(deleteNewsCategory(id)),
});

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
