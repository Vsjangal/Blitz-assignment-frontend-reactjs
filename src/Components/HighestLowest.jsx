import React from "react";

const HighestLowest = ({
  findHighestLowest,
  highestCountry,
  lowestCountry,
}) => {
  return (
    <div id="get-highest-lowest">
      <button onClick={findHighestLowest}>Find Highest/Lowest</button>
      <p>
        Highest number of universities are in:{" "}
        <span id="highestCountry">{highestCountry}</span>
      </p>
      <p>
        Lowest number of universities are in:{" "}
        <span id="lowestCountry">{lowestCountry}</span>
      </p>
    </div>
  );
};

export default HighestLowest;
