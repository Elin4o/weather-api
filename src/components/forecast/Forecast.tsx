import { forecastType } from "../../types"
import './Forecast.sass'

type Props = {
  data: forecastType
}

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];
  return (
    <>
      <div className="forecast-container">
        <div className="information-wrapper">
          <div className="information-country">
            <h1 className="country-name">{data.name}, {data.country}</h1>
            <h3 className="country-date">{today.dt_txt.split(" ")[0]}</h3>
            <h3 className="country-hour">{new Date(today.dt * 1000).getHours()}:00</h3>
          </div>
          <div className="information-weather">
            <img src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`} alt={`weather-icon-${today.weather[0].main}`} />
            <h2>{Math.round(today.main.temp)}°C</h2>
            <h2>{today.weather[0].description}</h2>
          </div>
        </div>
          <h2>Rain:{today.main.humidity}</h2>
          <h2>Wind:{today.wind.gust}</h2>
        <div className="weather-wrapper">

        </div>

      </div>
    </>
  )
}

export default Forecast