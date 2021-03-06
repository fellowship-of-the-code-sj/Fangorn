import React from 'react';
import PropTypes from 'prop-types';

const ComparisonTable = ({ comparisionList, currentProductName, relatedProductName }) => {
  return (
    <div className='innerModal'>
      <div className='comparingItems'>COMPARING</div>
      <table >
        <thead className='modalHead'>
          <tr>
            <th className='leftTitle' >{currentProductName}</th>
            <th></th>
            <th className='rightTitle' >{relatedProductName}</th>
          </tr>
        </thead>
        <tbody className='modalBody'>
          {
            Object.keys(comparisionList).map((feature, index) => {
              return (
              <tr key={index}>
                {
                  comparisionList[feature][0]?
                  <td className='leftCheckMark' ><ion-icon name="checkmark-outline"></ion-icon></td>
                  : <td className='leftCheckMark' > </td>
                }
                <td className='centerFeature' >{feature}</td>
                {
                  comparisionList[feature][1]?
                  <td className='rightCheckMark' ><ion-icon name="checkmark-outline"></ion-icon></td>
                  : <td className='rightCheckMark' > </td>
                }
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable;

ComparisonTable.propTypes = {
  comparisionList: PropTypes.object,
  currentProductName: PropTypes.string,
  relatedProductName: PropTypes.string
}