import {weather} from './assets/jsModules/weather';
import {getBusses} from './assets/jsModules/hsl';

weather();

// parallax Y postition moving
window.addEventListener('scroll', (event) => {
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
//getBusses(2132207);



// "parallax" Y postition moving
window.addEventListener('scroll',(event) =>{

  let top = window.scrollY /2;
  const background = document.querySelector("body");
  background.style.backgroundPositionY = top+"px";
  });
  
//navbar collapse moving back when you touch somewere else
const menuToggle = document.getElementById('navbarToggleExternalContent');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

const closeNavbar = () => {
 
  bsCollapse.hide();
};

document.querySelector('body').addEventListener('click', closeNavbar);
document.querySelector('.metroMeno').addEventListener('click', closeNavbar);
});