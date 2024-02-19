import WeatherAccordion from "../weather-accordion/WeatherAccordion"
import './FutureWeather.sass'

const FutureWeather = () => {
    return (
        <>
            <div className="future-weather-container">
                <WeatherAccordion />
                <WeatherAccordion />
                <WeatherAccordion />
                <WeatherAccordion />
                <WeatherAccordion />
            </div>
        </>
    )
}

export default FutureWeather