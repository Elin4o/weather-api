import { useState } from "react";
import './WeatherAccordion.sass'
import { FaCaretSquareDown, FaCaretSquareUp } from "react-icons/fa"

type FutureForecast = {
  id: number
} 

const WeatherAccordion = ({id}: FutureForecast): JSX.Element => {
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
    console.log(target.id)
  }

  return (
    <div className={`accordion forecast-active`}>
      <div className="accordion-header" id={`${id}`} onClick={onWeatherExpand}>
        <h4>Mon,Feb 19</h4>
        {isOpen ? null :
          <>
            <div className="temperature-daily">
              <img src={`https://openweathermap.org/img/wn/01d@2x.png`} />
              {<p>10°C | 10°C</p>}
            </div>
            <p className="temperature-description">rainy</p>
          </>
        }
        {isOpen ?
          <FaCaretSquareUp />
          :
          <FaCaretSquareDown />
        }
      </div>

      {isOpen && <div className="accordion-body">
        <div className="weather">
          <img src={`https://openweathermap.org/img/wn/01d@2x.png`} />
          <div className="information">
            <div className="description">Sunny</div>
            <div className="temperature">Highest 10°C, Lowest 7°C</div>
          </div>
        </div>
        <div className="conditions">
          <div>
            <p>Humidity:30%</p>
            <p>Wind:1.34 m/s S</p>
          </div>
          <div>
            <p>Pressure:1034 hPa</p>
            <p>Visibility:3 km S</p>
          </div>
        </div>
        <div>
          <div>
            <span>Sunrise</span>
            <span>07:14</span>
          </div>
          <div>
            <span>Sunset</span>
            <span>17:54</span>
          </div>
        </div>
      </div>
      }
    </div >
  )
}

export default WeatherAccordion