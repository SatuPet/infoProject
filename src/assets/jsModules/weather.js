import {useApiData} from './ApiHooks';

let city = document.querySelectorAll('.city');
let clouds = document.querySelectorAll('.clouds');
let wind = document.querySelectorAll('.wind');
let temperature = document.querySelectorAll('.temperature');
let image = document.querySelectorAll('.image');

const weather = () => {
  const getWeather = useApiData().getWeatherData('espoo');
  getWeather.then(function(data) {
    console.log(city.length);
    for (let i = 0; i < city.length; i++) {
      city[i].innerHTML = `${data.name}`;
      clouds[i].innerHTML = `${data.weather[0].description}`;
      wind[i].innerHTML = `${data.wind.speed} m/s`;
      const kelvins = `${data.main.temp}`;
      const trueTemperature = kelvins - 273.15;
      temperature[i].innerHTML = Math.round(trueTemperature * 10) / 10 + ' °C';
      const imgCode = `${data.weather[0].icon}`;
      image[i].innerHTML = '<img src="https://openweathermap.org/img/wn/' +
        imgCode +
        '@2x.png" alt="weatherImg">';
    }
  });
};

export {weather};
