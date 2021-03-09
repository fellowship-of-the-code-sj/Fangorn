import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ExpandedView = (props) => {
  return (<div className="expandedView" onClick={() => props.changeView()}></div>)
  ExpandedView.propTypes = {
    photos: PropTypes.array,
    changeView: PropTypes.func
  }
};

export default ExpandedView;