import { individualForecastType } from "../types";

const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getDirection = (angle: number): string => {
    const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index]
}

export const getPop = (value: number): string => {
    if (value <= 0.33) return 'Low probability'
    if (value > 0.33 && value <= 0.66) return 'Moderate probability'

    return 'High probability'
}

export const getDayOfWeek = (dayText: string): string => {
    const day = new Date(dayText);
    return days[day.getDay()]
}

export const convertDate = (dateString: string) => {
    const temp_date = dateString.split("-");
    return months[Number(temp_date[1]) - 1] + " " +  temp_date[2] /*+ " " + temp_date[0]*/;
}

export const getTime = (utc: number) => {
    const datetime = new Date(utc * 1000);
    const hours = "0" + datetime.getHours();
    const minutes = "0" + datetime.getMinutes();

    return hours.slice(-2) + ':' + minutes.slice(-2);
}

export const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => console.log(position.coords.latitude + " " + position.coords.longitude));
    }
}

export const getAverageHumidity = (array: Array<individualForecastType>) => {
    let sum = 0;
    for (let index = 0; index < array.length; index++) {
        sum += array[index].main.humidity; 
    }

    return sum / array.length;
}
