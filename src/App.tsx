import './App.sass'
import Forecast from './components/forecast/Forecast';
import SearchBar from './components/searchbar/SearchBar'
import { getCurrentLocation } from './helpers';
import useForecast from './hooks/useForecast'
import { FaMapMarkerAlt } from 'react-icons/fa';

function App() {
    const { search, options, forecast, units, handleChange, onOptionSelect, handleDeleteText, handleMetricsChange } = useForecast();

    // getMainCityForecast()

    if (units === "metric") {
        document.getElementById("celsius")?.classList.add("units-active")
        document.getElementById("farenheit")?.classList.remove("units-active")
    } else {
        document.getElementById("farenheit")?.classList.add("units-active")
        document.getElementById("celsius")?.classList.remove("units-active")
    }

    return (
        <>
            <div className='App'>
                <header className='header'>
                    <SearchBar search={search} options={options} onOptionSelect={onOptionSelect} handleChange={handleChange} handleDeleteText={handleDeleteText} />
                    <div className='metrics-select' onClick={handleMetricsChange}>
                        <div id='celsius'>°C</div>
                        /
                        <div id='farenheit'>°F</div>
                    </div>
                    <div className='current-location'>
                        <FaMapMarkerAlt onClick={getCurrentLocation} />
                    </div>
                </header>
                <main className='info-container'>
                    <section className='main-weather'>
                        {forecast ? (<Forecast data={forecast} unit={units} />) : (null)}
                    </section>
                    <section className='forecast-weather'>
                    </section>
                </main>
            </div>
        </>
    )
}

export default App
