import React, { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import UniversityList from "./Components/UniversityList";
import HighestLowest from "./Components/HighestLowest";
import "./App.css";
import LoadingAnimation from "./Components/LoadingAnimation";

const apiUrl = "http://universities.hipolabs.com/search?country=";

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [universities, setUniversities] = useState([]);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [highestCountry, setHighestCountry] = useState("");
  const [lowestCountry, setLowestCountry] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  // will render once automatically
  //   findHighestLowest(); 
  // }, []);

  const fetchUniversities = async (country) => {
    try {
      setLoading(true);
      const api = apiUrl + country;
      const response = await fetch(api);
      const universitiesData = await response.json();

      if (universitiesData.length === 0) {
        alert(
          "No universities found for the entered country. Please enter a valid country name."
        );
        return [];
      }

      return universitiesData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateUniversityList = (universities) => {
    setUniversities(universities);
  };

  const searchUniversities = async () => {
    if (countryInput === "") {
      setUniversities([]);
      setTotalUniversities(0);
      alert("Please enter a country name");
      return;
    }

    const universitiesData = await fetchUniversities(countryInput);
    updateUniversityList(universitiesData);
    setTotalUniversities(universitiesData.length);
  };

  const findHighestLowest = async () => {
    setUniversities([]);
    setTotalUniversities(0);
    setCountryInput("");
    const universitiesData = await fetchUniversities("");

    if (universitiesData.length === 0) {
      setHighestCountry("Unable to fetch data from API");
      setLowestCountry("Unable to fetch data from API");
      console.log("No universities found.");
      return;
    }

    const universityCountByCountry = {};

    universitiesData.forEach((university) => {
      const country = university.country;

      if (universityCountByCountry[country] === undefined) {
        universityCountByCountry[country] = 1;
      } else {
        universityCountByCountry[country]++;
      }
    });

    let highestCountry = Object.keys(universityCountByCountry)[0];
    let lowestCountry = Object.keys(universityCountByCountry)[0];

    Object.keys(universityCountByCountry).forEach((country) => {
      if (
        universityCountByCountry[country] >
        universityCountByCountry[highestCountry]
      ) {
        highestCountry = country;
      }

      if (
        universityCountByCountry[country] <
        universityCountByCountry[lowestCountry]
      ) {
        lowestCountry = country;
      }
    });

    setHighestCountry(highestCountry);
    setLowestCountry(lowestCountry);
  };

  return (
    <div className="App">
      <h1>University Guide</h1>
      <div className="main">
        <SearchBar
          countryInput={countryInput}
          setCountryInput={setCountryInput}
          searchUniversities={searchUniversities}
        />
        <p>
          Total universities in the country:
          <span id="totalUniversities">{totalUniversities}</span>
        </p>

        <UniversityList universities={universities} />

        <HighestLowest
          findHighestLowest={findHighestLowest}
          highestCountry={highestCountry}
          lowestCountry={lowestCountry}
        />

        {loading && <LoadingAnimation/>}
      </div>
    </div>
  );
}

export default App;
