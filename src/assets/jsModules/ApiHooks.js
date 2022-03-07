import {ApiConfig} from './ApiConfig';
import * as url from 'url';


const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  console.log('RESPONSE', response);
  const json = await response.json();
  if (json.error) {
    // if API response contains error message (use Postman to get further details)
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    // if API response does not contain error message, but there is some other error
    throw new Error('doFetch failed');
  } else {
    // if all goes well
    return json;
  }
};

// Function for all the API calls
const useApiData = () => {
  // Function for fetching the weather data with given city parameter
  const getWeatherData = async (lat, lon) => {
    const fetchOptions = {
      method: 'GET',
    };
    try {
      return await doFetch(
        ApiConfig.weatherApiUrl +
        'lat=' +
        lat +
        '&lon=' +
        lon +
        ApiConfig.weatherApiKey,
        fetchOptions,
      );
    } catch (e) {
      alert(e.message);
    }
  };

  const getHslDataByRadius = async (radius) => {
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/graphql'},
      body: radius,
    };
    try {
      return await doFetch(ApiConfig.hslApiUrl, fetchOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  const getHslDataByStop = async (query) => {
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/graphql'},
      body: query,
    };
    try {
      return await doFetch(ApiConfig.hslApiUrl, fetchOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  const getSodexoData = async (campus, date) => {
    const fetchOptions = {
      method: 'GET',
    };
    try {
      return await doFetch(
        campus + date, fetchOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  const getFazerData = async (lang, date) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      ApiConfig.fazerKaramalmiApiUrl + lang + ApiConfig.fazerEnd +
      '2022-02-01')}`;
    try {
      let jsonData = await doFetch(url,
        fetchOptions);
      jsonData = JSON.parse(jsonData.contents);
      return jsonData;
    } catch (e) {
      alert(e.message);
    }
  };


  return {
    getWeatherData,
    getHslDataByRadius,
    getHslDataByStop,
    getFazerData,
    getSodexoData,

  };
};

export {useApiData};

