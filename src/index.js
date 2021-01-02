function showWeather(response) {
    console.log(response);
  
    document.querySelector("#city").innerHTML = response.data.name;
  
    let temperature = Math.round(response.data.main.temp);
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
  }
  
  function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#input-city").value;
    let apiKey = "1485caf947c0e72e759dc557efc47cd5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  }
  let search = document.querySelector("#search");
  search.addEventListener("click", searchCity)
  
  
  function currentDate() {
    let currentTime = new Date();
    let span = document.querySelector(".date");
    let date = currentTime.getDate();
    let year = currentTime.getFullYear();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    let month = months[currentTime.getMonth()];
    let day = days[currentTime.getDay()];
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
  
    span.innerHTML = `${day}  ${date} ${month} ${year} ${hour}:${minute}`;
  }
  currentDate();
  
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
  