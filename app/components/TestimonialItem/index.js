/**
 *
 * TestimonialItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TestimonialItem() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TestimonialItem.propTypes = {};

export default TestimonialItem;
