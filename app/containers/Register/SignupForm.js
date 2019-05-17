import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Link } from "react-router-dom"

import { prefixes } from '../App/constants';
import UserRegistrationForm from './ui/UserRegistrationForm';
import {
  signupRequest,
  clearState,
  linkFacebookRequest,
  linkGoogleRequest,

} from './actions';
import { showDialog } from '../App/actions';
import {
  makeSelectError,
  makeSelectRequesting,
  makeSelectResponse,
  makeSelectSMSRequesting,
  makeSelectSmsSent,
  makeSelectMobileNumberValidated,
  makeSelectSuccess
} from "./selectors";
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  signupRequest: (data) => dispatch(signupRequest(data)),
  clearState: () => dispatch(clearState()),
  linkFacebookRequest: (token, isImp) => dispatch(linkFacebookRequest(token, isImp)),
  linkGoogleRequest: (token, isImp) => dispatch(linkGoogleRequest(token, isImp)),
  addMobileRequest: (mobileInfo) => dispatch(addMobileRequest(mobileInfo)),
  confirmMobileRequest: (code) => dispatch(confirmMobileRequest(code)),
  showDialog: (dialog) => dispatch(showDialog(dialog)),
});

const mapStateToProps = createStructuredSelector({
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  isRequesting: makeSelectRequesting(),
  is_sms_Requesting: makeSelectSMSRequesting(),
  success: makeSelectSuccess(),
  sms_sent: makeSelectSmsSent(),
  mobile_number_validated: makeSelectMobileNumberValidated()
});

class SignupForm extends React.Component {
  static propTypes = {
    signupRequest: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    addMobileRequest: PropTypes.func,
    confirmMobileRequest: PropTypes.func,
    showDialog: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    if (props.isImp) {
      this.state = {
        data: {
          imp_user: true,
          refer_code: '',
          imp_terms_conditions: false,
          email_offer_subscription: false,
          agree_terms_condition: false,
          country_code: '',
          country_abbr: '',
          mobile_number: ''
        },
        errors: {},
        loadingFb: false,
        loadingGoogle: false,
      };
    } else {
      this.state = {
        data: {
          email_offer_subscription: false,
          agree_terms_condition: false,
        },
        errors: {},
        loadingFb: false,
        loadingGoogle: false,
      };
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    this.props.clearState();
  }

  // connectFacebook = () => {
  //   this.setState({ loadingFb: true });
  //   FB.getLoginStatus((response) => {
  //     if (response.status === 'connected') {
  //       this.props.linkFacebookRequest(response.authResponse.accessToken, this.props.isImp);
  //     } else {
  //       FB.login(
  //         (response) => {
  //           if (response.authSuccess) {
  //             this.setState({ loadingFb: false });
  //             this.props.linkFacebookRequest(response.authSuccess.accessToken, this.props.isImp);
  //           } else if (response.authResponse) {
  //             this.setState({ loadingFb: false });
  //             this.props.linkFacebookRequest(response.authResponse.accessToken, this.props.isImp);
  //           }
  //         },
  //         { scope: 'email,public_profile', info_fields: 'email,name' }
  //       );
  //     }
  //   });
  // };
  // connectGoogle = (response) => {
  //   this.setState({ loadingGoogle: true });
  //   this.props.linkGoogleRequest(response.tokenObj.access_token, this.props.isImp);
  // };
  // connectGoogleError = (response) => {
  //   this.setState({ loadingGoogle: false });
  //   // this.props.linkGoogleRequest(response.tokenObj.access_token);
  // };


  handleChange = e => {
    e.persist();
    this.setState(state => ({
      data: { ...state.data, [e.target.name]: e.target.value },
    }));
  };
  handleCheckbox = e => {
    e.persist();
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.checked
      }
    }));
  };
  onRecaptchaChange = e => {
    this.setState(state => ({
      data: { ...state.data, reCaptcha: e },
    }));
  };
  handleSemanticChange = (e, { name, value }) => {
    this.setState(state => ({
      data: { ...state.data, [name]: value },
    }));
  };
  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.first_name) errors.first_name = "Can't be blank";
    if (data.first_name && data.first_name.length > 26) errors.first_name = "Can't be more than 26 characters";
    if (data.first_name && !(/^[a-zA-Z]+$/.test(data.first_name))) errors.first_name = "Can only contain letters";
    if (!data.last_name) errors.last_name = "Can't be blank";
    if (data.last_name && data.last_name.length > 26) errors.first_name = "Can't be more than 26 characters";
    if (data.last_name && !(/^[a-zA-Z]+$/.test(data.last_name))) errors.first_name = "Can only contain letters";
    if (!data.email) errors.email = "Can't be blank";
    if (!data.password) errors.password = "password_error";
    // if (Object.keys(passwordHelper(data.password)).length > 0) errors.password = "Please secure your account with a strong password";
    if (!data.gender) errors.gender = "Can't be blank";
    if (!data.agree_terms_condition) errors.agree_terms_condition = "Can't be blank";
    if (data.imp_user && !data.imp_terms_conditions) errors.imp_terms_conditions = "Can't be blank";
    if (!data.reCaptcha) errors.reCaptcha = "Please check I am not a Robot checkbox";

    if (data.imp_user && !data.mobile_number) errors.mobile_number = "Please input your mobile number";
    if (data.imp_user && !data.country_code) errors.country_code = "Please select/enter country code of your mobile network";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.signupRequest(this.state.data);
    }
  };

  render() {
    const { data, errors } = this.state;
    const { isImp, errorResponse, isRequesting, sms_sent, is_sms_Requesting } = this.props;
    return (
      <div>
        {isImp && <h2>Independent Marketing Partner(IMP) Registration</h2>}
        {errorResponse && <p className="negative message">{errorResponse}</p>}

        <UserRegistrationForm
          handleSubmit={this.handleSubmit}
          handleSemanticChange={this.handleSemanticChange}
          handleChange={this.handleChange}
          data={data}
          errors={errors}
          handleCheckbox={this.handleCheckbox}
          onRecaptchaChange={this.onRecaptchaChange}
          isRequesting={isRequesting}
          sms_sent={sms_sent}
          isImp={isImp}
          prefixes={prefixes}
        />
        {window.location.pathname.split('/')[1] != 'guest-detail' &&
        <p>
          Already a Member?{' '}
          <Link to="/login">Login</Link>
        </p>}
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'register', reducer });
const withSaga = injectSaga({ key: 'register', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupForm);

