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
            // <div key={style.style_id} className="style_thumbnail" onClick={event => {
            //   event.persist();
            //   console.log(event);
            // }}>
            //   <img
            //     src={style.photos[0].thumbnail_url}
            //     alt={`Image Thumbnail ${style.name}`}
            //     height="30"
            //     width="30"
            //     index={index}
            //   />
            // </div>
            <img
              key={style.style_id}
              className="style_thumbnail"
              onClick={event => {
                event.persist();
                props.handleStyleChange(event.target.attributes[5].value)
              }}
              src={style.photos[0].thumbnail_url}
              alt={`Image Thumbnail ${style.name}`}
              height="30"
              width="30"
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