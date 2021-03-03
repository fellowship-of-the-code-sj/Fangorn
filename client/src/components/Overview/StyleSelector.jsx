import React from 'react';
import PropTypes from 'prop-types';

const StyleSelector = (props) => {
  return (
    <div className="styleSelector">
      <div id="style_selector_name">Style: {props.currentStyle.name}</div>
      <div id="style_selector_styles">
        { props.styles.length > 0 ?
          props.styles.map((style, index) => {
            return (
            <img
              key={style.style_id}
              className="style_thumbnail"
              onClick={event => {
                props.handleStyleChange(event.target.attributes[5].value)
              }}
              src={style.photos[0].thumbnail_url}
              alt={`Image Thumbnail ${style.name}`}
              height="50"
              width="50"
              index={index}
            />
          )}) :
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