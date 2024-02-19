import { forecastType } from "../../types"
import CurrentWeather from "../current-weather/CurrentWeather"
import FutureWeather from "../future-weather/FutureWeather"
import './Forecast.sass'


type Props = {
  data: forecastType
}

const Forecast = ({ data }: Props): JSX.Element => {
  return (
    <>
      <div className="forecast">
        <CurrentWeather data={data} />
        <FutureWeather />
      </div>
    </>
  )
}

/*
<div className="weather-minmax">
            <div style={{ display: "flex" }}>
              <FaLongArrowAltDown />
              <h3 className="weather-min">{Math.round(today.main.temp_min)}°C</h3>
            </div>
            <div className="weather-separator" />
            <div style={{ display: "flex" }}>
              <FaLongArrowAltUp />
              <h3 className="weather-max">{Math.round(today.main.temp_max)}°C</h3>
            </div>
          </div>
*/

export default Forecast