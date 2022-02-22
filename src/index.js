import {weather} from './assets/jsModules/test';

weather();

// parallax Y postition moving
window.addEventListener('scroll',(event) =>{

    let top = this.pageYOffset;
    const icons = document.querySelectorAll("[data-type='parallax']");
    let icon, speed, yPosition;
    
    for (let i = 0; i < icons.length; i++) {
        icon = icons[i];
        speed = icon.getAttribute('data-speed');
        let yPosition = -(pageYOffset * speed / 100);
        icon.setAttribute('style', 'transform: translate3d(0px, ' + yPosition + 'px, 0px)');
    
    }
    
    });

    //navbar collapse moving back when you touch somewere else
    const closeNavbar = () => {
        $('.navbar-collapse').collapse('hide');
    };

    document.querySelector('.background').addEventListener('click',closeNavbar);
    document.querySelector('.metroMeno').addEventListener('click',closeNavbar);
    

 
     



