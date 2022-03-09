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

today = yyyy + '-' + mm + '-' + dd;
today2 = today2.getDate() + '.' + (today2.getMonth() + 1) + '.' +
  today2.getFullYear();
const noFood = 'No menu for the day';
const dsBox = document.querySelector('#ds-menu-list');
const mobileBox = document.querySelector('#lunch');

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
  if (inEnglishSetting === 'inEnglish') {
    lang = 'en';
  } else lang = 'fi';

  try {
    let data;
    // Myyrmaki
    if (campus === 'myyrmaki') {
      selectedCampus = 'myyrmaki';
      menuText.innerHTML = 'Menu';
      menuPricesFi.innerHTML = 'Hinnat: 1.90€ / 2.70€ / 5.71€';
      restaurantOpenFi.innerHTML = 'Avoinna: 11.00 - 13.15';
      menuPricesEn.innerHTML = 'Price: 1.90€ / 2.70€ / 5.71€';
      restaurantOpenEn.innerHTML = 'Open: 11.00 - 13.15';
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
      menuPricesFi.innerHTML = 'Hinnat: 1.90€ / 2.70€ / 5.71€';
      restaurantOpenFi.innerHTML = 'Avoinna: 11.00 - 13.15';
      menuPricesEn.innerHTML = 'Price: 1.90€ / 2.70€ / 5.71€';
      restaurantOpenEn.innerHTML = 'Open: 11.00 - 13.15';
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
    }
  } catch (e) {
    console.log(e.message);
  }
};

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

const parseFazer = (resultObject, caller) => {
  const weekCourses = [];
  let courses = [];
  const courseGetter = (obj) => {
    for (let i = 0; i <= Object.keys(obj).length; i++) {
      if (obj[i] !== undefined || null) {
        courses.push(obj[i]);
      }
    }
    looper(courses, caller);
  };

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
            wholeMeal += `(${diets})\n `;
          } else wholeMeal += `(${diets})`;
        }
        addCoursesToList(wholeMeal, '', caller);
      }
    } else {
      addCoursesToList(noFood);
    }
  };
  courseGetter(resultObject);
};

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
