import {getDsBusses} from './hsl';
import {weather} from './weather';
import {getMenus, selectedCampus} from './lunchMenu';

let localCampus = selectedCampus;
const dsMenuList = document.getElementById('ds-menu-list');
const restaurantOpen = document.querySelector('#text-open');
const menuPrices = document.querySelector('#text-prices');
const dsMenuTexts = document.getElementById('ds-menu-list');

console.log('hello from ds.js');
const timebox = document.getElementById('date-time');
let nameOfCampus = document.getElementById('campus-name');

let menuLang;

/**
 * Get date and time to ds layer
 */
const getDateTime = () => {
  const dateTime = new Date();
  let date = dateTime.getDate();
  let month = dateTime.getMonth();
  let year = dateTime.getFullYear();
  let hours = dateTime.getHours();
  let minutes =
    dateTime.getMinutes() < 10
      ? '0' + dateTime.getMinutes()
      : dateTime.getMinutes();
  //let dateAndTime = date + "." + month + ". " + year + ' ' + hours + ":" + minutes;
  //let dateAndTime = '<i class="bi-clock" style="font-size: 4rem; color: #ff5000;"></i> ' + ' ' + hours + ":" + minutes;
  let dateAndTime = hours + ':' + minutes;
  //console.log("Päiväys: ", dateAndTime);
  timebox.innerHTML = dateAndTime;
  setTimeout(getDateTime, 30000);
};

/**
 * Changes menu's language
 */
const changeLangOfMenu = () => {
  console.log('menu change called');
  console.log(menuLang);
  if (menuLang === 'inEnglish') {
    menuLang = 'inFinnish';
    getMenus(selectedCampus, 'ds', menuLang);
  } else {
    menuLang = 'inEnglish';
    getMenus(selectedCampus, 'ds', menuLang);
  }
};

/**
 * Call language changer every 30 seconds
 */
setInterval(changeLangOfMenu, 30000);

let hslInterval;
/**
 *HSL time table timer 30 sec
 *
 * @param {Number} campusLat latitude of campus
 * @param {Number} campusLon longitude of campus
 * @param {Number} campusRad stop range from campus
 */
const hslTimer = (campusLat, campusLon, campusRad) => {
  clearInterval(hslInterval);
  getDsBusses(campusLat, campusLon, campusRad);
  const printBusses = () => {
    getDsBusses(campusLat, campusLon, campusRad);
  };
  hslInterval = setInterval(printBusses, 30000);
};
hslTimer(60.2241077, 24.7565312, 600); //default Karamalmi

//DS campus listeners
document.getElementById('arabia-campus').addEventListener('click', () => {
  dsMenuTexts.style.lineHeight = 'normal';
  dsMenuList.innerHTML = '';
  menuPrices.innerHTML = 'Hinnat: 2.70€ / 8.00€';
  restaurantOpen.innerHTML = 'Avoinna: 10.30-13.30';
  getMenus('arabia', 'ds');
  localCampus = 'arabia';
  console.log('name clicked');
  nameOfCampus.innerHTML = 'Arabia';
  hslTimer(60.2094084, 24.9809358, 500);
  weather(60.2094084, 24.9809358);
});
document.getElementById('karamalmi-campus').addEventListener('click', () => {
  dsMenuTexts.style.lineHeight = 'normal';
  dsMenuList.innerHTML = '';
  menuPrices.innerHTML = 'Hinnat: 1.90€ / 2.70€ / 5.71€ (Opiskelijat)';
  restaurantOpen.innerHTML = 'Avoinna: 11.00-13.15';
  getMenus('karamalmi', 'ds');
  localCampus = 'karamalmi';
  console.log('name clicked');
  nameOfCampus.innerHTML = 'Karamalmi';
  hslTimer(60.2241077, 24.7565312, 600);
  weather(60.2241077, 24.7565312);
});
document.getElementById('myllypuro-campus').addEventListener('click', () => {
  dsMenuTexts.style.lineHeight = 'normal';
  dsMenuList.innerHTML = '';
  menuPrices.innerHTML = 'Hinnat: 2.70€ / 5.50€ / 6.70€';
  restaurantOpen.innerHTML = 'Avoinna: 10.30-14.00';
  getMenus('myllypuro', 'ds');
  localCampus = 'myllypuro';
  console.log('name clicked');
  nameOfCampus.innerHTML = 'Myllypuro';
  hslTimer(60.2234938, 25.0757339, 400);
  weather(60.2234938, 25.0757339);
});
document.getElementById('myyrmaki-campus').addEventListener('click', () => {
  dsMenuTexts.style.lineHeight = 'normal';
  dsMenuList.innerHTML = '';
  menuPrices.innerHTML = 'Hinnat: 2.70€ / 5.50€ / 6.70€';
  restaurantOpen.innerHTML = 'Avoinna: 10.30-14.00';
  getMenus('myyrmaki', 'ds');
  localCampus = 'myyrmaki';
  console.log('name clicked');
  nameOfCampus.innerHTML = 'Myyrmäki';
  hslTimer(60.2588793, 24.8488313, 520);
  weather(60.2588793, 24.8488313);
});

export {getDateTime};
