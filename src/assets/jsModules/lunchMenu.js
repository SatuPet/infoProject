import {useApiData} from './ApiHooks';
import {ApiConfig} from './ApiConfig';

let selectedCampus = 'karamalmi';

const todayISODate = new Date().toISOString().split('T')[0];
let today = new Date();
let today2 = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let lunch = document.querySelector('#lunch');
let menuText = document.querySelector('#menuText');
let menuPricesFi = document.querySelector('#menuPricesFi');
let restaurantOpenFi = document.querySelector('#restaurantOpenFi');
let menuPricesEn = document.querySelector('#menuPricesEn');
let restaurantOpenEn = document.querySelector('#restaurantOpenEn');
const restaurantOpen = document.querySelector('#text-open');
const menuPrices = document.querySelector('#text-prices');
today = yyyy + '-' + mm + '-' + dd;
today2 = today2.getDate() + '.' + (today2.getMonth() + 1) + '.' +
  today2.getFullYear();
const noFood = 'No menu for the day';
const dsBox = document.querySelector('#ds-menu-list');
const mobileBox = document.querySelector('#lunch');

/**
 * Handles getting the menu from the API and displaying it
 * @param campus
 * @param caller determines if method is called from ds view or not, since
 * ds calls are automated every 30s, and we don't want it to affect mobile view
 * @param lang1 Determines if menu is called in english or finnish
 */
const getMenus = (campus, caller = '', lang1) => {
  console.log(campus);
  console.log('caller 2: ' + caller);
  let lang = 'fi';
  let inEnglishSetting;

  if (caller === 'ds') {
    inEnglishSetting = lang1;
    dsBox.innerHTML = '';
  } else {
    inEnglishSetting = localStorage.getItem('inEnglishSetting');
    mobileBox.innerHTML = '';
  }
  // Handles display language with local variable
  if (inEnglishSetting === 'inEnglish') {
    lang = 'en';
  } else lang = 'fi';

  // Fetch all the data and call other functions to parse and display it
  try {
    let data;
    // Myyrmaki
    if (campus === 'myyrmaki') {
      selectedCampus = 'myyrmaki';
      menuText.innerHTML = 'Menu';
      if (lang === 'fi') {
        menuPrices.innerHTML = 'Hinnat: 2.70€ / 5.50€ / 6.70€';
        restaurantOpen.innerHTML = 'Avoinna: 10.30-14.00';
      }
      if (lang === 'en') {
        menuPrices.innerHTML = 'Prices: 2.70€ / 5.50€ / 6.70€';
        restaurantOpen.innerHTML = 'Open: 10.30-14.00';
      }
      menuPricesFi.innerHTML = 'Hinnat: 2.70€ / 5.50€ / 6.70€';
      restaurantOpenFi.innerHTML = 'Avoinna: 10.30-14.00';
      menuPricesEn.innerHTML = 'Price: 2.70€ / 5.50€ / 6.70€';
      restaurantOpenEn.innerHTML = 'Open: 10.30-14.00';
      data = useApiData().
        getSodexoData(ApiConfig.sodexoMyyrmakiApiUrl, todayISODate);
      data.then(function(result) {
        if (result.courses !== null || undefined) {
          console.log(result.courses);
          parseSodexo(lang, result.courses, inEnglishSetting, caller);
        } else addCoursesToList(noFood);
      });
      // Myllypuro
    } else if (campus === 'myllypuro') {
      selectedCampus = 'myllypuro';
      menuText.innerHTML = 'Menu';
      if (lang === 'fi') {
        menuPrices.innerHTML = 'Hinnat: 2.70€ / 5.50€ / 6.70€';
        restaurantOpen.innerHTML = 'Avoinna: 10.30-14.00';
      }
      if (lang === 'en') {
        menuPrices.innerHTML = 'Prices: 2.70€ / 5.50€ / 6.70€';
        restaurantOpen.innerHTML = 'Open: 10.30-14.00';
      }
      menuPricesFi.innerHTML = 'Hinnat: 2.70€ / 5.50€ / 6.70€';
      restaurantOpenFi.innerHTML = 'Avoinna: 10.30-14.00';
      menuPricesEn.innerHTML = 'Price: 2.70€ / 5.50€ / 6.70€';
      restaurantOpenEn.innerHTML = 'Open: 10.30-14.00';
      data = useApiData().
        getSodexoData(ApiConfig.sodexoMyllypuroApiUrl, todayISODate);
      data.then(function(result) {
        if (result.courses !== null || undefined) {
          parseSodexo(lang, result.courses, inEnglishSetting, caller);
        } else addCoursesToList(noFood);
      });
    } else if (campus === 'karamalmi') {
      selectedCampus = 'karamalmi';
      menuText.innerHTML = 'Menu';
      if (lang === 'fi') {
        menuPrices.innerHTML = 'Hinnat: 1.90€ / 2.70€ / 5.71€ (Opiskelijat)';
        restaurantOpen.innerHTML = 'Avoinna: 11.00 - 13.15';
      }
      if (lang === 'en') {
        menuPrices.innerHTML = 'Prices: 1.90€ / 2.70€ / 5.71€ (Students)';
        restaurantOpen.innerHTML = 'Open: 11.00 - 13.15';
      }
      menuPricesFi.innerHTML = 'Hinnat: 1.90€ / 2.70€ / 5.71€';
      restaurantOpenFi.innerHTML = 'Avoinna: 11.00 - 13.15';
      menuPricesEn.innerHTML = 'Price: 1.90€ / 2.70€ / 5.71€';
      restaurantOpenEn.innerHTML = 'Open: 11.00 - 13.15';
      // Karamalmi
      console.log(caller);
      data = useApiData().getFazerData(lang, today);
      data.then(function(result) {
        parseFazer(result.LunchMenus, caller);
      });
    } else {
      addCoursesToList('No menu available for this campus');
      if (lang === 'fi') {
        menuPrices.innerHTML = 'Hinnat: 2.70€ / 8.00€';
        restaurantOpen.innerHTML = 'Avoinna: 110.30-13.30';
      } else if (lang === 'en') {
        menuPrices.innerHTML = 'Prices: 2.70€ / 8.00€';
        restaurantOpen.innerHTML = 'Open: 10.30-13.30';
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Handles data gotten from the fetch in case of Sodexo
 * @param lang not really sure if this does anything but right now I'm afraid to remove it
 * @param resultObject raw object passed from fetch
 * @param inEnglishSetting wanted result language
 * @param caller passes caller forward
 */
const parseSodexo = (lang, resultObject, inEnglishSetting, caller) => {
  console.log('caller 3: ' + caller);
  for (let i = 0; i <= Object.keys(resultObject).length; i++) {
    if (resultObject[i] !== undefined) {
      if (inEnglishSetting === 'inFinnish') {
        addCoursesToList(resultObject[i].title_fi, resultObject[i].dietcodes,
          caller,
          caller);
      } else if (inEnglishSetting === 'inEnglish') {
        addCoursesToList(resultObject[i].title_en, resultObject[i].dietcodes,
          caller,
          caller);
      }
    }
  }
};

/**
 * Handles data gotten from the fetch in case of Fazer
 * @param resultObject raw object passed from fetch
 * @param caller passes caller forward
 */
const parseFazer = (resultObject, caller) => {
  const weekCourses = [];
  let courses = [];
  /**
   * gets the object and makes nice local version of it in form of array, so it can be looped
   * @param obj
   */
  const courseGetter = (obj) => {
    for (let i = 0; i <= Object.keys(obj).length; i++) {
      if (obj[i] !== undefined || null) {
        courses.push(obj[i]);
      }
    }
    looper(courses, caller);
  };

  /**
   * Loops through the passed array and displays them
   * @param courses
   * @param caller passes caller forward
   */
  const looper = (courses, caller) => {
    const todaysMenu = courses.filter(x => x.Date === today2);
    const temp2 = todaysMenu[0].SetMenus;
    if (temp2.length > 0) {
      for (let i = 0; i <= Object.keys(temp2).length; i++) {
        if (temp2[i] !== undefined) {
          weekCourses.push(temp2[i].Meals);
        }
      }
      for (let i = 0; i < weekCourses.length - 1; i++) {
        let wholeMeal = '';
        let diets;
        for (let j = 0; j < weekCourses[i].length; j++) {
          wholeMeal += weekCourses[i][j].Name;
          diets = weekCourses[i][j].Diets.toString();
          if (j + 1 !== weekCourses[i].length) {
            wholeMeal += `\n ${diets}\n`;
          } else wholeMeal += `\n ${diets}\n`;
        }
        addCoursesToList(wholeMeal, '', caller);
      }
    } else {
      addCoursesToList(noFood);
    }
  };
  courseGetter(resultObject);
};

/**
 * Displays 1 given whole meal and it's diets
 * @param course
 * @param diets
 * @param caller determines where the meal is displayed/updated
 */
const addCoursesToList = (course, diets = '', caller = '') => {
  console.log('caller ' + caller);
  if (caller === 'ds') {
    let list = document.createElement('li');
    list.innerText = course + ' ' + diets;
    let list2 = document.createElement('div');
    list2.className = 'line';
    dsBox.append(list);
  } else {
    let list = document.createElement('li');
    list.innerText = course + ' ' + diets;
    let list2 = document.createElement('div');
    list2.className = 'line';
    mobileBox.append(list);
    //item.append(list2);
  }

};

export {getMenus, selectedCampus};
