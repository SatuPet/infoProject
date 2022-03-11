import {ApiConfig} from './ApiConfig';
import * as url from 'url';

/**
 * Basic fetch method and error handling
 * @param url
 * @param options
 * @returns {Promise<any>}
 */
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

/**
 * Function for all the different API calls
 * @returns {{getHslDataByRadius: ((function(*): Promise<*|undefined>)|*), getSodexoData: ((function(*, *): Promise<*|undefined>)|*), getWeatherData: ((function(*, *): Promise<*|undefined>)|*), getHslDataByStop: ((function(*): Promise<*|undefined>)|*), getFazerData: ((function(*, *): Promise<*|undefined>)|*)}}
 */
const useApiData = () => {
  /**
   * Function for fetching the weather data with given coordinates
   * @param lat
   * @param lon
   * @returns {Promise<*>}
   */
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


  /**
   * Function for fetching HSL stops and their schedules
   * within certain radius and position
   * @param radius
   * @returns {Promise<*>}
   */
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

  /**
   * Function for fetching HSL schedules for specific stop
   * @param query
   * @returns {Promise<*>}
   */
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

  /**
   * Function for fetching Sodexo data
   * @param campus selected campus
   * @param date
   * @returns {Promise<*>}
   */
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

  /**
   * Function for fetching Fazer data
   * @param lang language
   * @param date wanted date
   * @returns {Promise<*>}
   */
  const getFazerData = async (lang, date) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      ApiConfig.fazerKaramalmiApiUrl + lang + ApiConfig.fazerEnd +
      date)}`;
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

