
import './App.css';

import React, { useState } from "react";
import './Components/Style.css';

import humidity_icon from "./Assets/humidity.png";
import search_icon from "./Assets/search.png";
import wind_icon from "./Assets/wind.png";
import location_icon from './Assets/placeholder.svg'
import house_icon from './Assets/house.svg'

function App() {


  const searchBar = async () => {

    const search_CityName = document.getElementsByClassName("cityName");

    // when empty city name
    if (search_CityName[0].value === "") {
      return 0;
    }

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${search_CityName[0].value}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd8cebc7154msh9564593e2b8a40bp1f19d2jsn8917799d1fc7',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const temp = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      const error_msg = document.getElementsByClassName("error-message");
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-speed");
      const wicon = document.getElementsByClassName("wicon");
      const wcondition = document.getElementsByClassName("weather-condition");
      const wcondition_icon = document.getElementsByClassName("weatherCondition");
      const countryName = document.getElementsByClassName("country-name");

      const response = await fetch(url, options);

      // check response is ok or not ok
      if (!response.ok) {
        wicon[0].src = house_icon;
        response.json()
          .then(data => {
            error_msg[0].innerHTML = data.error.message;
          })

        temp[0].innerHTML = "";
        location[0].innerHTML = "";
        humidity[0].innerHTML = "0 %";
        wind[0].innerHTML = "00 km/h";

        countryName[0].innerHTML = "--";
        wcondition[0].innerHTML = "--";
        wcondition_icon[0].src = house_icon;
      }
      else {
        const data = await response.json();

        // assign the data
        temp[0].innerHTML = data.current.temp_c + " °C";
        location[0].innerHTML = data.location.name;
        humidity[0].innerHTML = data.current.humidity + " %";
        wind[0].innerHTML = data.current.wind_kph + " km/h";
        wicon[0].src = data.current.condition.icon;

        countryName[0].innerHTML = data.location.country;
        wcondition[0].innerHTML = data.current.condition.text;
        wcondition_icon[0].src = data.current.condition.icon;
        error_msg[0].innerHTML = "";
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container">
      <div className="top-searchbar">
        <input type="text" className="cityName" placeholder="Enter City Name" />
        <div className="search-icon" onClick={() => { searchBar() }}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img className="wicon" height="40px" src='' alt="" />
      </div>
      <div className="weather-temp"></div>
      <div className="weather-location"></div>
      <div className="error-message"></div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="text">Humidity</div>
            <div className="humidity-percent">00 %</div>

          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="text">Wind Speed</div>
            <div className="wind-speed">00 km/h</div>
          </div>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={location_icon} width="42" alt="" className="icon" />
          <div className="data">
            <div className="text">Country</div>
            <div className="country-name">--</div>
          </div>
        </div>

        <div className="element" >
          <img src='' width="88px" alt="" className="weatherCondition" />
          <div className="data">
            <div className="text">Weather Condition</div>
            <div className="weather-condition">--</div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default App;
