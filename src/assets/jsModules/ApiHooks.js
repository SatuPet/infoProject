import {ApiConfig} from './ApiConfig';

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
  const getWeatherData = async (city) => {
    const fetchOptions = {
      method: 'GET',
    };
    try {
      return await doFetch(
        ApiConfig.weatherApiUrl + city + ApiConfig.weatherApiKey, fetchOptions);
    } catch (e) {
      alert(e.message);
    }
  };
  return {getWeatherData};
};

export {useApiData};

