function showWeather(response) {
    console.log(response);
  
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
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)
  }
  
  function searchCity (city){
   
    let apiKey = "1485caf947c0e72e759dc557efc47cd5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    searchCity(cityInputElement.value)
  }

  function showFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector(".temp");
    let fahrenheitTemperature = (celsiusTempersture*9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  function showCelsiusTemperature(event){
    event.preventDefault();
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

  function formatDate() {
    let date = new Date(); 
    let hour = date.getHours();
    if(hour<10){
      hour = `0${hour}`;
    }
    let minute = date.getMinutes(); 
    if (minute < 10) {
      minute = `0${minute}`
    }         
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
    
    return `${day} ${hour}:${minute}`;
  }
  
  
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
  

 