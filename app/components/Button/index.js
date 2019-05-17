/**
 *
 * Button
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import './Button.scss';

/* eslint-disable react/prefer-stateless-function */
class Button extends React.Component {
  render() {
    const {children, ...restProps} = this.props; 
    return <button {...restProps}>{children}</button>;
  }
}

Button.propTypes = {};

export default Button;
