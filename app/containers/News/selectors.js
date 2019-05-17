import { createSelector } from "reselect";

const selectNews = state => state.get("newsReducer");

const makeSelectNews = () =>
  createSelector(selectNews, newsState => {
    return newsState.get("news");
  });

const makeSelectNewsData = () =>
  createSelector(selectNews, newsState => {
    return newsState.get("newsObj");
  });

const makeSelectPagination = () =>
  createSelector(selectNews, newsState =>
    newsState.get("pagination")
  );
const makeSelectLoading = () =>
  createSelector(selectNews, newsState =>
    newsState.get("loading")
  );
const makeSelectSuccessResponse = () =>
  createSelector(selectNews, newsState =>
    newsState.get("response")
  );
const makeSelectErrorResponse = () =>
  createSelector(selectNews, newsState => newsState.get("error"));

const selectNewsId = (_, props) => {
  try {
    // Search in props.params set by router.
    return props.match.params.id;
  } catch (e) {
    // Search in props (set by parent component.)
    return props.news._id;
  }
};

export {
  makeSelectNews,
  selectNewsId,
  makeSelectPagination,
  makeSelectLoading,
  makeSelectSuccessResponse,
  makeSelectErrorResponse,
  makeSelectNewsData
};
