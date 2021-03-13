import React from 'react';
import PropTypes from 'prop-types';
import captureOverview from '../../hoc/captureOverview';

const StyleSelector = ({ styles, currentStyle, handleStyleChange, logger }) => {
  return (
    <div className="styleSelector">
      <div id="styleSelectorName">
        <span id="styleLabel">STYLE &gt; </span>
        <span id="styleName">{currentStyle.name}</span>
      </div>
      <div id="styleSelectorStyles">
        { styles.length > 0 ? 
          styles.map((style, index) => (
            <div 
              key={style.style_id} 
              className="styleContainer"
              id={currentStyle.photos[0].thumbnail_url === style.photos[0].thumbnail_url ? 'selectedStyleImage': null}
            >
              {currentStyle.photos[0].thumbnail_url === style.photos[0].thumbnail_url ?
              <div id="selectedStyleCheckmark"><ion-icon name="checkmark-circle"></ion-icon></div>
              : null}
              <img
                className="styleThumbnail"
                onClick={e => {
                  handleStyleChange(e.target.attributes[3].value);
                  logger(e);
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

export default captureOverview(StyleSelector);