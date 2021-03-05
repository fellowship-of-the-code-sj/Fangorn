import React from 'react';
import PropTypes from 'prop-types';

const ComparisonTable = ({ comparisionList, currentProductName, relatedProductName }) => {
  return (
    <table className='innerModal'>
      <thead>
        <tr>
          <th>{currentProductName}</th>
          <th></th>
          <th>{relatedProductName}</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(comparisionList).map((feature, index) => {
            return (
            <tr key={index}>
              {
                comparisionList[feature][0]?
                <td>✓</td>
                : <td> </td>
              }
              <td>{feature}</td>
              {
                comparisionList[feature][1]?
                <td>✓</td>
                : <td> </td>
              }
            </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default ComparisonTable;

ComparisonTable.propTypes = {
  comparisionList: PropTypes.object,
  currentProductName: PropTypes.string,
  relatedProductName: PropTypes.string
}