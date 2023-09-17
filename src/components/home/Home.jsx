import React, { useEffect, useState, useRef } from "react";
import Forcast from "../forcast/Forcast";
import "./home.css";
import Card from "../card/Card";
import axios from "axios";

const API_KEY = "Your_API_KEY";

const Home = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState([{}]);

  const handle4dayForecast = (city) => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4`
      )
      .then((res) => {
        const items = res.data.forecast.forecastday;
        for (let item of items) {
          setData((prevData) => [
            ...prevData,
            {
              date: item.date,
              temp: item.day.avgtemp_c,
              humid: item.day.avghumidity,
              wind: item.day.avgvis_km,
              condition: item.day.condition.text,
              img: item.day.condition.icon,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    const cityName = document.getElementById("inputCity").value;
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
      )
      .then((res) => {
        setCity(res.data.location.name);
        setData([
          {
            date: res.data.current.last_updated,
            temp: res.data.current.temp_c,
            humid: res.data.current.humidity,
            wind: res.data.current.wind_kph,
            condition: res.data.current.condition.text,
            img: res.data.current.condition.icon,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });

    handle4dayForecast(cityName);
    document.getElementById("inputCity").value = "";
  };

  return (
    <div className="home">
      <div className="header">
        <h1>MAUSAM</h1>
      </div>
      <div className="container">
        <div className="weather-box">
          <div className="search-box">
            <h3>Enter your city name</h3>
            <input id="inputCity" type="text" placeholder="E.g. New Delhi" />
            <button onClick={handleSearch} className="search">
              Search
            </button>
            {/* <span>Or</span>
            <button className="location">Use Current Location</button> */}
          </div>

          <Forcast
            city={city}
            date={data[0].date}
            temp={data[0].temp}
            wind={data[0].wind}
            humid={data[0].humid}
            img={data[0].img}
            condition={data[0].condition}
          />
        </div>
        {/* <h2 className="heading-four-d">4-days Forecast</h2> */}

        <div className="display-card">
          {data.map((item, i) =>
            i !== 0 ? (
              <Card
                key={i}
                date={item.date}
                temp={item.temp}
                wind={item.wind}
                humid={item.humid}
                img={item.img}
                condition={item.condition}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
