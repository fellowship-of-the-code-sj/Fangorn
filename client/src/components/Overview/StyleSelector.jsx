import React from 'react';
import PropTypes from 'prop-types';

const StyleSelector = (props) => {
  return (
    <div className="styleSelector">
      <div id="styleSelectorName">Style &gt; {props.currentStyle.name}</div>
      <div id="styleSelectorStyles">
        { props.styles.length > 0 ? 
          props.styles.map((style, index) => (
            <div 
              key={style.style_id} 
              className="styleContainer"
              id={props.currentStyle.photos[0].thumbnail_url === style.photos[0].thumbnail_url ? 'selectedStyleImage': null}
            >
              {props.currentStyle.photos[0].thumbnail_url === style.photos[0].thumbnail_url ?
              <div id="selectedStyleCheckmark"><ion-icon name="checkmark-circle"></ion-icon></div>
              : null}
              <img
                className="styleThumbnail"
                onClick={event => {
                  props.handleStyleChange(event.target.attributes[3].value);
                  props.logger(event);
                }}
                src={style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : 'https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png' }
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
    handleStyleChange: PropTypes.func,
    logger: PropTypes.func
  }
}

export default StyleSelector;