import { forecastType } from "../../types"
import './CurrentWeather.sass'
import { FaSun, FaMoon } from "react-icons/fa"
import { getDirection, getTime, getDayOfWeek } from "../../helpers"


type Props = {
  data: forecastType,
  unit: string
}

const CurrentWeather = ({ data, unit }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <>
      <div className="current-weather-container">
        <div className="information-country">
          <h1 className="country-name">{data.name}, {data.country}</h1>
          <div className="country-datetime">
            <h3 className="country-day">{getDayOfWeek(today.dt_txt.split(" ")[0])}, {today.dt_txt.split(" ")[0]}</h3>
            <span className="date-separator">|</span>
            <h3 className="country-hour">{new Date(today.dt * 1000).getHours()}:00</h3>
          </div>
        </div>
        <div className="information-wrapper">
          <div className="information-weather">
            <div className="weather-visual">
              <img src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`} alt={`weather-icon-${today.weather[0].main}`} />
              <h2 className="weather-description">{today.weather[0].description}</h2>
            </div>
            <div className="weather-temperature">
              <h1 className="weather-now">{Math.round(today.main.temp)}°{unit === "metric" ? "C" : "F"}</h1>
              <h3 className="weather-feelslike">Feels like : <span style={{ fontWeight: 600 }}>{Math.round(today.main.feels_like)}°{unit === "metric" ? "C" : "F"}</span></h3>
            </div>
          </div>
          <div className="weather-wrapper">
              <div className="weather-info">
                <h2>Humidity: {today.main.humidity}%</h2>
              </div>
              <div className="weather-info">
                <h2>Wind: {today.wind.gust} {unit === "metric" ? "m/s" : "mph"} {getDirection(today.wind.deg)}</h2>
              </div>
              <div className="weather-info">
                <h2>Pressure: {today.main.pressure} hPa</h2>
              </div>
              <div className="weather-info">
                <h2>Visibility: {(today.visibility / 1000).toFixed(1)} km</h2>
              </div>
              <div className="weather-info">
                <h2>Clouds: {today.clouds.all} %</h2>
              </div>
          </div>
          </div>
          <hr />
          <div className="weather-sun_rise_set">
            <div className="weather-sun">
              <FaSun />
              <h3 className="weather-sunrise">{getTime(data.sunrise)}</h3>
            </div>
            <div className="weather-separator" />
            <div className="weather-sun">
              <FaMoon />
              <h3 className="weather-sunset">{getTime(data.sunset)}</h3>
            </div>
        </div>
      </div>
    </>
  )
}

export default CurrentWeather;

