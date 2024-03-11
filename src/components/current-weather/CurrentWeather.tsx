import { forecastType } from "../../types"
import './CurrentWeather.sass'
import { FaSun, FaMoon, FaEye, FaCloud, FaWind } from "react-icons/fa"
import { getDirection, getTime, getDayOfWeek } from "../../helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDroplet, faGauge, faPercentage } from "@fortawesome/free-solid-svg-icons"


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
              <img src={`/src/assets/${today.weather[0].icon}.svg`} alt={`weather-icon-${today.weather[0].main}`} />
              <h2 className="weather-description">{today.weather[0].description}</h2>
            </div>
            <div className="weather-temperature">
              <div className="weather-now">
                <h1>{Math.round(today.main.temp)}°{unit === "metric" ? "C" : "F"}</h1>
              </div>
              <h3 className="weather-feelslike">Feels like : <span style={{ fontWeight: 600 }}>{Math.round(today.main.feels_like)}°{unit === "metric" ? "C" : "F"}</span></h3>
            </div>
          </div>
          <div className="weather-wrapper">
            <div className="weather-info">
              <span className="fa-layers">
                <FontAwesomeIcon icon={faDroplet} className="icon-green" />
                <FontAwesomeIcon icon={faPercentage} fontSize={10} color="#2d6a4f " />
              </span>
              <h2>{today.main.humidity}%</h2>
            </div>
            <div className="weather-info">
              <FaWind className="icon-green" />
              <h2>{today.wind.gust} {unit === "metric" ? "m/s" : "mph"} {getDirection(today.wind.deg)}</h2>
            </div>
            <div className="weather-info">
              <FontAwesomeIcon icon={faGauge} className="icon-green" />
              <h2>{today.main.pressure} hPa</h2>
            </div>
            <div className="weather-info">
              <FaEye className="icon-green" />
              <h2> {(today.visibility / 1000).toFixed(1)} km</h2>
            </div>
            <div className="weather-info">
              <FaCloud className="icon-green" />
              <h2>{today.clouds.all} 
            %</h2>
            </div>
          </div>
        </div>
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

