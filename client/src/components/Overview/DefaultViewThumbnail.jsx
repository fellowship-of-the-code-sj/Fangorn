import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const DefaultViewThumbnail = ({ photo, index, imageIndex, setImageIndex }) => {

  useEffect(() => {
    setImageIndex(imageIndex);
  }, [imageIndex])

  return (
    <div
      className="imageThumbnailContainer"
      id={index === imageIndex ? 'selectedThumbnailImage' : null}>
      <img
        className="imageThumbnail"
        src={photo.thumbnail_url ? photo.thumbnail_url : 'https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png'}
        alt={`Style Thumbnail`}
        index={index}
        id={`imageThumbnail${index}`}
        onClick={(event) => {setImageIndex(Number(event.target.attributes[3].value))}}
      />
    </div>
  )

  DefaultViewThumbnail.propTypes = {
    photo: PropTypes.object,
    index: PropTypes.number,
    imageIndex: PropTypes.number,
    setImageIndex: PropTypes.func
  }
}

export default DefaultViewThumbnail