import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../types";
import useDebounce from "./useDebounce";

const useForecast = () => {
    const [search, setSearch] = useState<string>('');
    const [options, setOptions] = useState<[]>([]);
    const [city, setCity] = useState<optionType | null>(null);
    const [forecast, setForecast] = useState<forecastType | null>(null);

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
        console.log('its workings')
    }

    const onOptionSelect = (option: optionType) => {
        getForecast(option);
        setCity(option);

    }

    useEffect(() => {
        if (city) {
            setSearch('')
            setOptions([])
        }
    }, [city])

    const getForecast = (city: optionType) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const forecastData = {
                    ...data.city,
                    list: data.list
                }
                setForecast(forecastData);
            })
    }

    return {
        search,
        options,
        forecast,
        handleChange,
        onOptionSelect,
        handleDeleteText
    }
}

export default useForecast;