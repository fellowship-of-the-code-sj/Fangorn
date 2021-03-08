import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ query, handleQueryInput }) => {
  return (
    <div className="QA-search-bar flex">
      <div className="flex-grow">
        <input
          type="text"
          name="search"
          value={query}
          onChange={handleQueryInput}
          placeholder="Have a question? Search for answers…">
        </input>
      </div>
      <div>
        <ion-icon name="search-outline" size="large"></ion-icon>
      </div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  query: PropTypes.string,
  handleQueryInput: PropTypes.func
};