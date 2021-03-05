import React from 'react';
import PropTypes from 'prop-types';

const StyleSelector = (props) => {
  return (
    <div className="styleSelector">
      <div id="styleSelectorName">Style &gt; {props.currentStyle.name}</div>
      <div id="styleSelectorStyles">
        { props.styles.length > 0 ? 
          props.styles.map((style, index) => (
            <div key={style.style_id} className="styleContainer">
              <img
                className="styleThumbnail"
                onClick={event => {
                  props.handleStyleChange(event.target.attributes[3].value);
                }}
                src={style.photos[0].thumbnail_url}
                alt={`Image Thumbnail ${style.name}`}
                index={index}
                id={`styleThumbnail${index}`}
              />
            </div>
          )) : null
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