import { createSelector } from "reselect";

const selectbrands = state => state.get("brandTypeReducer");

const makeSelectBrandType = () =>
    createSelector(selectbrands, brandState => {
        return brandState.get("brands");
    });
const makeSelectPagination = () =>
    createSelector(selectbrands, brandState =>
        brandState.get("pagination")
    );
const makeSelectBrandData = () =>
    createSelector(selectbrands, brandState => {
        return brandState.get("brandObj");
    });

const makeSelectLoading = () =>
    createSelector(selectbrands, brandState =>
        brandState.get("loading")
    );
const makeSelectSuccessResponse = () =>
    createSelector(selectbrands, brandState =>
        brandState.get("response")
    );
const makeSelectErrorResponse = () =>
    createSelector(selectbrands, brandState => brandState.get("error"));
export const selectProductType = () => state => state.getIn(['brandTypeReducer', 'productType' ])

export {
    makeSelectBrandType,
    makeSelectPagination,
    makeSelectBrandData,
    makeSelectLoading,
    makeSelectSuccessResponse,
    makeSelectErrorResponse
};
