  function formatDate(timestamp) {
    let date = new Date(timestamp);     
    
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    
    return `Last update: ${day} ${formatHours(timestamp)}`;
  }

  function formatHours(timestamp){
    let date = new Date(timestamp); 
    let hours = date.getHours();
    if(hours<10){
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes(); 
    if (minutes < 10) {
      minutes = `0${minutes}`
    }         
    return `${hours}:${minutes}`;
  }


  function showWeather(response) {
    
    document.querySelector("#city").innerHTML = response.data.name;
  
    celsiusTempersture = response.data.main.temp
    let temperature = Math.round(celsiusTempersture);
    let temperatureElement = document.querySelector(".temp");
    temperatureElement.innerHTML = `${temperature}`;
  
    let humidity = Math.round(response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${humidity} %`;
  
    let speed = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${speed} km/h`;
  
    let precipitation = response.data.main.feels_like;
    let precipitationElement = document.querySelector("#precipitation");
    precipitationElement.innerHTML = `${precipitation} %`;
  
    let currentWeather = response.data.weather[0].description;
    let currentWeatherElement = document.querySelector("#current-weather");
    currentWeatherElement.innerHTML = `${currentWeather}`;

    let dateElement = document.querySelector(".date");
    dateElement.innerHTML = formatDate((response.data.dt + response.data.timezone) * 1000);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)
  }
  
  
  function showForecast(response){
    let forecastElement = document.querySelector("#forecast");  
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      timezone = response.data.city.timezone;
      forecastElement.innerHTML += `
      <div class="col-2">
        <h3>
          ${formatHours((forecast.dt + timezone) * 1000)}
        </h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
        <div class="weather-forecast-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
        </div>
      </div>
      `;
    }
  }

    

  function searchCity (city){
   
    let apiKey = "1485caf947c0e72e759dc557efc47cd5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    searchCity(cityInputElement.value)
  }

  function showFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector(".temp");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTempersture*9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  function showCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector(".temp");
    temperatureElement.innerHTML = Math.round(celsiusTempersture);
  }

  let celsiusTempersture = null;

  let search = document.querySelector("#search");
  search.addEventListener("click", handleSubmit)
    
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature)

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemperature)

  searchCity("Prague");

  
  
  function showCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  
    let apiPositionKey = "1485caf947c0e72e759dc557efc47cd5";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiPositionKey}`;
    axios.get(apiPositionUrl).then(showWeather);
  }
  
  let current = document.querySelector("#current");
  current.addEventListener("click", showCurrentPosition);
  



 