/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import zh from 'assets/img/korean_flag.png';
import en from 'assets/img/us_flag.png';
import Select from './Select';
import ToggleOption from '../ToggleOption';

const flags = {
  zh: {
    css: 'korean',
    logo: zh,
    text: '한국어'
  },
  en: {
    css: 'us',
    logo: en,
    text: 'EN'
  },
};

const Toggle = props => {
  // let content = <option> -- </option>;
  let content = null;

  if (props.value) {
    content = props.values.map(value => <span key={`opt-${value}`}
                                              className={ "lang" + props.value === value ? 'active' : ''}
                                              onClick={ () => props.onToggle({target: { value }  }) }>
        <img className={ "flag" + flags[value].css
        }
             src={
               flags[value].logo
             }
             alt="" />
        {
          flags[value].text
        } </span>
    )
  }
  // If we have items, render them
  // if (props.values) {
  //   content = props.values.map(value => <ToggleOption key={value} value={value} message={props.messages[value]} />);
  // }

  return ( <div className = "language" >
      {content}
    </div>
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
