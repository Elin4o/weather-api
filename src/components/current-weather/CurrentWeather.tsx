import { forecastType } from "../../types"
import './CurrentWeather.sass'
import { FaSun, FaMoon } from "react-icons/fa"


type Props = {
  data: forecastType
}

const CurrentWeather = ({ data }: Props): JSX.Element => {
  const today = data.list[0];

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

  const getDirection = (angle: number) => {
    const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index]
  }

  const getTime = (utc: number) => {
    const datetime = new Date(utc * 1000);
    const hours = "0" + datetime.getHours();
    const minutes = "0" + datetime.getMinutes();

    return hours.slice(-2) + ':' + minutes.slice(-2);
  }

  return (
    <>
      <div className="current-weather-container">
        <div className="information-wrapper">
          <div className="information-country">
            <h1 className="country-name">{data.name}, {data.country}</h1>
            <div className="country-datetime">
              <h3 className="country-hour">{new Date(today.dt * 1000).getHours()}:00</h3>
              <h3 className="country-date">{today.dt_txt.split(" ")[0]}</h3>
            </div>
          </div>
          <div className="information-weather">
            <div className="weather-visual">
              <img src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`} alt={`weather-icon-${today.weather[0].main}`} />
              <h2 className="weather-description">{today.weather[0].description}</h2>
            </div>
            <div className="weather-temperature">
              <h1 className="weather-now">{Math.round(today.main.temp)}°C</h1>
              <h3 className="weather-feelslike">Feels like : <span style={{ fontWeight: 600 }}>{Math.round(today.main.feels_like)}°C</span></h3>
            </div>
          </div>
        </div>
        <hr />
        <div className="weather-component">
          <div className="weather-sun_rise_set">
            <div style={{ display: "flex" }}>
              <FaSun />
              <h3 className="weather-sunrise">{getTime(data.sunrise)}</h3>
            </div>
            <div className="weather-separator" />
            <div style={{ display: "flex" }}>
              <FaMoon />
              <h3 className="weather-sunset">{getTime(data.sunset)}</h3>
            </div>
          </div>
        </div>
        <hr />
        <div className="weather-wrapper">
          <div className="weather-container">
            <div className="weather-info">
              <h2>Humidity: {today.main.humidity}%</h2>
            </div>
            <div className="weather-info">
              <h2>Wind: {today.wind.gust} m/s {getDirection(today.wind.deg)}</h2>
            </div>
          </div>
          <div className="weather-container">
            <div className="weather-info">
              <h2>Pressure: {today.main.pressure} hPa</h2>
            </div>
            <div className="weather-info">
              <h2>Visibility: {(today.visibility / 1000).toFixed(1)} km</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CurrentWeather;

