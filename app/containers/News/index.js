import React from "react";
import Toaster from "components/Toaster";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import NavLink from "react-router-dom/NavLink";

import { showDialog } from "containers/App/actions";
import { makeSelectDialog } from "containers/App/selectors";
import { loadNews, deleteNews } from "./actions";
import {
  makeSelectNews,
  makeSelectSuccessResponse,
  makeSelectErrorResponse,
  makeSelectPagination,
  makeSelectLoading
} from "./selectors";
import DeleteConfirmation from "components/DeleteConfirmation";
import NewsTable from "./NewsTable";
import AddButton from "components/common/AddButton";

const perPageToShow = 10;

const mapDispatchToProps = dispatch => ({
  fetchNews: (name, page, perPage) =>
    dispatch(loadNews(name, page, perPage)),
  deleteNews: newsId => dispatch(deleteNews(newsId)),
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog(null))
});

const mapStateToProps = createStructuredSelector({
  news: makeSelectNews(),
  paginationParams: makeSelectPagination(),
  successResponse: makeSelectSuccessResponse(),
  errorResponse: makeSelectErrorResponse(),
  isRequesting: makeSelectLoading(),
  dialog: makeSelectDialog()
});

class NewsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      item: "",
      page: 1
    };
  }

  componentDidMount() {
    this.props.fetchNews("", 1, perPageToShow);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paginationParams !== this.props.paginationParams) {
      this.setState({ pagination: nextProps.paginationParams });
    }
  }

  componentWillMount() {
    const { totalItems, currentPage } = this.props.paginationParams;
    this.delayedSearch = debounce(item => {
      console.log('search checking for news',this.state.item,'and',this.state.page,'and',totalItems)
      this.props.fetchNews(this.state.item, this.state.page, totalItems);
    }, 1000);
  }

  deleteRow(cell) {
    this.setState({ show: true });
    
    if (cell) {
      //console.log('dasdsadsa',cell, this.state.show)
      const NewsDeleteConfirmation = (
        <DeleteConfirmation
          hideDialog={this.props.hideDialog}
          deleteKey={cell}
          text="news"
          onDelete={this.props.deleteNews}
        />
      );
      this.props.showDialog(NewsDeleteConfirmation);
    }
  }

  handlePagination(page, pageSize) {
    this.setState({ page }, () =>
      this.props.fetchNews(
        this.state.item || "",
        this.state.page,
        pageSize
      )
    );
  }

  doSearch(item) {
    this.setState({ item }, () => this.delayedSearch(this.state.item));
  }

  render() {
    const {
      news,
      successResponse,
      errorResponse,
      paginationParams
    } = this.props;
    let message;
    if (successResponse && typeof successResponse === "string") {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === "string") {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    const headers = [
      {
        name: "Title",
        field: "title",
        sorted: true,
        key: 1
      },
      { name: "Author", field: "author", key: 2 },
      { name: "Is Active", field: "active", key: 3 },
      { name: "Featured", field: "featured", key: 4 },
      { name: "Publish Date", field: "publish_date", key: 5, date_format:"YYYY-MM-DD HH:mm" },
      { name: "Views", field: "view_count", key: 6 },
      { name: "Added On", field: "added_on", key:7 , date_format:"YYYY-MM-DD HH:mm"  }
    ];
    const actions = [
      {
        key: 1,
        name: "view",
        type: "view",
        icon: "icon icon-eye",
        action: "/admin/dashboard/news/edit"
      },
      {
        key: 2,
        name: "delete",
        type: "delete",
        icon: "icon icon-trash"
      }
    ];
    return (
      <div className="left container">
        {message && message}
        {this.state.show ? this.props.dialog : null}
        <h1>News</h1>
        <AddButton
                history={this.props.history}
                location={"/admin/dashboard/news/add"}
                name={"Add News"}
            />
        <NewsTable
          searchItems={item => this.doSearch(item)}
          headers={headers}
          data={news && news.toJS()}
          actions={actions}
          onDelete={cell => this.deleteRow(cell)}
          pagination={paginationParams && paginationParams}
          onPaginate={(page, pageSize) => this.handlePagination(page, pageSize)}
          isRequesting={this.props.isRequesting}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
