import './assets/css/style.scss';

import ahorcado from './assets/js/ahorcado';
import pantallasNav from './assets/js/pantallas';

document.addEventListener('DOMContentLoaded', function(){
    
    //logica de pantallas
    //pantallasNav();

})

window.addEventListener('load', function(){

    //preparo el juego
    ahorcado();
})