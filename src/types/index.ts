export type optionType = {
    name: string,
    country: string,
    lat: number,
    lon: number
}
export type forecastType = {

    name: string,
    country: string,
    sunrise: number,
    sunset: number,
    coord: 
        {
            lat: number,
            lon: number,
        }
    ,
    list: [
        {
            dt: number,
            main: {
                temp: number,
                feels_like: number,
                temp_max: number,
                temp_min: number,
                humidity: number,
                pressure: number,
            }
            weather: [
                {
                    main: string,
                    icon: string,
                    description: string,
                }
            ]
            clouds: {
                all: number,
            }
            wind: {
                speed: number,
                gust: number,
                deg: number
            }
            pop: number,
            visibility: number,
            dt_txt: string
        }
    ]


}