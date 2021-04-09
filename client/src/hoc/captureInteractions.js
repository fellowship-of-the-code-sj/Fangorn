import React from 'react';
import axios from 'axios';
import URL from '../URL';

// const captureInteractions = widget => {
//   return function decorator(WrappedComponent) {
//     return function decoratedComponent(props) {
//       const logger = e => {
//         const currentDate = new Date();
//         console.log('stealing your data..');
//         console.log('\telement:', e.target.nodeName);
//         console.log('\ttime:', currentDate.toUTCString());
//         console.log('\twidget:', widget);
//         console.log('thanks bro');
//       };

//       return <WrappedComponent logger={logger} {...props} />
//     }
//   };
// };

const captureInteractions = widget => {
  return function decorator(WrappedComponent) {
    return function decoratedComponent(props) {
      const logger = e => {
        const currentDate = new Date();
        console.log('stealing your data..');
        const bodyParams = {
          element: e.target.nodeName,
          time: currentDate.toUTCString(),
          widget
        };

        axios.post(`/interactions/`, bodyParams)
          .then(() => console.log('logged'))
          .catch(err => console.error(err));
      };

      return <WrappedComponent logger={logger} {...props} />
    }
  };
};

export default captureInteractions;