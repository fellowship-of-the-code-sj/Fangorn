import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Zoom from 'react-img-zoom';
import captureOverview from '../../hoc/captureOverview';

const ExpandedView = ({ photos, changeView, imageIndex, handleImageIndexChange, setImageIndex, logger }) => {

  const [ isZoomed, setIsZoomed ] = useState(false)

  return (
    <div className="expandedView">
    { !isZoomed ? 
      <div id="noZoomExpanded">
        <div id="expandedViewImageContainer">
          <img
            src={photos[imageIndex] ? photos[imageIndex].url : "https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png"}
            id ="expandedViewImage"
            alt="Expanded Image"
            onClick={e =>{
              setIsZoomed(true);
              logger(e);
            }}
          />
        </div>
        <div className="expandedButtonContainer" id="closeExpandedButtonContainer">
          <button
            className="expandedButton"
            id="closeExpandedButton"
            onClick={e => {
              changeView();
              logger(e);
            }}
            ><ion-icon name="close-sharp"></ion-icon>
          </button>
        </div>
        { imageIndex > 0 ?
          <div className="expandedButtonContainer"id="leftExpandedButtonContainer">
            <button
              className="expandedButton"
              id="leftExpandedButton"
              onClick={e => {
                handleImageIndexChange(-1);
                logger(e);
              }}
              ><ion-icon name="arrow-back-sharp"></ion-icon>
            </button>
          </div> : null
        }
        { imageIndex < (photos.length - 1) ?
          <div className="expandedButtonContainer"id="rightExpandedButtonContainer">
            <button
              className="expandedButton"
              id="rightExpandedButton"
              onClick={e => {
                handleImageIndexChange(1);
                logger(e);
              }}
              ><ion-icon name="arrow-forward-sharp"></ion-icon>
            </button>
          </div> : null
        }
        <div id="expandedViewIconsContainer">
          {photos.map((photo, i) => (
            <div key={i} id={i === imageIndex ? 'selectedIcon' : null}>
              <ion-icon 
                name="stop-sharp"
                index={i}
                onClick={e => {
                  setImageIndex(Number(e.target.attributes[1].value));
                  logger(e);
                }}
              ></ion-icon>
            </div>
          ))}
        </div>
      </div> :
      <div id="zoomExpanded">
        <div
          id="zoomViewImageContainer"
          onClick={e => {
            setIsZoomed(false);
            logger(e);
          }}
        >
          <Zoom
            img={photos[imageIndex].url}
            zoomScale={2.5}
            width={1110}
            height={700}
          />
        </div>
      </div>
    }
    </div>
  )
  ExpandedView.propTypes = {
    photos: PropTypes.array,
    changeView: PropTypes.func,
    imageIndex: PropTypes.number,
    setImageIndex: PropTypes.func,
    handleImageIndexChange: PropTypes.func,
    logger: PropTypes.func
  }
};

export default captureOverview(ExpandedView);