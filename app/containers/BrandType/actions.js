import {
    LOAD_BRANDTYPE,
    LOAD_BRANDTYPE_SUCCESS,
    LOAD_BRANDTYPE_FAILURE,
    LOAD_BRAND_TYPE_BY_ID,
    LOAD_BRAND_TYPE_BY_ID_SUCCESS,
    LOAD_BRAND_TYPE_BY_ID_FAILURE,
    DELETE_BRANDTYPE,
    DELETE_BRANDTYPE_SUCCESS,
    DELETE_BRANDTYPE_FAILURE,
    SAVE_BRAND_REQUEST,
    SAVE_BRAND_SUCCESS,
    SAVE_BRAND_FAILURE,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAILURE,

    FETCH_PRODUCT_TYPE_REQUEST,
    FETCH_PRODUCT_TYPE_SUCCESS,
    FETCH_PRODUCT_TYPE_FAILURE

} from "./constants";

import action from "utils/action";

export function loadBrandType(name, page, perpage) {
    return {
        type: LOAD_BRANDTYPE,
        name,
        page,
        perpage
    };
}
export function loadBrandTypeSuccess(brands) {
    return {
        type: LOAD_BRANDTYPE_SUCCESS,
        brands
    };
}

export function loadBrandTypeError(error) {

    return {
        type: LOAD_BRANDTYPE_FAILURE,
        error
    };
}
export function brandTypeSave(data,documents) {
    return{
        type:SAVE_BRAND_REQUEST,
        data,documents
    }
}
export function brandTypeSaveSuccess(response) {
    return{
        type:SAVE_BRAND_SUCCESS,
        response
    }
}
export function brandTypeSaveFailure(error) {
    return{
        type:SAVE_BRAND_FAILURE,
        error
    }
}
export function loadBrandTypeById(id) {
    return {
        type: LOAD_BRAND_TYPE_BY_ID,
        id
    };
}

export function loadBrandTypeByIdSuccess(brand) {
    return {
        type: LOAD_BRAND_TYPE_BY_ID_SUCCESS,
        brand
    };
}

export function loadBrandTypeByIdError(error) {
    return {
        type: LOAD_BRAND_TYPE_BY_ID_FAILURE,
        error
    };
}
export function brandTypeUpdate(data,documents) {
    return{
        type:UPDATE_BRAND_REQUEST,
        data,
        documents
    }
}
export function brandTypeUpdateSuccess(response) {
    return{
        type:UPDATE_BRAND_SUCCESS,
        response
    }
}
export function brandTypeUpdateFailure(error) {
    return{
        type:UPDATE_BRAND_FAILURE,
        error
    }
}
export function deleteBrandType(feedbackId) {
    return {
        type: DELETE_BRANDTYPE,
        feedbackId
    };
}

export function deleteBrandTypeSuccess(response, feedbackId) {

    return {
        type: DELETE_BRANDTYPE_SUCCESS,
        response,
        feedbackId
    };
}

export function deleteBrandTypeError(error) {
    return {
        type: DELETE_BRANDTYPE_FAILURE,
        error
    };

}
/* ------------------------------ Product Type Section---------------------------- */
export function fetchProductTypeRequest(name, page, perpage) {
    return{
        type: FETCH_PRODUCT_TYPE_REQUEST,
        name,
        page,
        perpage
    }
}
export function fetchProductTypeSuccess(response) {
    return {
        type: FETCH_PRODUCT_TYPE_SUCCESS,
        response
    }
}
export function fetchProductTypeFailure(error) {
    return {
        type: FETCH_PRODUCT_TYPE_FAILURE,
        error
    }
}
/* ------------------------------ Product Type Section---------------------------- */
