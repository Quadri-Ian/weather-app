import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import cloudyVideo from "./videos/cloudy-bg.mp4";
import rainyVideo from "./videos/rainy_bg.mp4";
import snowyVideo from "./videos/snowy-bg.mp4";
import sunnyVideo from "./videos/sunny-bg.mp4";
import thunderVideo from "./videos/thunder.mp4";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './custom.font.css';
import './index.css';

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const App = () => {
  const [weatherData, setWeatherData] = useState({ temperature: null, conditions: "" });
  const [city, setCity] = useState("");
  const [bgVideo, setBgVideo] = useState(sunnyVideo);

  const apiKey = "b474dce34650bf13a745f72ae7a09a47";

  useEffect(() => {
    if (weatherData && weatherData.conditions) {
      switch (weatherData.conditions) {
        case "clouds":
        case "mist":
          setBgVideo(cloudyVideo);
          break;
        case "rain":
        case "drizzle":
          setBgVideo(rainyVideo);
          break;
        case "thunderstorm":
          setBgVideo(thunderVideo)
          break;
        case "snow":
          setBgVideo(snowyVideo);
          break;
        case "":
        default:
          setBgVideo(sunnyVideo);
          break;
      }
    }
  }, [weatherData]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            setWeatherData({
              temperature: data.main.temp,
              conditions: data.weather[0].main.toLowerCase(),
            });
            setCity(data.name);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [apiKey, setWeatherData, setCity]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    setWeatherData({
      temperature: data.main.temp,
      conditions: data.weather[0].main.toLowerCase(),
    });
  };

  return (
    <div className=" h-screen">
      <video autoPlay loop muted src={bgVideo} className="w-full h-full object-cover absolute top-0 left-0 z-[-1] transition-opacity duration-500" style={{opacity: weatherData ? 1 : 0}} />
      <div className="">
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <input
            className="w-[80%] my-3 text-white font-bold bg-op bg-slate-400/75 hover:bg-slate-400 outline outline-offset-2 outline-1 outline-slate-900 rounded-lg uppercase text-lg p-3"
            type="text"
            placeholder= "Enter city name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button className="border w-1/4 m-3 p-2 bg-slate-600/75 text-slate-200" type="submit">
            Search
          </button>
        </form>
        <div className=" flex justify-center flex-col items-center">
        <div className="date text-white text-center bg-slate-600 bg-opacity-10 p-1 backdrop-blur-xl rounded drop-shadow-lg  items-center m-3">{dateBuilder(new Date())}</div>
        <div className="city-name text-3xl text-white bg-slate-600 text-center p-1 bg-opacity-10 backdrop-blur-xl rounded drop-shadow-lg  items-center uppercase"> {city} <span className="text-[28px]"><FontAwesomeIcon icon={faLocationDot} /> </span> </div>
        <div className="text-center text-slate-200">
          {weatherData && (
            <Weather  
            temperature=
              {weatherData.temperature}  conditions=
             {weatherData.conditions} />
          )}
        </div>          
        </div>

      </div>
    </div>
  );
};

export default App;
