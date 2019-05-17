import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Link } from 'react-router-dom';

import Toaster from "components/Toaster";
import { showDialog } from "containers/App/actions";
import { makeSelectDialog } from "containers/App/selectors";
import {
    loadBrandType,
    deleteBrandType
} from "./actions";
import {
    makeSelectBrandType,
    makeSelectSuccessResponse,
    makeSelectErrorResponse,
    makeSelectPagination,
    makeSelectLoading
} from "./selectors";
import DeleteConfirmation from "components/DeleteConfirmation";
import BrandTypeTable from "./BrandTypeTable";
import AddButton from "components/common/AddButton";

const perPageToShow = 10;

const mapDispatchToProps = dispatch => ({
    fetchBrandType: (name, page, perPage) => dispatch(loadBrandType(name, page, perPage)),
    deleteBrandTypeRequest: brandId => dispatch(deleteBrandType(brandId)),
    showDialog: dialog => dispatch(showDialog(dialog)),
    hideDialog: () => dispatch(showDialog(null))
});


const mapStateToProps = createStructuredSelector({
    brands: makeSelectBrandType(),
    paginationParams: makeSelectPagination(),
    successResponse: makeSelectSuccessResponse(),
    errorResponse: makeSelectErrorResponse(),
    isRequesting: makeSelectLoading(),
    dialog: makeSelectDialog()
});

class BrandTypeList extends React.Component {
    state = {
        show: false,
        item: "",
        page: 1,
        // brandData: {}
    };

    componentDidMount() {
        //immediately after initial rendering
        this.props.fetchBrandType("", 1, perPageToShow);
    }

    componentWillReceiveProps(nextProps) {
        //when component receives new props
        if (nextProps.paginationParams !== this.props.paginationParams) {
            this.setState({ pagination: nextProps.paginationParams });
        }

    }
    //
    componentWillMount() {
        //immediately before initial rendering
        const { totalItems, currentPage } = this.props.paginationParams;
        this.delayedSearch = debounce(item => {
            this.props.fetchBrandType(this.state.item, this.state.page, totalItems);
        }, 1000);
    }

    deleteRow(cell) {
        this.setState({ show: true });
        if (cell) {
            const BrandTypeDeleteConfirmation = (
                <DeleteConfirmation
                    hideDialog={this.props.hideDialog}
                    deleteKey={cell}
                    text="Brand Type"
                    onDelete={this.props.deleteBrandTypeRequest}
                />
            );
            this.props.showDialog(BrandTypeDeleteConfirmation);
        }
    }

    handlePagination(page, pageSize) {
        this.setState({ page }, () =>
            this.props.fetchBrandType(
                this.state.item || "",
                this.state.page,
                pageSize
            )
        );
    }


    doSearch = (item) => {
        this.setState({ item }, () => this.delayedSearch(this.state.item));
    };

    showModal(id) {
        this.setState({ show: true });
        const BrandTypeDetail = (
            <Detail hideDialog={this.props.hideDialog} id={id} />
        );
        this.props.showDialog(BrandTypeDetail);
    }

    render() {
        const {
            brands,
            successResponse,
            errorResponse,
            paginationParams
        } = this.props;
        const { pagination } = this.state;
        let message;
        if (successResponse && typeof successResponse === "string") {
            message = <Toaster message={successResponse} timeout={1000} success />;
        }
        if (errorResponse && typeof errorResponse === "string") {
            message = <Toaster message={errorResponse} timeout={1000} error />;
        }
        const headers = [
            { name: "Name", field: "name", key: 1 },
            { name: "Description", field: "description", key: 2 },
            { name: "Is Active", field: "active", key: 3 },
            { name: "Added On", field: "added_on", key: 4, date_format:"YYYY-MM-DD HH:mm" }
        ];
        const actions = [
            {
                key: 1,
                name: "view",
                type: "view",
                icon: "icon icon-eye",
                action: "/admin/dashboard/brandtype/edit"
            }, {
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
                <h1>Brand Type</h1><AddButton
                    history={this.props.history}
                    location={"/admin/dashboard/brandtype/create"}
                    name={"Add Brand Type"}
                />
                <BrandTypeTable
                    searchItems={item => this.doSearch(item)}
                    headers={headers}
                    data={brands && brands.toJS()}
                    actions={actions}
                    pagination = {paginationParams && paginationParams}
                    onPaginate={(page, pageSize) => this.handlePagination(page, pageSize)}
                    onDelete={cell => this.deleteRow(cell)}
                    // pagination={paginationParams && paginationParams}
                    isRequesting={this.props.isRequesting}
                    showModal={id => this.showModal(id)}
                />

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandTypeList);
