import {useApiData} from './ApiHooks';
import {ApiConfig} from './ApiConfig';

let selectedCampus = '';

const todayISODate = new Date().toISOString().split('T')[0];
let today = new Date();
let today2 = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
today2 = today2.getDate() + '.' + (today2.getMonth() + 1) + '.' +
  today2.getFullYear();
const noFood = 'No menu for the day';
const boxes = document.querySelectorAll('.lounchText');

const getMenus = (campus, caller) => {
  const inEnglishSetting = localStorage.getItem('inEnglishSetting');
  let lang = 'fi';
  if (inEnglishSetting === 'inEnglish') {
    lang = 'en';
  } else lang = 'fi';
  boxes.forEach(item => {
    item.innerHTML = '';
  });
  try {
    let data;
    // Myyrmaki
    if (campus === 'myyrmaki') {
      selectedCampus = 'myyrmaki';
      data = useApiData().
        getSodexoData(ApiConfig.sodexoMyyrmakiApiUrl, todayISODate);
      data.then(function(result) {
        if (result.courses !== null || undefined) {
          console.log(result.courses);
          parseSodexo(lang, result.courses, inEnglishSetting);
        } else addCoursesToList(noFood);
      });
      // Myllypuro
    } else if (campus === 'myllypuro') {
      selectedCampus = 'myllypuro';

      data = useApiData().
        getSodexoData(ApiConfig.sodexoMyllypuroApiUrl, todayISODate);
      data.then(function(result) {
        if (result.courses !== null || undefined) {
          parseSodexo(lang, result.courses, inEnglishSetting);
        } else addCoursesToList(noFood);
      });
    } else if (campus === 'karamalmi') {
      selectedCampus = 'karamalmi';
      // Karamalmi
      data = useApiData().getFazerData(lang, today);
      data.then(function(result) {
        parseFazer(result.LunchMenus);
      });
    } else {
      addCoursesToList('No menu available for this campus');
    }
  } catch (e) {
    console.log(e.message);
  }
};

const parseSodexo = (lang, resultObject, inEnglishSetting) => {
  for (let i = 0; i <= Object.keys(resultObject).length; i++) {
    if (resultObject[i] !== undefined) {
      if (inEnglishSetting === 'inFinnish') {
        addCoursesToList(resultObject[i].title_fi, resultObject[i].dietcodes);
      } else if (inEnglishSetting === 'inEnglish') {
        addCoursesToList(resultObject[i].title_en, resultObject[i].dietcodes);
      }
    }
  }
};

const parseFazer = (resultObject) => {
  const weekCourses = [];
  let courses = [];
  const courseGetter = (obj) => {
    for (let i = 0; i <= Object.keys(obj).length; i++) {
      if (obj[i] !== undefined || null) {
        courses.push(obj[i]);
      }
    }
    looper(courses);
  };

  const looper = (courses) => {
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
        addCoursesToList(wholeMeal);
      }
    } else {
      addCoursesToList(noFood);
    }
  };
  courseGetter(resultObject);
};

const addCoursesToList = (course, diets = '') => {
  console.log(course);
  boxes.forEach((item) => {
    let list = document.createElement('li');
    list.innerText = course + ' ' + diets;
    let list2 = document.createElement('div');
    list2.className = 'line';
    item.append(list);
    item.append(list2);
  });
};

export {getMenus, selectedCampus};
