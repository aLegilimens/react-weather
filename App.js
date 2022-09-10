import "./App.css";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Clock from "./components/Clock";
import ForecastItem from "./components/ForecastItem";
import wind from "./public/wind.png";
import feelslike from "./public/feelslike.png";

function App() {
  //for autofocusing the input field so we have the blinking cursor
  const inputC = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  //for getting the city input
  const [city, setCity] = useState("London");

  //for getting the forecast data
  const [forca, setForca] = useState({});
  const [imgSource, setImgSource] = useState("");
  const [forecastData, setForecastData] = useState({});

  var arr = [];
  var icon = "";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=bfb1f999e8dceb1cd8b548a1685dcd1b&units=metric";
  const urlF =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=bfb1f999e8dceb1cd8b548a1685dcd1b&units=metric";

  function checkData() {
    if (forca.main !== undefined) {
      icon = forca.weather[0].icon;
      getIcons(icon);
    }

    //getting the data we need
    if (forecastData.city !== undefined) {
      for (var i = 1; i < 5; i++) {
        arr.push({
          time: forecastData.list[i].dt_txt.slice(10, 16),
          minTemp: forecastData.list[i].main.temp_min
            .toString()
            .substring(0, 4),
          maxTemp: forecastData.list[i].main.temp_max
            .toString()
            .substring(0, 4),
          icon: forecastData.list[i].weather[0].icon,
        });
      }
      console.log(arr);
    }
  }

  //seting the source for the icon
  function getIcons(props) {
    setImgSource(require(`./public/icons/${props}.png`));
  }

  useEffect(() => {
    const keyPressEvent = (e) => {
      if (e.keyCode === 13) {
        //get hourly forecast
        axios.get(urlF).then((result) => {
          setForecastData(result.data);
        });
        //get current weather
        axios.get(url).then((res) => {
          setForca(res.data);
        });
      }
    };
    window.addEventListener("keydown", keyPressEvent);
    checkData();
    return () => {
      window.removeEventListener("keydown", keyPressEvent);
    };
  });

  return (
    <div className="all">
      <div>
        <div className="clock">
          <Clock />
        </div>
        <div className="title">WeatherCheck</div>
      </div>
      <div className="main">
        <div className="sentence">
          Today, in{" "}
          <input
            type="text"
            className="inputCity"
            ref={inputC}
            onChange={(e) => setCity(e.target.value)}
          />
          , it's&nbsp;{" "}
          <div className="opis">
            {forca.weather ? <p> {forca.weather[0].description}</p> : " clear"}
          </div>
        </div>
        {forca.main !== undefined && (
          <div className="content">
            <div className="mainWeather">
              <div className="icon">
                <img src={imgSource} alt="Clouds" id="weatherIcon" />
              </div>
              <div className="temp">
                {forca.main.temp.toString().substring(0, 4)}°
              </div>
              <div className="right">
                <div className="up">
                  <img src={feelslike} alt="Feels like" className="smallicon" />
                  <p className="smalltext">
                    {forca.main.feels_like.toString().substring(0, 4)} °
                  </p>
                </div>
                <div className="down">
                  <img src={wind} alt="Wind icon" className="smallicon" />
                  <p className="smalltext">{forca.wind.speed}km/h</p>
                </div>
              </div>
            </div>
            <div className="forecast">
              <div>
                <ForecastItem array={arr} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
