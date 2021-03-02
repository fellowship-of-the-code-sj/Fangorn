import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import axiosHelper from '../client/helperFunctions/serverRequest.js';
import axios from 'axios';
import dummyData from './dummyData.js';
import { act } from 'react-dom/test-utils';

import RelatedAndOutfits from '../client/src/components/RelatedOutfit/RelatedAndOutfits.jsx';
import RelatedItemsList from '../client/src/components/RelatedOutfit/RelatedItemsList.jsx';
import RelatedItemCard from '../client/src/components/RelatedOutfit/RelatedItemCard.jsx';
import OutfitList from '../client/src/components/RelatedOutfit/OutfitList.jsx';
import OutfitListCard from '../client/src/components/RelatedOutfit/OutfitListCard.jsx';

const port = 404;

describe('Rendering Components', () => {

  it ('should render without throwing an error', () => {
    shallow(<RelatedAndOutfits />);
    shallow(<RelatedItemsList relatedItemsList={[]}/>);
    shallow(<OutfitList outfitList={[]}/>);
    shallow(<RelatedItemCard cardData={dummyData.products[0]}/>);
    shallow(<OutfitListCard  />)
  });

  it ('should render relatedItems list with dummy data passed', () => {
    const wrapper = shallow(<RelatedAndOutfits />);;
    expect(wrapper.find('h3')).toHaveLength(2);
  });

  it ('should render relatedItems list with dummy data passed', () => {
    const wrapper = shallow(<RelatedItemsList relatedItemsList={dummyData.products}/>);
    expect(wrapper.find('RelatedItemCard')).toHaveLength(2);
  });

  it ('should render relatedItemsCard div', () => {
    const wrapper = shallow(<RelatedItemCard cardData={dummyData.products[0]} />);
    expect(wrapper.contains(
      <div className="relatedItemCard">
        <h6 className="category">Accessories</h6>
        <h5 className="name">Bright Future Sunglasses</h5>
        <h6 className="price">69.00</h6>
      </div>
    )).toBe(true);
  });

  it ('should render outfitList list with dummy data passed', () => {
    const wrapper = shallow(<OutfitList outfitList={dummyData.products}/>);
    expect(wrapper.find('OutfitListCard')).toHaveLength(2);
  });

  it ('should render relatedItemsCard div', () => {
    const wrapper = shallow(<OutfitListCard/>);
    expect(wrapper.contains(<div className='outfitListCard'></div>))
  });

});

// describe('Server Request', () => {
//   it('should make successful request to server', async () => {
//     await axios.get(`http://localhost:${port}/RelatedItems`, {
//       params: {itemId: 13023}
//     })
//       .then((result) => {
//         expect(result.status).toBe(200);
//       });
//   });
// });


  // it ('should render all Related Components', async () => {

  //   const wrapper = mount(<RelatedAndOutfits  productID ={13023}/>);
  //   await act(async () => {
  //     await Promise.resolve(wrapper)
  //     // await new Promise(resolve => setImmediate(resolve));
  //     // wrapper.update()
  //     .then(() => {
  //       console.log(wrapper.find('div').length);
  //     })

  //   });
  //   // expect(wrapper.contains('.relatedItem')).toHaveLength(5);

  //   //expect(wrapper.contains(<div className='relatedItemsList'><div></div></div>)).toBe(true);
  // });