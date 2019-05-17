import {
    takeLatest,
    fork,
    put,
    cancel,
    take,
    select,
    call
} from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
    LOAD_BRANDTYPE,
    SAVE_BRAND_REQUEST,
    SAVE_BRAND_SUCCESS,
    SAVE_BRAND_FAILURE,
    LOAD_BRAND_TYPE_BY_ID,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAILURE,
    DELETE_BRANDTYPE,
    FETCH_PRODUCT_TYPE_REQUEST,


} from "./constants";
import * as actions from "./actions";

import { AutoNCell } from "containers/App/sagas";

const token = localStorage.getItem("token");
function* redirectOnBrandTypeAddSuccess() {
    const action = yield take(SAVE_BRAND_SUCCESS);
    yield put(push("/admin/dashboard/brandtype"));
}
function* redirectOnBrandTypeUpdateSuccess() {
    const action = yield take(UPDATE_BRAND_SUCCESS);
    yield put(push("/admin/dashboard/brandtype"));
}
function* loadBrandType(action) {
    const { name, page, perpage } = action;
    // let queryStringVal = `page=${page}&perpage=${perpage}`;
    // if (name !== "") {
    //   queryStringVal = `name=${name}&${queryStringVal}`;
    // }
    yield call(
        AutoNCell.get(
            `api/brand-type?active=all&name=${name}&page=${page}&perpage=${perpage}`,
            actions.loadBrandTypeSuccess,
            actions.loadBrandTypeError,
            token
        )
    );
}
function* saveBrandRequest(action) {
    const successWatcher = yield fork(redirectOnBrandTypeAddSuccess);

    yield fork(
        AutoNCell.multipartPost(
            `api/brand-type`,
            actions.brandTypeSaveSuccess,
            actions.brandTypeSaveFailure,
            action.data,
            action.documents,
            token
        )
    )
    yield take([LOCATION_CHANGE, SAVE_BRAND_FAILURE]);
    yield cancel(successWatcher);
}
function* loadBrandTypeById(action) {
    yield call(
        AutoNCell.get(
            `api/brand-type/${action.id}`,
            actions.loadBrandTypeByIdSuccess,
            actions.loadBrandTypeByIdError,
            token
        )
    );
}

function * updateBrandType(action) {
    const successWatcher = yield fork(redirectOnBrandTypeUpdateSuccess);
    yield fork(
        AutoNCell.multipartPost(
            `api/brand-type/${action.data._id}`,
            actions.brandTypeUpdateSuccess,
            actions.brandTypeUpdateFailure,
            action.data,
            action.documents,
            token
        )
    );
    yield take([LOCATION_CHANGE, UPDATE_BRAND_FAILURE]);
    yield cancel(successWatcher);
}

function* deleteBrandType(action) {
    const brandId = action.feedbackId;
    yield call(
        AutoNCell.delete(
            `api/brand-type/${brandId}`,
            actions.deleteBrandTypeSuccess,
            actions.deleteBrandTypeError,
            brandId
        )
    );
}
function* loadProductType(action) {
    const { name, page, perpage } = action;
    yield call(
        AutoNCell.get(
            `api/product-type?name=${name}&page=${page}&perpage=${perpage}`,
            actions.fetchProductTypeSuccess,
            actions.fetchProductTypeFailure,
            token
        )
    );
}


function* brandWatcher() {
    yield takeLatest(LOAD_BRANDTYPE, loadBrandType);
    yield takeLatest(DELETE_BRANDTYPE, deleteBrandType);
    yield takeLatest(SAVE_BRAND_REQUEST, saveBrandRequest);
    // yield takeLatest(UPDATE_BRAND_REQUEST, updateBrand);
    yield takeLatest(LOAD_BRAND_TYPE_BY_ID, loadBrandTypeById);
    yield takeLatest(UPDATE_BRAND_REQUEST, updateBrandType);
    yield takeLatest(FETCH_PRODUCT_TYPE_REQUEST, loadProductType)

}

export default [brandWatcher];
