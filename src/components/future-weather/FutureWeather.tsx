
import { forecastType, individualForecastType } from "../../types"
import WeatherAccordion from "../weather-accordion/WeatherAccordion"
import './FutureWeather.sass'

type Props = {
    data: forecastType,
    unit: string
  }

const FutureWeather = ({ data, unit }: Props): JSX.Element => {
    const todayListLength = 8 - (Number(data.list[0].dt_txt.split(" ")[1].split(":")[0]) / 3)

    const todayValues:Array<individualForecastType> = []
    const secondDayValues:Array<individualForecastType> = []
    const thirdDayValues:Array<individualForecastType> = []
    const fourthDayValues:Array<individualForecastType> = []
    const fifthDayValues:Array<individualForecastType> = []

    for (let i = 0; i < todayListLength; i++) {
        todayValues.push(data.list[i])         
    }
    
    for (let i = todayListLength; i < todayListLength + 8; i++) {
        secondDayValues.push(data.list[i])         
        thirdDayValues.push(data.list[i + 8])         
        fourthDayValues.push(data.list[i + 16])         
        fifthDayValues.push(data.list[i + 24])         
    }

    return (
        <>
            <div className="future-weather-container">
                <WeatherAccordion id={0} array={todayValues} unit={unit} day={data.list[0].dt_txt.split(" ")[0]}/>
                <WeatherAccordion id={1} array={secondDayValues} unit={unit} day={secondDayValues[0].dt_txt.split(" ")[0]}/>
                <WeatherAccordion id={2} array={thirdDayValues} unit={unit} day={thirdDayValues[0].dt_txt.split(" ")[0]}/>
                <WeatherAccordion id={3} array={fourthDayValues} unit={unit} day={fourthDayValues[0].dt_txt.split(" ")[0]}/>
                <WeatherAccordion id={4} array={fifthDayValues} unit={unit} day={fifthDayValues[0].dt_txt.split(" ")[0]}/>

           </div>
        </>
    )
}

export default FutureWeather