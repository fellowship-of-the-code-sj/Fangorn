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
import StarRating from '../client/src/components/RelatedOutfit/StarRating.jsx';
import RelatedActionButton from '../client/src/components/RelatedOutfit/RelatedActionButton.jsx';
import OutfitActionButton from '../client/src/components/RelatedOutfit/OutfitActionButton.jsx'

const port = 404;

describe('Rendering Components', () => {

  it ('should render without throwing an error', () => {
    shallow(<RelatedAndOutfits />);
    shallow(<RelatedItemsList relatedItemsList={[]}/>);
    shallow(<OutfitList outfitList={[]}/>);
    shallow(<RelatedItemCard cardData={dummyData.products[0]}/>);
    shallow(<OutfitListCard cardData={dummyData.products[0]} />)
    shallow(<StarRating rating={'0%'}/>);
    shallow(<RelatedActionButton />);
  });

});

describe('Rendering RelatedItems List Components', () => {

  it ('should render relatedItems list with dummy data passed', () => {
    const wrapper = shallow(<RelatedAndOutfits />);;
    expect(wrapper.find('h3')).toHaveLength(2);
  });

  it ('should render relatedItems list with dummy data passed', () => {
    const wrapper = shallow(<RelatedItemsList relatedItemsList={dummyData.products}/>);
    expect(wrapper.find('RelatedItemCard')).toHaveLength(4);
  });
});

describe('Rendering RelatedItems Card Components', () => {
  it ('should render relatedItemsCard div', () => {
    const wrapper = shallow(<RelatedItemCard cardData={dummyData.products[0]} />);
    expect(wrapper.containsAllMatchingElements([
        <img className="relatedProductImg" src='https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png' />,
        <h6 className="category">Accessories</h6>,
        <h5 className="name">Bright Future Sunglasses</h5>,
        <h6 className="price">69.00</h6>
    ])).toBe(true);
  });

  it ('should render the sales price if it exists in relatedItemsCard', () => {
    //component isn't on sale
    const wrapper = shallow(<RelatedItemCard cardData={dummyData.products[0]} />);
    expect(wrapper.contains(<h6 className="price">69.00</h6>)).toBe(true);

    //component is on sale
    const wrapper2 = shallow(<RelatedItemCard cardData={dummyData.products[1]} />);
    expect(wrapper2.contains(<h6 className="salePrice">30.00</h6>)).toBe(true);
  });

  it('should render the image if it exists in the relatedItemsCard', () => {
    //component contains no images
    const wrapper = shallow(<RelatedItemCard cardData={dummyData.products[0]} />);
    expect(wrapper.contains(<img className='relatedProductImg' src="https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png"></img>)).toBe(true);

    //component containes images
    const wrapper2 = shallow(<RelatedItemCard cardData={dummyData.products[1]} />);
    expect(wrapper2.contains(<img className='relatedProductImg' src="https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"></img>)).toBe(true);

  });

});

describe('Rendering StarRating Component', () => {

  it('should render correct ratings for the specific item', () => {
    //renders no rating if rating isn't provided
    const wrapper = shallow(<StarRating cardData={dummyData.products[1]} />);
    expect(wrapper.contains(<div style={ { width: '0%' } } className="star-top" ></div>));

    //renders rating if rating is provided
    const wrapper2 = shallow(<StarRating cardData={dummyData.products[0]} />);
    expect(wrapper2.contains(<div style={ { width: '72%' } } className="star-top" ></div>));
  });

})

describe('Rendering RelatedActionButton Component', () => {

  it ('should render update state click event', () => {
    var testState = true;
    var clickListener = () => {
      testState = !testState;
    }

    const wrapper = shallow(<RelatedActionButton actionButtonListener={clickListener}/>)
    expect(wrapper.find('span')).toHaveLength(1);

    //simulate button click
    wrapper.find('span').simulate('click');
    expect(testState).toEqual(false);
  });

});

describe('Rendering Related Items List Behavior', () => {

  it ('should render with no slider buttons if list is shorter then 5 items', () => {
    const wrapper = shallow(<RelatedItemsList relatedItemsList={dummyData.products.slice(0,4)}/>);
    expect(wrapper.find('.carouselRightButton')).toHaveLength(0);
  });

  it ('should render with right slider buttons if list is longer then 4 items', () => {
    const wrapper = shallow(<RelatedItemsList relatedItemsList={dummyData.products}/>);
    expect(wrapper.find('.carouselRightButton')).toHaveLength(1);
  });

  it ('should render the left slide button when the list is moved to the right' , () => {
    const wrapper = shallow(<RelatedItemsList relatedItemsList={dummyData.products}/>);
    wrapper.find('.carouselRightButton').simulate('click');
    expect(wrapper.find('.carouselLeftButton')).toHaveLength(1);
  });

  it ('should remove the left side button when the list reaches the end of the left' , () => {
    const wrapper = shallow(<RelatedItemsList relatedItemsList={dummyData.products}/>);
    wrapper.find('.carouselRightButton').simulate('click');
    wrapper.find('.carouselLeftButton').simulate('click');
    expect(wrapper.find('.carouselLeftButton')).toHaveLength(0);
  });


});

describe('Rendering OutfitList List Component', () => {

  it ('should render outfitList list with dummy data passed', () => {
    const wrapper = shallow(<OutfitList />);
    expect(wrapper.find('.relatedItemsList')).toHaveLength(1);
  });
});

describe('Rendering OutfitList List Card Component', () => {

  it ('should render outfitListCard div', () => {
    const wrapper = shallow(<OutfitListCard cardData={dummyData.products[0]}/>);
    expect(wrapper.containsAllMatchingElements([
      <img className="relatedProductImg" src='https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png' />,
      <h6 className="category">Accessories</h6>,
      <h5 className="name">Bright Future Sunglasses</h5>,
      <h6 className="price">69.00</h6>
    ])).toBe(true);
  });

  it ('should render the sales price if it exists in relatedItemsCard', () => {
    //component isn't on sale
    const wrapper = shallow(<OutfitListCard cardData={dummyData.products[0]} />);
    expect(wrapper.contains(<h6 className="price">69.00</h6>)).toBe(true);

    //component is on sale
    const wrapper2 = shallow(<OutfitListCard cardData={dummyData.products[1]} />);
    expect(wrapper2.contains(<h6 className="salePrice">30.00</h6>)).toBe(true);
  });

  it('should render the image if it exists in the relatedItemsCard', () => {
    //component contains no images
    const wrapper = shallow(<OutfitListCard cardData={dummyData.products[0]} />);
    expect(wrapper.contains(<img className='relatedProductImg' src="https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png"></img>)).toBe(true);

    //component containes images
    const wrapper2 = shallow(<OutfitListCard cardData={dummyData.products[1]} />);
    expect(wrapper2.contains(<img className='relatedProductImg' src="https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"></img>)).toBe(true);

  });

});

describe('Rendering Outfit List Behavior', () => {

  it ('should render outfit card component when it is added to outfit list', () => {
    const wrapper = shallow(<OutfitList relatedItemsList={dummyData.products.slice(0,4)}/>);
    wrapper.find('.outfitAddItemCard').simulate('click');
    expect(wrapper.find('OutfitListCard')).toHaveLength(1);
  });

  it ('should render with no slider buttons if list is shorter then 5 items', () => {
    const wrapper = shallow(<OutfitList relatedItemsList={dummyData.products.slice(0,4)}/>);
    expect(wrapper.find('.carouselRightButton')).toHaveLength(0);
  });


  it ('should render with right slide buttons if list is longer then 4 items', () => {
    const wrapper = shallow(<OutfitList relatedItemsList={dummyData.products}/>);
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    expect(wrapper.find('.carouselRightButton')).toHaveLength(1);
  });

  it ('should render the left slide button when the list is moved to the right' , () => {
    const wrapper = shallow(<OutfitList relatedItemsList={dummyData.products}/>);
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.carouselRightButton').simulate('click');
    expect(wrapper.find('.carouselLeftButton')).toHaveLength(1);
  });

  it ('should remove the left side button when the list reaches the end of the left and add the right' , () => {
    const wrapper = shallow(<OutfitList relatedItemsList={dummyData.products}/>);
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.outfitAddItemCard').simulate('click');
    wrapper.find('.carouselRightButton').simulate('click');
    expect(wrapper.find('.carouselLeftButton')).toHaveLength(1);
    wrapper.find('.carouselLeftButton').simulate('click');
    expect(wrapper.find('.carouselLeftButton')).toHaveLength(0);
  });

});

describe('rendering action button', () => {

  it ('should render the action button', () => {
    const wrapper = shallow(<OutfitActionButton />);
    expect(wrapper.find('.OutfitActionButton')).toHaveLength(1);
  });

  it ('should excecute event listener function that is passed it', () => {

    var tempState = false;
    var changeState = () => {
      tempState = !tempState;
    }

    const wrapper = shallow(<OutfitActionButton removeOutfitItem={changeState}/>);
    wrapper.find('.OutfitActionButton').simulate('click');
    expect(tempState).toBe(true);
  })

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