import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../types";
import useDebounce from "./useDebounce";

const useForecast = () => {
    const [search, setSearch] = useState<string>('');
    const [options, setOptions] = useState<[]>([]);
    const [city, setCity] = useState<optionType | null>(null);
    const [forecast, setForecast] = useState<forecastType | null>(null);
    const [units, setUnits] = useState<string>("metric");

    const debouncedValue = useDebounce(search, 500);

    useEffect(() => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${debouncedValue}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
            .then(response => response.json())
            .then(json => setOptions(json));
    }, [debouncedValue])


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const handleDeleteText = () => {
        setSearch('');
        setOptions([]);
    }

    const onOptionSelect = (option: optionType) => {
        getCityForecast(option);
        setCity(option);
    }

    useEffect(() => {
        if (city) {
            setSearch('')
            setOptions([])
        }
    }, [city])

    const getCityForecast = (city: optionType) => {
        getForecast(city.lat, city.lon)
    }

    const onGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => getForecast(position.coords.latitude,position.coords.longitude));
        }
    }

    const getForecast = (lat: number, lon: number) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const forecastData = {
                    ...data.city,
                    list: data.list
                }
                setForecast(forecastData);
            })
    }
    // const getForecast = (city: optionType) => {
    //     fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=${units}&appid=${import.meta.env.VITE_API_KEY}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             const forecastData = {
    //                 ...data.city,
    //                 list: data.list
    //             }
    //             setForecast(forecastData);
    //         })
    // }

    const handleMetricsChange = async () => {
        const nextUnits = units === "metric" ? "imperial" : "metric";

        setUnits(nextUnits)
    }

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${forecast?.coord.lat || 42.698334}&lon=${forecast?.coord.lon || 23.319941}&units=${units}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const forecastData = {
                    ...data.city,
                    list: data.list
                }
                setForecast(forecastData);
            })
    }, [units])

    return {
        search,
        options,
        forecast,
        units,
        handleChange,
        onOptionSelect,
        onGetCurrentLocation,
        handleDeleteText,
        // getMainCityForecast,
        handleMetricsChange
    }
}

export default useForecast;