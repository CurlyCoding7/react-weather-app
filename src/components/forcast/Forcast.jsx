import React from "react";
import "./forcast.css";

const Forcast = ({ city, temp, humid, date, img, condition, wind }) => {
  return (
    <div className="forcast">
      <h1>{city ? `${city} - ${date}` : "City - Date"}</h1>
      <div className="forcast-box">
        <div className="img-box">
          <img src={`https:${img}`} alt="weather" />
          <span>{condition}</span>
        </div>
        <div className="weather-data">
          <span>Temperature: {temp} ℃</span>
          <span>Wind: {wind} km/h</span>
          <span>Humidity: {humid}</span>
        </div>
      </div>
    </div>
  );
};

export default Forcast;
