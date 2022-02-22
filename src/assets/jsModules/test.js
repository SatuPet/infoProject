import {useApiData} from './ApiHooks';

let city = document.getElementById('city');
let clouds = document.getElementById('clouds');
let wind = document.getElementById('wind');
let temperature = document.getElementById('temperature');
let image = document.getElementById('image');

const weather = () => {
  const getWeather = useApiData().getWeatherData('espoo');
  getWeather.then(function(data) {
    city.innerHTML = `${data.name}`;
    clouds.innerHTML = `${data.weather[0].description}`;
    wind.innerHTML = `${data.wind.speed} m/s`;
    const kelvins = `${data.main.temp}`;
    const trueTemperature = kelvins - 273.15;
    temperature.innerHTML = Math.round(trueTemperature * 10) / 10 + ' °C';
    const imgCode = `${data.weather[0].icon}`;
    image.innerHTML = '<img src="https://openweathermap.org/img/wn/' + imgCode +
      '@2x.png" alt="weatherImg">';
  });
};

export {weather};
