const form = document.querySelector("form");
const city = document.querySelector(".date-time");
const backround = document.querySelector(".background-img img");
const weatherIcon = document.querySelector(".weather-status");
const Temp = document.querySelector(".tempreture-detail");
const windSec = document.querySelector(".wind-detail");

const getCityData = async (city) => {
    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);
    const openweatherdetails = await openweather(city);
    const TimeDate = await getTimeDate()
    return { cityDetails, weatherDetails, openweatherdetails, TimeDate };
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userCity = form.cityName.value.trim();
    console.log(userCity);
    form.reset();

    // Getting All Data
    getCityData(userCity).then((data) => {
        return updateUI(data);
    }).catch((error) => {
        console.log(error);
    })

    // Set Local Storage 
    localStorage.setItem('city',userCity);

});

// fetching Local storage 

if(localStorage.getItem('city')){
    getCityData(localStorage.getItem('city')).then((data) => {
        return updateUI(data);
    }).catch((error) => {
        console.log(error);
    })
}

const updateUI = (data) => {
    const { cityDetails, weatherDetails, openweatherdetails, TimeDate } = data
    console.log(data)
    
    // city Date Time 
    city.innerHTML = `
    <h1>${data.cityDetails.LocalizedName}</h1>
    <h2>${data.TimeDate.day}</h2>
    <h3> ${data.TimeDate.month} ${data.TimeDate.date}, ${data.TimeDate.year} </h3>
    <h4>${data.TimeDate.time}</h4>`

    // Day Night Switch
    const imgSrc = weatherDetails.IsDayTime ? 'image/day.jpg' : 'image/night.jpg';
    backround.setAttribute('src', imgSrc);

    // icon Switch 
    weatherIcon.innerHTML = `
    <h1>${weatherDetails.WeatherText}</h1>
    <img src="./image/icons/${weatherDetails.WeatherIcon}.svg" alt="icon">
    `

    // Temp 
    Temp.innerHTML = `
    <h1>${weatherDetails.Temperature.Metric.Value}<span> &#8451;</span></h1> 
    <h1>${weatherDetails.Temperature.Imperial.Value}<span> &#8457;</span></h1>
    `
    // Extra Details 
    windSec.innerHTML=`
    <p>Wind Speed <span> ${openweatherdetails.wind.speed} </span> Meter/Sec</p>
    <p>Humidity <span> ${openweatherdetails.main.humidity} </span>% </p>
    <p>Pressure <span> ${openweatherdetails.main.pressure} </span>hPa </p>
    <p>Max Temp <span> ${openweatherdetails.main.temp_max} </span>Kelvin </p>
    <p>Min Temp <span> ${openweatherdetails.main.temp_min} </span>Kelvin </p>
    `
}