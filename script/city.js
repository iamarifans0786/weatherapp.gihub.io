const key = "AyWMx25uXFnbN7GZ681kEmUQbbLyzgW2";
const openkey = "ed3940f963ff4fb918275973ee72de8f";

const getCity = async (city) => {
    const request = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`);
    const data = await request.json();
    return data[0];
}

const getWeather = async (cityId) => {
    const request = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${key}`)
    const data = await request.json();
    return data[0];
}


const getTimeDate = async () => {
    const current = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[current.getMonth()];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[current.getDay()]
    const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    return dateTime = {
        "day": day,
        "date": current.getDate(),
        "month": month,
        "year": current.getFullYear(),
        "time": time
    }
}

const openweather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
    const request = await fetch(url+`&appid=${openkey}`);
    const data = await request.json();
    return data;
}
