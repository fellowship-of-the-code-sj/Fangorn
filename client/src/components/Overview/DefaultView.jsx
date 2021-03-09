import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DefaultViewThumbnail from './DefaultViewThumbnail.jsx';

const DefaultView = (props) => {

  const [ imageIndex, setImageIndex ] = useState(0);

  const handleImageIndexChange = (increment) => {
    let newIndex = imageIndex + increment;
    setImageIndex(newIndex);
  }
  
  const ref = useRef(null);
  
  const scroll = (scrollDistance) => {
    ref.current.scrollTop += scrollDistance;
  }

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
      <div id="defaultViewThumbnailsContainer" >
        {props.photos && props.photos.length > 7 ? 
          <div className="scrollButtonContainer">
            <button
            className="scrollButton"
            id="scrollUp"
            onClick={(e) => {
              event.preventDefault();
              scroll(-60);
            }}
            ><ion-icon name="caret-up-sharp"></ion-icon></button>
          </div> :
          null
        }
        <div id="defaultViewThumbnailsScroll" ref={ ref }>
          <div id="defaultViewThumbnails">
            {props.photos ?
              props.photos.map((photo, index) => (
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
        {props.photos && props.photos.length > 7 ? 
          <div className="scrollButtonContainer">
            <button
            className="scrollButton"
            id="scrollDown"
            onClick={(e) => {
              event.preventDefault();
              scroll(60);
            }}
            ><ion-icon name="caret-down-sharp"></ion-icon></button>
          </div> :
          null
        }
      </div>
      { imageIndex > 0 ?
        <div className="defaultImageButtonContainer" id="leftDefaultButton">
          <button
            className="defaultViewButton"
            onClick={() => {handleImageIndexChange(-1)}}
          ><ion-icon name="arrow-back-sharp"></ion-icon></button>
        </div> : null
      }
      { props.photos && (imageIndex < (props.photos.length - 1)) ?
        <div className="defaultImageButtonContainer" id="rightDefaultButton">
          <button
          className="defaultViewButton"
          onClick={() => {handleImageIndexChange(1)}}
          ><ion-icon name="arrow-forward-sharp"></ion-icon></button>
        </div> : null
      }
    </div>
  )

  DefaultView.propTypes = {
    photos: PropTypes.array
  }
}

export default DefaultView;

{/* <div
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
</div> */}