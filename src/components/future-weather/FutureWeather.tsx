import WeatherAccordion from "../weather-accordion/WeatherAccordion"
import './FutureWeather.sass'

const FutureWeather = () => {

    const toggleForecastPanel = (selectedForecast: string) => {
        let forecastPanels = document.getElementsByClassName("forecast-panel");
        let clickedForecast = document.getElementById(selectedForecast);

        if (clickedForecast?.classList.contains("forecast-active")) {
            clickedForecast?.classList.remove("forecast-active")

            for (let i = 0; i < forecastPanels.length; i++) {
                if (forecastPanels[i].classList.contains("forecast-active")) {
                    forecastPanels[i].classList.remove("forecast-active")
                    forecastPanels[i].classList.add("forecast-inactive")
                }
            }
        } else {
            clickedForecast?.classList.add("forecast-active")
            for (let i = 0; i < forecastPanels.length; i++) {
                if (forecastPanels[i].classList.contains("forecast-inactive")) {
                    forecastPanels[i].classList.remove("forecast-inactive")
                    forecastPanels[i].classList.add("forecast-active")
                }
            }
        }
    }


    return (
        <>
            <div className="future-weather-container">
                <div className="forecast-panel forecast-active" id="1" onClick={(e) => {
                    const target = e.currentTarget as Element;
                    toggleForecastPanel(target.id)
                }}>
                    <WeatherAccordion />
                </div>
                <div className="forecast-panel forecast-active" id="2" onClick={(e) => {
                    const target = e.currentTarget as Element;
                    toggleForecastPanel(target.id)
                }}>
                    <WeatherAccordion />
                </div>
                <div className="forecast-panel forecast-active" id="3" onClick={(e) => {
                    const target = e.currentTarget as Element;
                    toggleForecastPanel(target.id)
                }}>
                    <WeatherAccordion />
                </div>
                <div className="forecast-panel forecast-active" id="4" onClick={(e) => {
                    const target = e.currentTarget as Element;
                    toggleForecastPanel(target.id)
                }}>
                    <WeatherAccordion />
                </div>
                <div className="forecast-panel forecast-active" id="5" onClick={(e) => {
                    const target = e.currentTarget as Element;
                    toggleForecastPanel(target.id)
                }}>
                    <WeatherAccordion />
                </div>

            </div>
        </>
    )
}

export default FutureWeather