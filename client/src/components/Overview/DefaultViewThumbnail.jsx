import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import captureOverview from '../../hoc/captureOverview';

const DefaultViewThumbnail = ({ photo, index, imageIndex, setImageIndex, logger }) => {

  useEffect(() => {
    setImageIndex(imageIndex);
  }, [imageIndex])

  return (
    <div
      className="imageThumbnailContainer"
      key={index}
      id={index === imageIndex ? 'selectedThumbnailImage' : null}>
        <img
          className="imageThumbnail"
          src={photo.thumbnail_url ? photo.thumbnail_url : 'https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png'}
          alt={`Style Thumbnail`}
          index={index}
          id={`imageThumbnail${index}`}
          onClick={e => {
            setImageIndex(Number(e.target.attributes[3].value));
            logger(e)
          }}
        />
    </div>
  )

  DefaultViewThumbnail.propTypes = {
    photo: PropTypes.object,
    index: PropTypes.number,
    imageIndex: PropTypes.number,
    setImageIndex: PropTypes.func,
    logger: PropTypes.func
  }
}

export default captureOverview(DefaultViewThumbnail);