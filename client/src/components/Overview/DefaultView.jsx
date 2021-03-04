import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DefaultView = (props) => {

  const [ imageIndex, setImageIndex ] = useState(0);

  return (
    <div className="defaultView">
      <div id="defaultViewImage">
        { props.photos ?
          <img 
            src={`${props.photos[imageIndex].url}`}
            height="200"
            // width="200"
          /> : <img src="" />
        }
        
      </div>
      <div id="defaultViewThumbnailsContainer">
        {props.photos ?
          props.photos.map((photo, index) => {
            return (
              <img
                key={index}
                className="defaultViewThumbnail"
                src={photo.thumbnail_url}
                alt={`Style Thumbnail`}
                height="50"
                // width="50"
                index={index}
                id={`defaultViewThumbnail${index}`}
                onClick={(event) => {setImageIndex(event.target.attributes[4].value)}}
              />
            )
          }) : null
        }
      </div>
    </div>
  )

  DefaultView.propTypes = {
    photos: PropTypes.array
  }
}

export default DefaultView;