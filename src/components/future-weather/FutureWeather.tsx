import { useState } from "react"
import WeatherAccordion from "../weather-accordion/WeatherAccordion"
import './FutureWeather.sass'

const FutureWeather = () => {


    return (
        <>
            <div className="future-weather-container">
                <div>
                    <WeatherAccordion className={"active"}/>
                </div>        
                <div>
                    <WeatherAccordion className={"active"}/>
                </div>        
                <div>
                    <WeatherAccordion className={"active"}/>
                </div>        
            </div>
        </>
    )
}

export default FutureWeather