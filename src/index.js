import { weather } from './assets/jsModules/test';

weather();

// parallax Y postition moving
window.addEventListener('scroll', (event) => {

  let top = window.scrollY / 2;
  const background = document.querySelector("body");
  background.style.backgroundPositionY = top + "px";
});

//navbar collapse moving back when you touch somewere else
const menuToggle = document.getElementById('navbarToggleExternalContent');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

const closeNavbar = () => {
 
  bsCollapse.hide();
};

// document.querySelector('.background').addEventListener('click', closeNavbar);
document.querySelector('.metroMeno').addEventListener('click', closeNavbar);





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
            darkModeStyleSheet.href = "assets/darkMode.css";
            document.head.appendChild(darkModeStyleSheet);

            // Saving preference to storage
            localStorage.setItem('darkModeSetting', 'darkmode');
        }
        else {
            if (darkModeStyleSheet != undefined) {
                console.log(darkModeStyleSheet);
                darkModeStyleSheet.remove();
            }

            // Saving preference to storage
            localStorage.setItem('darkModeSetting', 'whitemode');
        }

    }

};

darkModeToggleButton.addEventListener('click',changeDarkMode);

const setTheme = () => {
  const darkModeSetting = localStorage.getItem('darkModeSetting');
  if (darkModeSetting === null) {
      localStorage.setItem('darkModeSetting', 'whitemode');
  } else {
      
      if (darkModeSetting == 'darkmode') {
          // Creating the darkmode css style sheet and adding it to DOM
          darkModeStyleSheet = document.createElement('link');
          darkModeStyleSheet.rel = 'stylesheet';
          darkModeStyleSheet.href = "assets/darkMode.css";
          document.head.appendChild(darkModeStyleSheet);
          document.getElementById("flexSwitchCheckDefault1").checked = true;
      }

  }
};


const init = () => {
  setTheme();
};
init();