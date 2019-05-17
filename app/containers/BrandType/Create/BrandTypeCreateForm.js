import React from "react";
// import InputField from "components/common/Forms/InputField";
// import SearchableDropDown from "components/common/Forms/Dropdown";
import TextArea from "components/common/Forms/TextArea";
import TextFieldGroup from 'utils/textFieldGroup';


const BrandTypeCreateForm = props => {
  console.log(props);
  return (
    <div className="knowledge-base-form">
      <form className="form" onSubmit={props.handleSubmit}>


        <TextFieldGroup
            name="name"
            type="text"
            value={props.value.name || ''}
            label="Name"
            placeholder="Enter Title*"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            // error={errors.title}
            required
        />
        <div className="field">
          <label>Product Type</label>
          <select
              className="fluid dropdown"
              name="product_type_id"
              onChange={props.handleProductTypeChange}
          >
            <option>
                {props.productType && props.productType.length > 0 ? 'Select' : 'Loading...'}
            </option>
              {props.productType && props.productType.length >= 1 && props.renderProductType()}
          </select>
        </div>
        <div className="field">

          <TextArea
              autoHeight
              rows={'7'}
              name="description"
              type="text"

              value={props.value.description || ''}
              label="Description"
              placeholder="Enter Description*"
              onChange={props.handleChange}
              required
          />
        </div>
          {props.renderImageField()}

          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={props.handleActiveChecked}
              checked={props.value.active}
            />
            <span className="custom-control-indicator" />
            <span className="custom-control-description">Active</span>
          </label>


        <button className="button secondary" >Save</button>
        <pre>
          {/*JSON.stringify(props.result, null, 2)*/}
        </pre>
      </form>
    </div>
  );
};

export default BrandTypeCreateForm;
