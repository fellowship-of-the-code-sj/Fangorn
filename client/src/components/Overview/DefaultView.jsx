import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DefaultViewThumbnail from './DefaultViewThumbnail.jsx';
import captureOverview from '../../hoc/captureOverview';

const DefaultView = ({ photos, changeView, imageIndex, handleImageIndexChange, setImageIndex, logger }) => {

  const ref = useRef(null);

  const scroll = (scrollDistance) => {
    ref.current.scrollTop += scrollDistance;
  }

  return (
    <div className="defaultView">
      <div id="defaultViewImageContainer" onClick={e => {changeView(); logger(e);}}>
        { photos ?
          <img
            rel="preload"
            src={photos[imageIndex].url ? photos[imageIndex].url : 'https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png'}
            id="defaultViewImage"
          /> : <img src="" />
        }

      </div>
      <div id="defaultViewThumbnailsContainer" >
        {photos && photos.length > 7 ?
          <div className="scrollButtonContainer">
            <button
            className="scrollButton"
            id="scrollUp"
            onClick={e => {
              scroll(-60);
              logger(e);
            }}
            ><ion-icon name="caret-up-sharp"></ion-icon></button>
          </div> :
          null
        }
        <div id="defaultViewThumbnailsScroll" ref={ ref }>
          <div id="defaultViewThumbnails">
            {photos ?
              photos.map((photo, index) => (
                <DefaultViewThumbnail
                  key={index}
                  photo={ photo }
                  index={ index }
                  imageIndex = { imageIndex }
                  setImageIndex = { setImageIndex }
                />
              )) : null
            }
          </div>
        </div>
        {photos && photos.length > 7 ?
          <div className="scrollButtonContainer">
            <button
            className="scrollButton"
            id="scrollDown"
            onClick={e => {
              scroll(60);
              logger(e);
            }}
            ><ion-icon name="caret-down-sharp"></ion-icon></button>
          </div> :
          null
        }
      </div>
      { imageIndex > 0 ?
        <div className="defaultImageButtonContainer" id="leftDefaultButtonContainer">
          <button
            className="defaultViewButton"
            id="leftDefaultButton"
            onClick={e => {
              handleImageIndexChange(-1);
              scroll(-60);
              logger(e);
            }}
          ><ion-icon name="arrow-back-sharp"></ion-icon></button>
        </div> : null
      }
      { photos && (imageIndex < (photos.length - 1)) ?
        <div className="defaultImageButtonContainer" id="rightDefaultButtonContainer">
          <button
          className="defaultViewButton"
          id="rightDefaultButton"
          onClick={e => {
            handleImageIndexChange(1);
            scroll(60);
            logger(e);
          }}
          ><ion-icon name="arrow-forward-sharp"></ion-icon></button>
        </div> : null
      }
    </div>
  )

  DefaultView.propTypes = {
    photos: PropTypes.array,
    changeView: PropTypes.func,
    imageIndex: PropTypes.number,
    setImageIndex: PropTypes.func,
    handleImageIndexChange: PropTypes.func,
    logger: PropTypes.func
  }
}

export default captureOverview(DefaultView);
