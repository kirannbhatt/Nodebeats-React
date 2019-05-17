import { fromJS } from "immutable";
import * as types from "./constants";

import reviver from "utils/reviver";
const idReviver = reviver("_id", true);

const initialState = fromJS({
    loading: false,
    loaded: false,
    brands: [],
    brandObj: {},
    pagination: {},
    response: {},
    deleted: false,
    error: null,
    productType:{}
});

function brandTypeReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_BRANDTYPE:
        case types.SAVE_BRAND_REQUEST:
        case types.LOAD_BRAND_TYPE_BY_ID:
        case types.DELETE_BRANDTYPE:

            // case types.DELETE_BRANDS:
            return state.merge({
                loading: true,
                loaded: false,
                error: null,
                response: null
            });


        case types.LOAD_BRANDTYPE_SUCCESS:

            return state
                .merge({
                    loading: false,
                    loaded: true,
                    error: null,
                    brands: fromJS(action.brands.data.dataList)

                })
                .setIn(["pagination", "totalItems"], action.brands.data.totalItems)
                .setIn(
                    ["pagination", "currentPage"],
                    action.brands.data.currentPage
                );
        case types.LOAD_BRAND_TYPE_BY_ID_SUCCESS:
            return state.merge({
                loading: false,
                loaded: true,
                error: null,
                brandObj: fromJS(action.brand.data)
            });
        // case types.LOAD_BRANDS_FAILURE:
        case types.LOAD_BRAND_TYPE_BY_ID_FAILURE:
        // case types.DELETE_BRANDS_FAILURE:
        case types.SAVE_BRAND_FAILURE:
        case types.DELETE_BRANDTYPE_FAILURE:
            return state.merge({
                error: action.error.message,
                loading: false,
                response: null
            });
        case types.DELETE_BRANDTYPE_SUCCESS:
            return state
                .set("loading", false)
                .set("deleted", true)
                .set("response", action.response.message)
                .set(
                    "brands",
                    state.get("brands").filter(user => {
                        return user.get("_id") !== action.feedbackId[0];
                    })
                );
        case types.SAVE_BRAND_SUCCESS:
            return state
                .set('requesting', false)
                .set('successful', true)
                .set('response', action.response.message);
        case types.FETCH_PRODUCT_TYPE_REQUEST:
            return state
                .set('requesting', true)
                .set('successful', false)
                .set('response', null)
                .set('error', null);
        case types.FETCH_PRODUCT_TYPE_SUCCESS:
            return state
                .set('requesting', false)
                .set('successful', true)
                .set('productType', action.response.data.dataList);
        case types.FETCH_PRODUCT_TYPE_FAILURE:
            return state.set('error', action.error.message).set('response', null);

        default:
            return state;
    }
}

export default brandTypeReducer;
