import React from 'react';
import PropTypes from 'prop-types';

const StyleSelector = (props) => {
  return (
    <div className="styleSelector">
      <div id="style_selector_name">Style: Set Style</div>
      <div id="style_selector_styles">Styles go here</div>
    </div>
  )
}

export default StyleSelector;