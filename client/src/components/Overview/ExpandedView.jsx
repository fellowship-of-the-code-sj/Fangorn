import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ExpandedView = ({ photos, changeView, imageIndex, handleImageIndexChange, setImageIndex }) => {

  const [ isZoomed, setIsZoom ] = useState(false)

  return (
    <div className="expandedView" onClick={() => changeView()}>
    { !isZoomed ? 
      <div id="noZoomExpanded">
        <div id="expandedViewImageContainer">
          <img
            src={photos[imageIndex] ? photos[imageIndex].url : "https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png"}
            id ="expandedViewImage"
          />
        </div>
        <div id="closeExpandedButton"></div>
        <div id="leftExpandedButton"></div>
        <div id="rightExpandedButton"></div>
        <div id="expandedViewIcons"></div>
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