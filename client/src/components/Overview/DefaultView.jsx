import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DefaultView = (props) => {

  const [ imageIndex, setImageIndex ] = useState(0);

  return (
    <div className="defaultView">
      <div id="defaultViewImageContainer">
        { props.photos ?
          <img 
            src={props.photos[imageIndex].url ? props.photos[imageIndex].url : 'https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png'}
            id="defaultViewImage"
          /> : <img src="" />
        }
        
      </div>
      <div id="defaultViewThumbnails">
        {props.photos ?
          props.photos.map((photo, index) => (
            <div
              key={index}
              className="imageThumbnailContainer"
              id={props.photos[imageIndex].thumbnail_url === photo.thumbnail_url ? 'selectedThumbnailImage' : null}>
              <img
                className="imageThumbnail"
                src={photo.thumbnail_url ? photo.thumbnail_url : 'https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png'}
                alt={`Style Thumbnail`}
                index={index}
                id={`imageThumbnail${index}`}
                onClick={(event) => {setImageIndex(event.target.attributes[3].value)}}
              />
            </div>
          )) : null
        }
      </div>
      { imageIndex > 0 ?
        <div className="defaultButtonContainer" id="leftDefaultButton">
          <button className="defaultViewButton" onClick={event => {let newIndex = imageIndex - 1; setImageIndex(newIndex)}}>{'<'}</button>
        </div> : null
      }
      { props.photos && (imageIndex < (props.photos.length - 1)) ?
        <div className="defaultButtonContainer" id="rightDefaultButton">
          <button className="defaultViewButton"onClick={event => {let newIndex = imageIndex + 1; setImageIndex(newIndex)}}>{'>'}</button>
        </div> : null
      }
    </div>
  )

  DefaultView.propTypes = {
    photos: PropTypes.array
  }
}

export default DefaultView;