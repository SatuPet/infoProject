import {useApiData} from './ApiHooks';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
const todayStart = today + 'T08:00:00';
let requestObject = {
  group: [],
  room: [],
  realization: [],
  startDate: todayStart,
  apiKey: '',
  apiUrl: '',
  rangeStart: '',
  rangeEnd: '',
};
const getReservations = () => {
  const reservations = useApiData().postGetMetropoliaData(requestObject);
  reservations.then(result => {
    console.log(result);
  });
};

export {getReservations};
