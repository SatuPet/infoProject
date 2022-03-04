import {useApiData} from './ApiHooks';
import {ApiConfig} from './ApiConfig';

const selectedCampus = 'myllypuro';

const todayISODate = new Date().toISOString().split('T')[0];
let today = new Date();
let today2 = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
const weekCourses = [];
const coursesFi = [];
today = yyyy + '-' + mm + '-' + dd;
today2 = today2.getDate() + '.' + (today2.getMonth() + 1) + '.' +
  today2.getFullYear();

const getMenus = () => {
  try {
    let data;
    // Myyrmaki
    if (selectedCampus === 'myyrmaki') {
      data = useApiData().getSodexoData(ApiConfig.sodexoMyyrmakiApiUrl, todayISODate);
      data.then(function(result) {
        parseSodexo(result.courses);
      });
    }
    else if (selectedCampus === 'myllypuro') {
      data = useApiData().getSodexoData(ApiConfig.sodexoMyllypuroApiUrl, todayISODate);
      data.then(function(result) {
        parseSodexo(result.courses);
      });
    }
    else {
      // Karamalmi
      data = useApiData().getFazerData(today);
      data.then(function(result) {
        parseFazer(result.LunchMenus);
      });

    }
  } catch (e) {
    console.log(e.message);
  }
};

const parseSodexo = (resultObject) => {
  for (let i = 0; i <= Object.keys(resultObject).length; i++) {
    if (resultObject[i] !== undefined) {
      addCoursesToList(resultObject[i].title_fi);
    }
  }
};

const parseFazer = (resultObject) => {
  const courseGetter = (obj) => {
    for (let i = 0; i <= Object.keys(obj).length; i++) {
      if (obj[i] !== undefined) {
        //coursesEn.push(obj[i]);
        coursesFi.push(obj[i]);
      }
    }
    looper(coursesFi);
  };

  const looper = (courses) => {
    const temp = courses.filter(x => x.Date === today2);
    const temp2 = temp[0].SetMenus;
    for (let i = 0; i <= Object.keys(temp2).length; i++) {
      if (temp2[i] !== undefined) {
        weekCourses.push(temp2[i].Meals);
      }
    }
    console.log(weekCourses);
    for (let i = 0; i < weekCourses.length; i++) {
      let wholeMeal = '';
      for (let j = 0; j < weekCourses[i].length; j++) {
        wholeMeal += weekCourses[i][j].Name;
        if (j + 1 !== weekCourses[i].length) {
          wholeMeal += ', ';
        }
      }
      addCoursesToList(wholeMeal);
    }
  };
  courseGetter(resultObject);
};

const addCoursesToList = (course) => {
  let list = document.createElement('li');
  list.innerText = course;
  document.querySelector('#ul').appendChild(list);
};

export {getMenus};
