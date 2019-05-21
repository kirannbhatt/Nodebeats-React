/**
 *
 * NewsForm
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
import makeSelectNewsForm, {
  makeSelectNewsById,
  makeSelectNewsCategory,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { addNews, getNewsById, editNews, getNewsCategory } from './actions';
import { Segment, Form, Button, Select } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
export class NewsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {
        newsTitle: '',
        newsDescription: '',
        newsAuthor: '',
        newsDate: new Date(),
        categoryID: '',
        // categoryName: ''
        // category: null,
      },
      imageName: null,
      // categoryID: null,
    };
  }

  componentDidMount() {
    const id =
      this.props.match && this.props.match.params.edit_id
        ? this.props.match.params.edit_id
        : null;
    id ? this.props.getNewsById(id) : null;
    this.props.getNewsCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.news !== this.props.news) {
      const newsData = nextProps.news.toJS();
      this.setState({
        news: {
          newsTitle: newsData.newsTitle,
          newsDescription: newsData.newsDescription,
          newsAuthor: newsData.newsAuthor,
          newsDate: new Date(),
          categoryID: newsData.categoryID,
        },
      });
    }
    if (nextProps.category !== this.props.category) {
      const categories = nextProps.category.toJS();
      this.setState({
        category: categories,
      });
    }
  }

  handleChange = e => {
    const news = this.state.news;
    const field = e.target.name;
    news[field] = e.target.value;

    this.setState({
      news,
    });
  };
  handleSelectChange = (e, { value }) => {
    this.setState({
      news: {
        ...this.state.news,
        categoryID: value,
      },
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const id =
      this.props.match && this.props.match.params.edit_id
        ? this.props.match.params.edit_id
        : null;
    if (id) {
      this.props.editNews(this.state.news, id);
    } else {
      this.props.addNews(this.state.news);
    }
  };

  render() {
    const options = [];
    if (this.state.category) {
      this.state.category.map((element, index) => {
        options.push({
          key: element.categoryName,
          text: element.categoryName,
          value: element._id,
        });
      });
    }
    return (
      <div>
        <Helmet>
          <title>NewsForm</title>
          <meta name="description" content="Description of NewsForm" />
        </Helmet>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="News Title"
              name="newsTitle"
              onChange={this.handleChange}
              value={this.state.news.newsTitle}
            />

            <Form.TextArea
              placeholder="News Description"
              name="newsDescription"
              onChange={this.handleChange}
              value={this.state.news.newsDescription}
            />

            <Form.Input
              placeholder="News Author"
              name="newsAuthor"
              onChange={this.handleChange}
              value={this.state.news.newsAuthor}
            />
            <Select
              name="categoryID"
              placeholder="select category"
              options={options}
              onChange={this.handleSelectChange}
              value={this.state.categoryID}
            />
            <Form.Input
              type="file"
              name="imageName"
              onChange={this.handleFileChange}
            />
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
  newsForm: makeSelectNewsForm(),
  news: makeSelectNewsById(),
  category: makeSelectNewsCategory(),
});

function mapDispatchToProps(dispatch) {
  return {
    addNews: news => dispatch(addNews(news)),
    getNewsById: id => dispatch(getNewsById(id)),
    editNews: (news, id) => dispatch(editNews(news, id)),
    getNewsCategories: () => dispatch(getNewsCategory()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'newsForm', reducer });
const withSaga = injectSaga({ key: 'newsForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsForm);
