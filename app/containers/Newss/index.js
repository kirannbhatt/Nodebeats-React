/**
 *
 * Newss
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
import makeSelectNewss, {
  makeSelectLoading,
  makeDeleteResponse,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { push } from 'connected-react-router';

import { fetchNews, deleteNews } from './actions';

import { Button, Segment, Divider, Card, Table } from 'semantic-ui-react';

export class Newss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: null,
    };
  }
  componentDidMount() {
    this.props.fetchNews();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newss !== this.props.newss) {
      const news = nextProps.newss.toJS();
      this.setState({
        newsList: news.dataList,
      });
    }
    if (
      nextProps.deleteResponse !== '' &&
      nextProps.deleteResponse !== this.props.deleteResponse
    ) {
      this.props.fetchNews();
    }
  }
  addNewTestimonial = () => {
    this.props.redirect('/admin/newsform');
  };
  onEdit = id => {
    this.props.redirect(`/admin/newsform/${id}`);
  };

  onDelete = id => {
    this.props.deleteNews(id);
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Newss</title>
          <meta name="description" content="Description of Newss" />
        </Helmet>
        <Segment>
          <Button color="violet" onClick={this.addNewTestimonial}>
            Add New News
          </Button>
        </Segment>
        <Divider horizontal>News List </Divider>
        <Segment placeholder>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>S.N.</Table.HeaderCell>
                <Table.HeaderCell>News Title</Table.HeaderCell>
                <Table.HeaderCell>News Author</Table.HeaderCell>
                <Table.HeaderCell>News Date</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.newsList &&
                this.state.newsList.length > 0 &&
                this.state.newsList.map((element, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{element.newsTitle}</Table.Cell>
                    <Table.Cell>{element.newsAuthor}</Table.Cell>
                    <Table.Cell>{element.newsDate}</Table.Cell>
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

const mapStateToProps = createStructuredSelector({
  newss: makeSelectNewss(),
  loading: makeSelectLoading(),
  deleteResponse: makeDeleteResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchNews: () => dispatch(fetchNews()),
    deleteNews: id => dispatch(deleteNews(id)),
    redirect: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'newss', reducer });
const withSaga = injectSaga({ key: 'newss', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Newss);
