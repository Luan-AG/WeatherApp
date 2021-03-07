class Weather {
    constructor(city) {
        this.apiKey = 'a410d434b93feec26bebd81657d102f9';
        this.city = city;
    }
  
    // Fetch weather from API
    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`);
            
        const data = await response.json();
        console.log(data.weather[0].main);
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
    const newSearch = new Weather(input.value);
    const newUI = new UI();
    newSearch.getWeather(input.value)
    .then((data) => {
        newUI.populateUI(data);
    }); 
});

input.addEventListener('keyup', function(e) {
  if (e.keyCode === enterCode) {
    const newSearch = new Weather(input.value);
    const newUI = new UI();
    newSearch.getWeather(input.value)
    .then((data) => {
        newUI.populateUI(data);
    });
    } else {
      return;
    }
  }
);

window.addEventListener("DOMContentLoaded", () => {
    const newSearch = new Weather('warsaw');
    const newUI = new UI();
    newSearch.getWeather('warsaw')
    .then((data) => {
        newUI.populateUI(data);
    });
  });