import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ query, handleQueryInput }) => {
  return (
    <div>
      <input
        type="text"
        name="search"
        value={query}
        onChange={handleQueryInput}
        placeholder="Have a question? Search for answers…"></input>
    </div>
  );
};

export default Search;

Search.propTypes = {
  query: PropTypes.string,
  handleQueryInput: PropTypes.func
};