import './App.sass'
import Forecast from './components/forecast/Forecast';
import SearchBar from './components/searchbar/SearchBar'
import useForecast from './hooks/useForecast'

function App() {
    const { search, options, forecast, handleChange, onOptionSelect, handleDeleteText } = useForecast();
    return (
        <>
            <div className='App'>
                <header className='search'>
                    <SearchBar search={search} options={options} onOptionSelect={onOptionSelect} handleChange={handleChange} handleDeleteText={handleDeleteText}/>
                    <div className='language-select'>
                        <div>
                            
                        </div>
                    </div>
                    <div className='metrics-select'>
                        <div>
                            
                        </div>
                    </div>
                </header>
                <main className='info-container'>
                    <section className='main-weather'>
                        {forecast ? (<Forecast data={forecast} />) : (<></>)}
                    </section>
                    <section className='forecast-weather'>
                    </section>
                </main>
            </div>
        </>
    )
}

export default App
