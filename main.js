class Weather {
    constructor(city) {
        this.apiKey = 'a410d434b93feec26bebd81657d102f9';
        this.city = city;
    }
  
    // Fetch weather from API
    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`);
        if(response.status === 404) {
            document.querySelector('.empty-field-warning').textContent = 'City not found. Try again!'
            document.querySelector('.empty-field-warning').style.display = 'block';
        } else {
            const data = await response.json();
            return data;
        }
           
    }
}

class LocalWeather {
    constructor(latitude, longitude) {
        this.apiKey = 'a410d434b93feec26bebd81657d102f9';
        this.latitude = latitude;
        this.longitude = longitude;
    }
  
    // Fetch weather from API
    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=${this.apiKey}`);
        const data = await response.json();
        return data;   
    }
}

class UI {
    constructor() {
      this.location = document.getElementById('result-place');
      this.desc = document.getElementById('result-weather-desc');
      this.string = document.getElementById('result-temp');
      this.icon = document.querySelector('.img-fluid');

      this.humidity = document.getElementById('result-humidity');
      this.feelsLike = document.getElementById('result-feeling');
      this.dewpoint= document.getElementById('result-pressure');
      this.wind = document.getElementById('result-mintemp');
      this.details = document.getElementById('result-maxtemp');
    }
  
    populateUI(data) {
        this.location.textContent = data.name + ", " + data.sys.country;
        this.desc.textContent = data.weather[0].main;
        this.string.textContent = Math.trunc(data.main.temp) + '°C';
        
        this.humidity.textContent = data.main.humidity + '%';
        this.feelsLike.textContent = Math.trunc(data.main.feels_like) + '°C';
        this.dewpoint.textContent = Math.trunc(data.wind.speed) + 'km/h';
        this.wind.textContent = Math.trunc(data.main.temp_min) + '°C';
        this.details.textContent = Math.trunc(data.main.temp_max) + '°C';

        if(data.weather[0].main === 'Clear'){
            this.icon.setAttribute('src', 'https://bmcdn.nl/assets/weather-icons/all/clear-day.svg');
        } else if (data.weather[0].main === 'Clouds') {
            this.icon.setAttribute('src', 'https://bmcdn.nl/assets/weather-icons/all/cloudy.svg');
        } else if (data.weather[0].main === 'Snow') {
            this.icon.setAttribute('src', 'https://bmcdn.nl/assets/weather-icons/all/snow.svg');
        } else if (data.weather[0].main === 'Rain') {
            this.icon.setAttribute('src', 'https://bmcdn.nl/assets/weather-icons/all/rain.svg');
        } else {
            this.icon.setAttribute('src', 'https://bmcdn.nl/assets/weather-icons/all/cloudy.svg');
        }
    }
  }

const button = document.querySelector('#search-btn');
const input = document.querySelector('#search-input');
const enterCode = 13;

button.addEventListener('click', () => {
    if(input.value === '') {
        document.querySelector('.empty-field-warning').textContent = 'The search field cannot be empty!'
        document.querySelector('.empty-field-warning').style.display = 'block';
    } else {
        document.querySelector('.empty-field-warning').style.display = 'none';
        const newSearch = new Weather(input.value);
        const newUI = new UI();
        newSearch.getWeather(input.value)
        .then((data) => {
            newUI.populateUI(data);
        });} 
});

input.addEventListener('keyup', function(e) {
  if (e.keyCode === enterCode) {
    if(input.value === '') {
        document.querySelector('.empty-field-warning').style.display = 'block';
    } else {
        document.querySelector('.empty-field-warning').style.display = 'none';
        const newSearch = new Weather(input.value);
        const newUI = new UI();
        newSearch.getWeather(input.value)
        .then((data) => {
            newUI.populateUI(data);
        });}
    } else {
      return;
    }
  }
);

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const {latitude} = position.coords;
            const {longitude} = position.coords;

            const newSearch = new LocalWeather(latitude, longitude);
            const newUI = new UI();
            newSearch.getWeather()
            .then((data) => {
            newUI.populateUI(data);
            });
        },
        function () {
            return
        }
    ) 
}






