import {weather} from './assets/jsModules/weather';
import {getBusses} from './assets/jsModules/hsl';

weather();

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

/*
window.addEventListener('scroll', (event) => {

  let top = this.pageYOffset;

  const icons = document.querySelectorAll('[data-type=\'parallax\']');
  let icon, speed, yPosition;

  for (let i = 0; i < icons.length; i++) {
    icon = icons[i];
    speed = icon.getAttribute('data-speed');
    let yPosition = -(pageYOffset * speed / 100);
    icon.setAttribute('style',
      'transform: translate3d(0px, ' + yPosition + 'px, 0px)');

  }

});
*/
