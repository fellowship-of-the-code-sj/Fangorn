import React from 'react';

const captureInteractions = module => {
  return function decorator(WrappedComponent) {
    return function decoratedComponent(props) {
      const doSomething = e => {
        const currentDate = new Date();
        console.log('stealing your data..');
        console.log('\telement:', e.target.nodeName);
        console.log('\ttime:', currentDate.toUTCString());
        console.log('\tmodule:', module);
        console.log('thanks bro');
      };

      return <WrappedComponent doSomething={doSomething} {...props} />
    }
  };
};

export default captureInteractions;