let cityInput = document.querySelector('.city');
let day = document.querySelector('.day');
let date_year = document.querySelector('.date');
let time = document.querySelector('.time');
let temp = document.querySelector('.temperature');
let maxTemp = document.querySelector('.maxtemp');
let minTemp = document.querySelector('.mintemp');
let windSpeed = document.querySelector('.windspeed');
let humidityValue= document.querySelector('.humidity');
let pressureValue = document.querySelector('.pressure');
let sunriseTime = document.querySelector('.sunrisetime');
let sunsetTime = document.querySelector('.sunsettime');
let wstatus = document.querySelector('.status');
let image = document.querySelector('.image');


cityInput.addEventListener('keyup', showWeather);


function showWeather(e){
    if (e.keyCode === 13){
        let city = cityInput.value;
        let xml = new XMLHttpRequest();
    xml.open(
        'GET',
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51505d723ae1821935d52da41a1b9e14&units=metric`);
    xml.onreadystatechange = function () {
        if(xml.readyState === 4 && xml.status === 200){
           displayWeather(JSON.parse(xml.responseText));
           console.log(JSON.parse(xml.responseText));
        }
            
    };
    xml.send();
    }}


    function displayWeather(data) {

        let date = new Date();
        let localTime = date.getTime();
        let localOffset = date.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;

        let utcTime = utc + 1000 * data.timezone;
        let newCity = new Date(utcTime);

        let cityHours = newCity.getHours();
        let cityMinutes = newCity.getMinutes();

        let msunrise = new Date(data.sys.sunrise * 1000).getMinutes();
        let msunset = new Date(data.sys.sunset *1000).getMinutes();
        
        let hsunrise = new Date(data.sys.sunrise * 1000).getHours();
        let hsunset = new Date(data.sys.sunset * 1000).getHours();

        if(msunrise < 10) {
            msunrise = `0${msunrise}`;
        } else {
            msunrise;
        };
        if(hsunrise < 10) {
            hsunrise = `0${hsunrise}`;
        } else {
            hsunrise;
        };

        if(msunset < 10) {
            msunset = `0${msunset}`;
        } else {
            msunset;
        };
        if(hsunset < 10) {
            hsunset = `0${hsunset}`;
        } else {
            hsunset;
        };
        if(cityHours < 10){
            cityHours = `0${cityHours}`;
        } else {
            cityHours;
        }
        if(cityMinutes < 10){
            cityMinutes = `0${cityMinutes}`;
        } else {
            cityMinutes;
        }



        time.innerHTML = `${cityHours}:${cityMinutes}h`;
        sunriseTime.innerHTML = `Sunrise time: ${hsunrise}:${msunrise} h`;
        sunsetTime.innerHTML = `Sunset time: ${hsunset}:${msunset} h`;
        windSpeed.innerHTML = `Wind speed: ${data.wind.speed} km/h `;
        humidityValue.innerHTML = `Humidity: ${data.main.humidity} %`;
        pressureValue.innerHTML = `Pressure: ${data.main.pressure} PA`
        temp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
        minTemp.innerHTML = `Min temp: ${Math.round(data.main.temp_min)}&deg;C`;
        maxTemp.innerHTML = `Max temp: ${Math.round(data.main.temp_max)}&deg;C`;
       wstatus.innerHTML = `Weather status: ${data.weather[0].description}`;


        let currentStatus = data.weather[0].description;

   if(currentStatus.includes("clear sky")) {
    image.getAttribute("src","clearsky.png");
   } else if (currentStatus.includes("clouds")) {
    image.getAttribute("src","cloud.png");
   } else if (currentStatus.includes("rain")) {
    image.getAttribute("src","rain.png");
   } else if (currentStatus.includes("thunderstrom")) {
    image.getAttribute("src","thunderstorm.png");
   } else if (currentStatus.includes("snow")) {
    image.getAttribute("src","snow.png");
   } else if (currentStatus.includes("mist")) {
    image.getAttribute("src","mist.png");
   } 
   

   let days = ["Sunday","Monday","Thuesday","Wednesday","Thursday","Friday","Saturday","Sunday",];
   let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

   day.innerHTML = days[newCity.getDay()];
   date_year.innerHTML= `${months[newCity.getMonth()]} ${newCity.getUTCDate()}, ${newCity.getFullYear()}`;
    }

    