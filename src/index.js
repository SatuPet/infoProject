import {weather} from './assets/jsModules/weather';
import {getBusses} from './assets/jsModules/hsl';
import {getDateTime} from './assets/jsModules/ds';

weather(60.2241077, 24.7565312); //TODO setInterval 1 hour
// Campus coords:
// 60.2241077, 24.7565312 Karaportti HSL radius: 600
// 60.2094084, 24.9809358 Arabia  HSL radius: 500
// 60.2588793, 24.8488313 Myyrmäki HSL radius: 400
// 60.2234938, 25.0757339 Myllypuro HSL radius: 520

getDateTime();

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
  window.addEventListener('scroll', (event) => {
    const icons = document.querySelectorAll('[data-type=\'parallax\']');
    let icon, speed;
    for (let i = 0; i < icons.length; i++) {
      icon = icons[i];
      speed = icon.getAttribute('data-speed');
      let yPosition = -(scrollY * speed / 100);
      icon.setAttribute('style',
        'transform: translate3d(0px, ' + yPosition + 'px, 0px)');
    }
  });
  //navbar collapse moving back when you touch somewere else
  const closeNavbar = () => {
    $('.navbar-collapse').collapse('hide');
  };

  document.querySelector('.background').addEventListener('click', closeNavbar);
  document.querySelector('.metroMeno').addEventListener('click', closeNavbar);
});
