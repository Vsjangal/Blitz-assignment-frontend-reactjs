import React from "react";

const SearchBar = ({ countryInput, setCountryInput, searchUniversities }) => {
  return (
    <div id="search-university">
      <input
        type="text"
        id="countryInput1"
        placeholder="Enter country name"
        value={countryInput}
        onChange={(e) => setCountryInput(e.target.value)}
      />
      <button onClick={searchUniversities}>Search</button>
    </div>
  );
};

export default SearchBar;
