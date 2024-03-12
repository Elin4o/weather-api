import { useState } from "react";
import './WeatherAccordion.sass'
import { FaCaretSquareDown, FaCaretSquareUp } from "react-icons/fa"
import { individualForecastType } from "../../types";
import { convertDate, getDayOfWeek, getDirection } from "../../helpers";

type FutureForecast = {
  id: number,
  array: Array<individualForecastType>,
  unit: string,
  day: string
}

const WeatherAccordion = ({ id, array, unit, day }: FutureForecast): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForecastPanel = (selectedForecast: string) => {
    let forecastPanels = document.getElementsByClassName("accordion");
    let clickedForecast = document.getElementById(selectedForecast);

    if (clickedForecast?.parentElement?.classList.contains("forecast-active")) {
      clickedForecast?.parentElement?.classList.remove("forecast-active")

      for (let i = 0; i < forecastPanels.length; i++) {
        if (forecastPanels[i].classList.contains("forecast-active")) {
          forecastPanels[i].classList.remove("forecast-active")
          forecastPanels[i].classList.add("forecast-inactive")
        }
      }
    } else {
      clickedForecast?.parentElement?.classList.add("forecast-active")
      for (let i = 0; i < forecastPanels.length; i++) {
        if (forecastPanels[i].classList.contains("forecast-inactive")) {
          forecastPanels[i].classList.remove("forecast-inactive")
          forecastPanels[i].classList.add("forecast-active")
        }
      }
    }
  }

  const onWeatherExpand = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as Element;
    setIsOpen(!isOpen)
    toggleForecastPanel(target.id)

    if (isOpen) {
      target.classList.remove("accordion-header-active");
    }
    else {
      target.classList.add("accordion-header-active");
    }
  }

  let lowestTemp = Number.POSITIVE_INFINITY;
  let highestTemp = Number.NEGATIVE_INFINITY;

  for (let index = 0; index < array.length; index++) {
    if (lowestTemp > array[index].main.temp_min) {
      lowestTemp = array[index].main.temp_min;
    }
    if (highestTemp < array[index].main.temp_max) {
      highestTemp = array[index].main.temp_max;
    }
  }

  const moveRight = (e: React.MouseEvent<HTMLElement>) =>{
    const target = e.currentTarget as Element;
    target.parentElement!.scrollBy({
        left: 360,
        top: 0,
        behavior: 'smooth'
    })
  }
  const moveLeft = (e: React.MouseEvent<HTMLElement>) =>{
    const target = e.currentTarget as Element;
    target.parentElement!.scrollBy({
      left: -360,
      top: 0,
      behavior: 'smooth'
  })
  }

  return (
    <div className={`accordion forecast-active`}>
      <div className="accordion-header" id={`${id}`} onClick={onWeatherExpand}>
        {isOpen ?
          <h4>{getDayOfWeek(day)}, {convertDate(day).split(" ")[0] + " " + convertDate(day).split(" ")[1]}</h4>
          :
          <h4>{getDayOfWeek(day).substring(0, 3)}, {convertDate(day).split(" ")[0].substring(0, 3) + " " + convertDate(day).split(" ")[1]}</h4>
        }
        {isOpen ? null :
          <>
            <div className="temperature-daily">
              <img src={`/src/assets/${array.length > 1 ? array[Math.floor(array.length / 2)]?.weather[0].icon : array[0].weather[0].icon}.svg`} alt={`weather-icon-${array.length > 1 ? array[Math.floor(array.length / 2)]?.weather[0].icon : array[0].weather[0].icon}.svg`} />
              {<p>{Math.round(lowestTemp)}°{unit === "metric" ? "C" : "F"} | {Math.round(highestTemp)}°{unit === "metric" ? "C" : "F"}</p>}
            </div>
            <p className="temperature-description">{array.length > 1 ? array[Math.floor(array.length / 2)].weather[0].main : array[0].weather[0].main}</p>
          </>
        }
        {isOpen ?
          <FaCaretSquareUp className="toggle-button"/>
          :
          <FaCaretSquareDown className="toggle-button"/>
        }
      </div>

      {isOpen && <div className="accordion-body">
        <div className="weather">
          <img src={`/src/assets/${array.length > 1 ? array[Math.floor(array.length / 2)]?.weather[0].icon : array[0].weather[0].icon}.svg`} alt={`weather-icon-${array.length > 1 ? array[Math.floor(array.length / 2)]?.weather[0].icon : array[0].weather[0].icon}.svg`} />
          <div className="information">
            <div className="description">{array.length > 1 ? array[Math.floor(array.length / 2)].weather[0].main : array[0].weather[0].main}</div>
            <div className="temperature">Highest <span className="temperature-color">{Math.round(highestTemp)}°{unit === "metric" ? "C" : "F"}</span> , Lowest <span className="temperature-color">{Math.round(lowestTemp)}</span>°{unit === "metric" ? "C" : "F"}</div>
          </div>
        </div>
        <div className="hourly-weather">
          <a className="prev" onClick={moveLeft}>&#10094;</a>
          <a className="next" onClick={moveRight}>&#10095;</a>
          {array.map((element, index) =>
            <div className="hourly-container" key={index}>
              <div>
                <span className="value-color">{element.dt_txt.split(" ")[1].slice(0, 5)}</span>
              </div>
              <div>
                <img src={`/src/assets/${element.weather[0].icon}.svg`} alt={`weather-icon-${element.weather[0].main}`} />
              </div>
              <div>
                Temperature: <span className="value-color">{Math.round(element.main.temp)}°{unit === "metric" ? "C" : "F"}</span>
              </div>
              <div>
                Humidity: <span className="value-color">{element.main.humidity}%</span>
              </div>
              <div>
                Wind: <span className="value-color">{element.wind.gust} {unit === "metric" ? "m/s" : "mph"} {getDirection(element.wind.deg)}</span>
              </div>
              <div>
                Pressure: <span className="value-color">{element.main.pressure} hPa</span>
              </div>
              <div>
                Visibility: <span className="value-color">{(element.visibility / 1000).toFixed(1)} km</span>
              </div>
              <div>
                Clouds: <span className="value-color">{element.clouds.all}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
      }
    </div >
  )
}

export default WeatherAccordion