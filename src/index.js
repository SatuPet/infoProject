import {weather} from './assets/jsModules/weather';
import {getBusses, getTwoStops} from './assets/jsModules/hsl';
import {getMenus, selectedCampus} from './assets/jsModules/lunchMenu';
import {getDateTime} from './assets/jsModules/ds';

// getMenus('karamalmi');

let weatherInterval;
/**
 * Weather timer 1 hour
 * @param {Number} campusLat latitude of campus
 * @param {Number} campusLon longitude of campus
 */
const weatherTimer = (campusLat, campusLon) => {
  clearInterval(weatherInterval);
  weather(campusLat, campusLon);
  const printWeather = () => {
    weather(campusLat, campusLon);
  };
  weatherInterval = setInterval(printWeather, 3600000);
};
weatherTimer(60.2241077, 24.7565312); //default Karamalmi

getDateTime();

// HSL stops
window.addEventListener('scroll', (event) => {
  // KARAMALMI
  document.getElementById('karanristiEast').addEventListener('click', () => {
    getBusses(2132208);
  });
  document.getElementById('karanristiWest').addEventListener('click', () => {
    getBusses(2132207);
  });
  document.getElementById('landerannantie').addEventListener('click', () => {
    getBusses(2133225);
  });
  document.getElementById('karamalmensWest').addEventListener('click', () => {
    getBusses(2132225);
  });
  document.getElementById('karamalmensEast').addEventListener('click', () => {
    getBusses(2132226);
  });

    // ARABIA
  document.getElementById('KaironkatuNorth').addEventListener('click', () => {
    getBusses(1230102);
  });
  document.getElementById('KaironkatuSouth').addEventListener('click', () => {
    getBusses(1230101);
  });
  document.getElementById('Arabianranta').addEventListener('click', () => {
    getBusses(1232102);
  });
  document.getElementById('ArabianrantaSpora').addEventListener('click', () => {
    getBusses(1230407);
  });

  // MYLLYPURO
  document.getElementById('LiikuntamyllyWest').addEventListener('click', () => {
    getBusses(1454111);
  });
  document.getElementById('LiikuntamyllyWEast').addEventListener('click', () => {
    getBusses(1454112);
  });
  document.getElementById('MyllypuronTervAs').addEventListener('click', () => {
    getBusses(1454138);
  });
  document.getElementById('MyllypuronMetroasema').
    addEventListener('click', () => {
      getTwoStops(1454601, 1454602, 'Myllypuron Metroasema');
    });
  document.getElementById('MyllypuroMEast').addEventListener('click', () => {
    getBusses(1454140);
  });
  document.getElementById('MyllypuroMWest').addEventListener('click', () => {
    getBusses(1454141);
  });

  // MYYRM??KI
  document.getElementById('MyyrmakiJunaAsema').addEventListener('click', () => {
    getTwoStops(4150551, 4150501, 'Myyrm??en Juna-asema');
  });
  document.getElementById('LeiritieEast').addEventListener('click', () => {
    getBusses(4150201);
  });
  document.getElementById('LeiritieWest').addEventListener('click', () => {
    getBusses(4150296);
  });
  document.getElementById('Raappavuorentie').addEventListener('click', () => {
    getBusses(4150228);
  });
  document.getElementById('Honkasuo').addEventListener('click', () => {
    getBusses(4150269);
  });
});

// "parallax" Y postition moving
window.addEventListener('scroll', (event) => {

  let top = window.scrollY / 2;
  const background = document.querySelector('body');
  background.style.backgroundPositionY = top + 'px';
});

//navbar collapse moving back when you touch somewere else
const menuToggle = document.getElementById('navbarToggleExternalContent');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

const closeNavbar = () => {

  bsCollapse.hide();
};

document.querySelectorAll('.main').
  forEach(main => main.addEventListener('click', closeNavbar));
document.querySelector('.metroMeno').addEventListener('click', closeNavbar);


//darkMode
const darkModeToggleButton = document.querySelector('#flexSwitchCheckDefault1');
let darkModeStyleSheet;

const changeDarkMode = () => {
  const darkModeSetting = localStorage.getItem('darkModeSetting');
  if (darkModeSetting === null) {
    localStorage.setItem('darkModeSetting', 'whitemode');
  } else {

    if (darkModeSetting == 'whitemode') {
      // Creating the darkmode css style sheet and adding it to DOM
      darkModeStyleSheet = document.createElement('link');
      darkModeStyleSheet.rel = 'stylesheet';
      darkModeStyleSheet.href = 'assets/cssModules/darkMode.css';
      document.head.appendChild(darkModeStyleSheet);

      // Saving preference to storage
      localStorage.setItem('darkModeSetting', 'darkmode');
    } else {
      if (darkModeStyleSheet != undefined) {
        console.log(darkModeStyleSheet);
        darkModeStyleSheet.remove();
      }

      // Saving preference to storage
      localStorage.setItem('darkModeSetting', 'whitemode');
    }

  }

};

darkModeToggleButton.addEventListener('click', changeDarkMode);
//set right theme
const setTheme = () => {
  const darkModeSetting = localStorage.getItem('darkModeSetting');
  if (darkModeSetting === null) {
    localStorage.setItem('darkModeSetting', 'whitemode');
  } else {

    if (darkModeSetting == 'darkmode') {
      // Creating the darkmode css style sheet and adding it to DOM
      darkModeStyleSheet = document.createElement('link');
      darkModeStyleSheet.rel = 'stylesheet';
      darkModeStyleSheet.href = 'assets/cssModules/darkMode.css';
      document.head.appendChild(darkModeStyleSheet);
      document.getElementById('flexSwitchCheckDefault1').checked = true;
    }

  }
};

const hideAllMaps = document.querySelectorAll('.map');
const changeKaramalmiCampus = document.querySelector('.karamalmiMap');
const changeArabiaCampus = document.querySelector('.arabiaMap');
const changeMyllypuroCampus = document.querySelector('.myllypuroMap');
const changeMyyrmakiCampus = document.querySelector('.myyrmakiMap');

//hide all hsl maps
const hideMaps = () => {
  hideAllMaps.forEach(map => map.style.display = 'none');
};
//choosing different campus
//karamalmi
const karamalmiCampus = (event) => {
  document.querySelectorAll('.nav-link').
    forEach(link => link.classList.remove('selected-nav-link'));
  document.querySelector('.karamalmiButton').classList.add('selected-nav-link');
  getMenus('karamalmi');
  hideMaps();
  changeKaramalmiCampus.style.display = 'block';
};
document.querySelector('.karamalmiButton').
  addEventListener('click', karamalmiCampus);
//arabia
const arabiaCampus = () => {
  document.querySelectorAll('.nav-link').
    forEach(link => link.classList.remove('selected-nav-link'));
  document.querySelector('.arabiaButton').classList.add('selected-nav-link');
  getMenus('arabia');
  hideMaps();
  changeArabiaCampus.style.display = 'block';
};
document.querySelector('.arabiaButton').addEventListener('click', arabiaCampus);
//myllypuro
const myllypuroCampus = () => {
  document.querySelectorAll('.nav-link').
    forEach(link => link.classList.remove('selected-nav-link'));
  document.querySelector('.myllypuroButton').classList.add('selected-nav-link');
  getMenus('myllypuro');
  hideMaps();
  changeMyllypuroCampus.style.display = 'block';
};
document.querySelector('.myllypuroButton').
  addEventListener('click', myllypuroCampus);
//myyrm??ki
const myyrmakiCampus = () => {
  document.querySelectorAll('.nav-link').
    forEach(link => link.classList.remove('selected-nav-link'));
  document.querySelector('.myyrmakiButton').classList.add('selected-nav-link');
  getMenus('myyrmaki');
  hideMaps();
  changeMyyrmakiCampus.style.display = 'block';
};
document.querySelector('.myyrmakiButton').
  addEventListener('click', myyrmakiCampus);

//inEnglish button
const inEnglishToggleButton = document.querySelector(
  '#flexSwitchCheckDefault2');
//creating inEnglishSettings
const changeInEnglish = () => {
  const inEnglishSetting = localStorage.getItem('inEnglishSetting');
  if (inEnglishSetting === null) {
    localStorage.setItem('inEnglishSetting', 'inEnglish');
  } else {
    if (inEnglishSetting == 'inEnglish') {
      //all you can change is p, a and div element
      document.querySelectorAll('p[lang="en"], a[lang="en"], div[lang="en"]').
        forEach(text => text.style.display = 'none');
      document.querySelectorAll('p[lang="fi"], a[lang="fi"], div[lang="fi"]').
        forEach(text => text.style.display = 'block');

      // Saving preference to storage
      localStorage.setItem('inEnglishSetting', 'inFinnish');
    } else {
      document.querySelectorAll('p[lang="fi"], a[lang="fi"], div[lang="fi"]').
        forEach(text => text.style.display = 'none');
      document.querySelectorAll('p[lang="en"], a[lang="en"], div[lang="en"]').
        forEach(text => text.style.display = 'block');

      // Saving preference to storage
      localStorage.setItem('inEnglishSetting', 'inEnglish');
    }
  }
};

inEnglishToggleButton.addEventListener('click', function() {
  changeInEnglish();
  getMenus(selectedCampus);
});

//switch language
const setLanguage = () => {
  const inEnglishSetting = localStorage.getItem('inEnglishSetting');
  if (inEnglishSetting === null) {
    localStorage.setItem('inEnglishSetting', 'inFinnish');
  } else {
    if (inEnglishSetting === 'inFinnish') {
      document.querySelectorAll('p[lang="en"], a[lang="en"], div[lang="en"]').
        forEach(text => text.style.display = 'none');
    } else {
      document.getElementById('flexSwitchCheckDefault2').checked = true;
      document.querySelectorAll('p[lang="fi"], a[lang="fi"], div[lang="fi"]').
        forEach(text => text.style.display = 'none');
    }
  }
};

const init = () => {
  setTheme();
  setLanguage();
};
init();
