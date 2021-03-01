import React from 'react';
import { shallow, mount } from 'enzyme';
import RelatedAndOutfits from '../client/src/components/RelatedOutfit/RelatedAndOutfits.jsx';
import axiosHelper from '../client/helperFunctions/serverRequest.js';

const port = 404;

describe('Rendering Components', () => {

  it ('should render without throwing an error', () => {
    shallow(<RelatedAndOutfits />);
  });

});



// describe('Server Request', () => {

//   test ('should get a 200 status response for a request to endpoint /RelatedItems', (done) => {
//     axiosHelper.get(`http://localhost:${port}/RelatedItems`, {itemId: 13023}, (data) => {
//       try {
//         console.log(data);
//         done();
//       } catch (error) {
//         done(error);
//       }
//       //expect(data.status).toEqual(200);
//     });

//   });

// });