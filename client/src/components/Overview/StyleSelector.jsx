import React from 'react';
import PropTypes from 'prop-types';

const StyleSelector = (props) => {
  console.log(props.styles);
  return (
    <div className="styleSelector">
      <div id="style_selector_name">Style: {props.currentStyle.name}</div>
      <div id="style_selector_styles">
        { props.styles.length > 0 ?
          props.styles.map(style => (
            <div key={style.style_id} className="style_thumbnail" >
              <img src={style.photos[0].thumbnail_url}/>
            </div>
          )) :
          <div></div>
        }
      </div>
    </div>
  )
  StyleSelector.propTypes = {
    styles: PropTypes.array,
    currentStyle: PropTypes.object,
    handleStyleChange: PropTypes.func
  }
}

export default StyleSelector;