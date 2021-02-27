import React from 'react';
import { shallow, mount } from 'enzyme';
import RelatedAndOutfits from '../client/src/components/RelatedOutfit/RelatedAndOutfits.jsx';

describe('Rendering Components', () => {

  it ('should render without throwing an error', () => {
    shallow(<RelatedAndOutfits />);
  });

});