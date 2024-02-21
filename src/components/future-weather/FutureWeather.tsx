import WeatherAccordion from "../weather-accordion/WeatherAccordion"
import './FutureWeather.sass'

const FutureWeather = () => {

    return (
        <>
            <div className="future-weather-container">
                <WeatherAccordion id={0}/>
                <WeatherAccordion id={1}/>
                <WeatherAccordion id={2}/>
                <WeatherAccordion id={3}/>
                <WeatherAccordion id={4}/>
           </div>
        </>
    )
}

export default FutureWeather