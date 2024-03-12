import './App.sass'
import Forecast from './components/forecast/Forecast';
import SearchBar from './components/searchbar/SearchBar'
import useForecast from './hooks/useForecast'
import { FaMapMarkerAlt } from 'react-icons/fa';

function App() {
    const { search, options, forecast, units, handleChange, onOptionSelect, handleDeleteText, handleMetricsChange, onGetCurrentLocation } = useForecast();

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
                        <FaMapMarkerAlt onClick={onGetCurrentLocation} />
                    </div>
                </header>
                <main className='info-container'>
                    <section className='main-weather'>
                        {forecast ? (<Forecast data={forecast} unit={units} />) : (null)}
                    </section>
                    <section className='forecast-weather'>
                    </section>
                </main>
                <footer className='footer'>
                    <h3>Created by <a href="https://github.com/Elin4o" className='colored-text'>Elin Nikolov</a></h3>
                    <h3>SVG weather icons: <a href="https://github.com/basmilius" className='colored-text'>Basmilius</a></h3>
                </footer>
            </div>
        </>
    )
}

export default App
