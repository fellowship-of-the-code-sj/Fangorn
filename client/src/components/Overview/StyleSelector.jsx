import React from 'react';
import PropTypes from 'prop-types';

const StyleSelector = (props) => {
  return (
    <div className="styleSelector">
      <div id="styleSelectorName">Style: {props.currentStyle.name}</div>
      <div id="styleSelectorStyles">
        { props.styles.length > 0 ? 
          props.styles.map((style, index) => (
            <img
              key={style.style_id}
              className="styleThumbnail"
              onClick={event => {
                // console.log(event.target.attributes)
                props.handleStyleChange(event.target.attributes[4].value)
              }}
              src={style.photos[0].thumbnail_url}
              alt={`Image Thumbnail ${style.name}`}
              height="50"
              // width="50"
              index={index}
              id={`styleThumbnail${index}`}
            />
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