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

document.querySelector('body').addEventListener('click', closeNavbar);
document.querySelector('.metroMeno').addEventListener('click', closeNavbar);







