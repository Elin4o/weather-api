import { useState } from "react";
import './WeatherAccordion.sass'
import { FaCaretSquareDown, FaCaretSquareUp } from "react-icons/fa"

type CurrentState = {
  className: string
}

const WeatherAccordion = ( {className}: CurrentState ) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`accordion ${className}`}>
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
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