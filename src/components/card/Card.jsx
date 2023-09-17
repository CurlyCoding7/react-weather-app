import React from "react";
import "./card.css";
import icon from "../../assets/icon.webp";

const Card = ({ img, date, temp, humid, wind }) => {
  return (
    <div className="forcast-card">
      <h1>{date}</h1>
      <div className="forcast-box">
        <img src={img ? img : icon} alt="weather" />
        <div className="weather-data">
          <span>Temperature: {temp} ℃</span>
          <span>Wind: {wind} km/h</span>
          <span>Humidity: {humid}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
