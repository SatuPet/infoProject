import {useApiData} from './ApiHooks';

let temperature = document.querySelectorAll('.temperature');
let image = document.querySelectorAll('.image');

/**
 * Old weather API
 */
/* const weather = () => {
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
}; */

/**
 *
 * @param {Number} lat latitude of campus
 * @param {Number} lon longitude of campus
 */
const weather = (lat, lon) => {
  const getWeather = useApiData().getWeatherData(lat, lon);
  getWeather.then(function (data) {
    const weatherData = data.data[0];
    for (let i = 0; i < temperature.length; i++) {
    console.log('',weatherData);
    temperature[i].innerHTML = `  ${weatherData.temp} °C`;
    const imgCode = `${weatherData.weather.icon}`;
    image[i].innerHTML =
      '<img src="./assets/weather-icons/' + imgCode + '.png" alt="weatherImg">';
    }
  });
};


export {weather};
