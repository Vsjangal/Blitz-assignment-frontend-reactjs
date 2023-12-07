import React from "react";

const UniversityList = ({ universities }) => {
  return (
    <ul>
      {universities.map((university, index) => (
        <li key={index}>{university.name}</li>
      ))}
    </ul>
  );
};

export default UniversityList;
