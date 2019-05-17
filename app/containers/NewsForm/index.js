/**
 *
 * NewsForm
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
import makeSelectNewsForm, { makeSelectNewsById } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { addNews, getNewsById, editNews } from './actions';
import { Segment, Form, Button } from 'semantic-ui-react';

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
        categoryID: '578dd25436e469c351f17cd6',
      },
      imageName: null,
    };
  }

  componentDidMount() {
    const id =
      this.props.match && this.props.match.params.edit_id
        ? this.props.match.params.edit_id
        : null;
    id ? this.props.getNewsById(id) : null;
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
          categoryID: '578dd25436e469c351f17cd6',
        },
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

  handleFileChange = () => {};
  render() {
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
            <Form.Input
              placeholder="CategoryId"
              name="categoryID"
              onChange={this.handleChange}
              value={this.state.news.categoryID}
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

// NewsForm.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  newsForm: makeSelectNewsForm(),
  news: makeSelectNewsById(),
});

function mapDispatchToProps(dispatch) {
  return {
    addNews: news => dispatch(addNews(news)),
    getNewsById: id => dispatch(getNewsById(id)),
    editNews: (news, id) => dispatch(editNews(news, id)),
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
