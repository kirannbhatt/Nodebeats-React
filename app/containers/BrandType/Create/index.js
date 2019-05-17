import React from "react";
// import BrandCreateForm from "./BrandCreateForm";
import BrandTypeCreateForm from "./BrandTypeCreateForm";
import { connect } from "react-redux";
import BackButton from "components/common/BackButton";
import {createStructuredSelector} from 'reselect';
import { makeSelectBrandData,selectProductType } from '../selectors';
import {
    brandTypeSave,
    brandTypeUpdate,
    loadBrandTypeById,
    fetchProductTypeRequest
} from '../actions';

import {
    getInitialStateFromHTMLValue,
    setUpdatedStateToHTMLValue
} from "containers/Globals/HtmlEditor/editorUtils";
import Dropzone from 'react-dropzone';

const mapDispatchToProps = dispatch => ({
    brandTypeSave: (brandType,documents)=> dispatch(brandTypeSave(brandType,documents)),

    brandTypeUpdate:(brandType,documents)=>dispatch(brandTypeUpdate(brandType,documents)),
    loadSingleBrandType: id => dispatch(loadBrandTypeById(id)),
    loadProductType         : ( name, page, perpage ) => dispatch(fetchProductTypeRequest(name, page, perpage)),

    // updateUser: user => dispatch(updateUser(user))
});
const mapStateToProps = createStructuredSelector ({
    brandType : makeSelectBrandData(),
    productType        : selectProductType(),

});




class BrandTypeCreate extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            productType:{},
            brandType: {
                name: '',
                product_type_id: '',
                product_type: '',
                description:'',
                active:'',
                enctype:'multipart/form-data'

            },
            finalResultObject: {},
            attachments   : [],
            accepted      : [],
            errors        : {},
            rejected      : [],
            showDialog    : false,
        };
    }

    componentDidMount() {
        this.props.loadProductType('',1,20);
        let id = this.props.match.params.id ? this.props.match.params.id : null;
        if(id){
            this.props.loadSingleBrandType(id);
        }
    }


    componentWillReceiveProps(nextProps, prevProps) {
        const newBrand = nextProps.brandType.toJS();
        this.setState({
            brandType: newBrand
        })
        if(typeof nextProps.productType !== 'string') {
            if (nextProps.productType !== this.props.productType) {
                const producttype = nextProps.productType;
                this.setState(state => ({
                    productType: producttype
                }));
            }
        } else {
            this.setState(state => ({
                message: nextProps.productType
            }));

        }
    }


    handleBrandChange = (e, { name,value }) => {
        this.setState({ brandType: { ...this.state.brandType, [name]: value } });
    };


    handleSubmit = e => {
        e.preventDefault();
        let fields=['name','description','product_type_id'];
        if(this.validateField(fields)){
            let id=this.props.match.params.id?this.props.match.params.id:null;
            if(!id){


                this.props.brandTypeSave(this.state.brandType, this.state.accepted);
            }
            else {
                this.props.brandTypeUpdate(this.state.brandType, this.state.accepted);
            }
        }
           };
    validateField = validate => {
        const errors = { ...this.state.errors };
        let hasError = false;
        validate.forEach(field => {
            if (this.state.brandType[field].length === 0) {
                hasError = true;
                errors[field] = `${field} cannot be empty`;
            } else {
                errors[field] = '';
            }
        });
        this.setState({ errors });
        return !hasError;
    };


    handleChange = event => {
        const fieldName = event.target.name;
        this.setState(
            {
                brandType: {
                    ...this.state.brandType,
                    [event.target.name]: event.target.value
                }
            },
            () => {
                this.validateField([fieldName]);
            }
        );
    };

    handleBlur = event => {
        const fieldName = event.target.name;
        this.validateField([fieldName]);
    };

    handleActiveChecked = () =>
        this.setState(state => ({
        brandType: { ...state.brandType, active: !state.brandType.active }
    }));
    onDrop = (accepted, rejected) => {
        this.setState({
            accepted,
            rejected
        });
    };
    showUploadedFiles() {
        const { accepted } = this.state;
        return (
            <div>
                <ul className="uploaded">
                    {accepted.map((file, idx) =>
                        <div className="card" key={idx}>
                            <li>
                                <div className="label label-default">
                                    {file.document_name}
                                    <i
                                        className="icon-trash"
                                        onClick={e => this.handleUploadedDocumentRemove(this.state.template._id, file)}
                                    />
                                </div>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        );
    }

    handleUploadedDocumentRemove = (_id, file) => {
        this.props.deleteFile(_id, file.document_path);
    };
    showDroppedFiles() {
        const { accepted } = this.state;
        return (
            <div>
                <ul className="dropped">
                    {accepted.map((file, idx) =>
                        <div className="card" key={idx}>
                            <li>

                                <div className="label label-default">
                                    {file.name}
                                    <i className="icon-trash" onClick={e => this.handleRemove(file)} />
                                </div>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        );
    }

    handleRemove = file => {
        const newState = this.state.accepted;
        if (newState.indexOf(file) > -1) {
            newState.splice(newState.indexOf(file), 1);
            this.setState({ accepted: newState });
        }
    };
    handleProductTypeChange = event => {
        const fieldName         = event.target.name,
            value             = event.target.value.split("_"),
            product_type_id   = value[0],
            product_type_name = value[1];
        this.setState(
            {
                brandType: {
                    ...this.state.brandType,
                    product_type_id: product_type_id,
                    product_type   : product_type_name
                }
            },
            () => {
                this.validateField([fieldName]);
            }
        );
    };


    renderImageField = () => {
        const errors = { ...this.state.errors };
        const attachments = { ...this.state.attachments };
        const accepted = { ...this.state.accepted };
        return (
            <div>
                <Dropzone onDrop={this.onDrop} className="dropzone" accept=".jpeg, .png, .jpg">
                    Drop photo here or<br /> <span className="button link"> Upload</span>{' '}
                </Dropzone>
                {errors.accepted &&
                <p className="help-block negative message">
                    {errors.accepted}
                </p>}

                {( accepted.length === 0 && attachments.length !== 0 ) && this.showUploadedFiles()}
                {accepted.length !== 0 && this.showDroppedFiles()}
            </div>

        )
    };
    renderProductTypeDropdown = () => {
        const { productType } = this.props;
        return productType.map(name =>
            <option key={name._id} value={`${name._id}_${name.name}`} selected={name._id === this.state.brandType.product_type_id ? "selected" :""}>
                {name.name}
            </option>
        );
    };


        // editorChange = editorState => {
    //   this.setState({ editorState });
    // };

    render() {
        const { brandType,productType } = this.state;
        return (

            <div className="left container">
                <BackButton
                    history={this.props.history}
                    location={"/admin/dashboard/brandtype"}
                />
                <BrandTypeCreateForm
                    handleBrandChange={this.handleBrandChange}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    value={brandType}
                    result={this.state.finalResultObject}
                    handleActiveChecked = {this.handleActiveChecked}
                    renderImageField={this.renderImageField}
                    productType           = { productType }
                    renderProductType     = { this.renderProductTypeDropdown }
                    handleProductTypeChange = {this.handleProductTypeChange}


                    // editorState={this.state.editorState}
                    // editorChange={this.editorChange}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandTypeCreate);
