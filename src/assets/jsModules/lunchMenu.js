import {useApiData} from './ApiHooks';
import {ApiConfig} from './ApiConfig';

const selectedCampus = 'karamalmi';
const lang = 'fi';

const todayISODate = new Date().toISOString().split('T')[0];
let today = new Date();
let today2 = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
const weekCourses = [];
const courses = [];
today = yyyy + '-' + mm + '-' + dd;
today2 = today2.getDate() + '.' + (today2.getMonth() + 1) + '.' +
  today2.getFullYear();
today2 = '2.2.2022';
const noFood = 'No menu for the day';

const getMenus = () => {
  try {
    let data;
    // Myyrmaki
    if (selectedCampus === 'myyrmaki') {
      data = useApiData().
        getSodexoData(ApiConfig.sodexoMyyrmakiApiUrl, '2022-03-02');
      data.then(function(result) {
        console.log(result);
        if (result.courses !== null || undefined) {
          parseSodexo(lang, result.courses);
        } else addCoursesToList(noFood);
      });
      // Myllypuro
    } else if (selectedCampus === 'myllypuro') {
      data = useApiData().
        getSodexoData(ApiConfig.sodexoMyllypuroApiUrl, todayISODate);
      data.then(function(result) {
        if (result.courses !== null || undefined) {
          parseSodexo(lang, result.courses);
        } else addCoursesToList(noFood);
      });
    } else {
      // Karamalmi
      data = useApiData().getFazerData(lang, today);
      data.then(function(result) {
        parseFazer(result.LunchMenus);
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const parseSodexo = (lang, resultObject) => {
  for (let i = 0; i <= Object.keys(resultObject).length; i++) {
    if (resultObject[i] !== undefined) {
      if (lang === 'fi') {
        addCoursesToList(resultObject[i].title_fi, resultObject[i].dietcodes);
      } else if (lang === 'en') {
        addCoursesToList(resultObject[i].title_en, resultObject[i].dietcodes);
      }
    }
  }
};

const parseFazer = (resultObject) => {
  const courseGetter = (obj) => {
    for (let i = 0; i <= Object.keys(obj).length; i++) {
      if (obj[i] !== undefined || null) {
        courses.push(obj[i]);
      }
    }
    console.log(courses);
    looper(courses);
  };

  const looper = (courses) => {
    const todaysMenu = courses.filter(x => x.Date === today2);
    console.log(todaysMenu);
    const temp2 = todaysMenu[0].SetMenus;
    console.log(temp2);
    if (temp2.length > 0) {
      for (let i = 0; i <= Object.keys(temp2).length; i++) {
        if (temp2[i] !== undefined) {
          weekCourses.push(temp2[i].Meals);
        }
      }
      console.log(weekCourses);
      for (let i = 0; i < weekCourses.length; i++) {
        let wholeMeal = '';
        let diets;
        for (let j = 0; j < weekCourses[i].length; j++) {
          wholeMeal += weekCourses[i][j].Name;
          //console.log(weekCourses[i][j].Diets.toString());
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
  const boxes = document.querySelectorAll('.lounchText');
  boxes.forEach((item) => {
    let list = document.createElement('li');
    list.innerText = course + ' ' + diets;
    let list2 = document.createElement('div');
    list2.className = 'line';
    item.append(list);
    //item.append(list2);
  });
};

export {getMenus};
