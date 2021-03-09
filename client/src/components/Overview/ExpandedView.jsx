import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ExpandedView = ({ photos, changeView, imageIndex, handleImageIndexChange, setImageIndex }) => {

  const [ isZoomed, setIsZoom ] = useState(false)

  return (
    <div className="expandedView">
    { !isZoomed ? 
      <div id="noZoomExpanded">
        <div id="expandedViewImageContainer">
          <img
            src={photos[imageIndex] ? photos[imageIndex].url : "https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png"}
            id ="expandedViewImage"
          />
        </div>
        <div className="expandedButtonContainer" id="closeExpandedButtonContainer">
          <button
            className="expandedButton"
            id="closeExpandedButton"
            onClick={() => changeView()}
            ><ion-icon name="close-sharp"></ion-icon>
          </button>
        </div>
        { imageIndex > 0 ?
          <div className="expandedButtonContainer"id="leftExpandedButtonContainer">
            <button
              className="expandedButton"
              id="leftExpandedButton"
              onClick={() => {handleImageIndexChange(-1)}}
              ><ion-icon name="arrow-back-sharp"></ion-icon>
            </button>
          </div> : null
        }
        { imageIndex < (photos.length - 1) ?
          <div className="expandedButtonContainer"id="rightExpandedButtonContainer">
            <button
              className="expandedButton"
              id="rightExpandedButton"
              onClick={() => {handleImageIndexChange(1)}}
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
                onClick={(e) => {setImageIndex(Number(event.target.attributes[1].value))}}
              ></ion-icon>
            </div>
          ))}
        </div>
      </div> :
      <div id="zoomExpanded">
        <div></div>
      </div>
    }
    </div>
  )
  ExpandedView.propTypes = {
    photos: PropTypes.array,
    changeView: PropTypes.func,
    imageIndex: PropTypes.number,
    setImageIndex: PropTypes.func,
    handleImageIndexChange: PropTypes.func
  }
};

export default ExpandedView;