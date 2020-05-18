export default function pantallasNav() {
    const btns = document.querySelectorAll('.btns');
    const pantallas = {
        bienvenida: document.querySelector('#bienvenida'),
        palabra: document.querySelector('#palabra'),
        juego: document.querySelector('#juego'),
        resultados: document.querySelector('#resultados'),
    }
let pantallaActiva = null;

    btns.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            setScreen(href);

        })
    });

    //pantalla por default;
    setScreen('bienvenida');


    function setScreen(href) {
    
        if (pantallaActiva != null) {
            pantallas[pantallaActiva].classList.remove('active');
        }
        
        pantallas[href].classList.add('active');
    
        pantallaActiva = href;
    }

}