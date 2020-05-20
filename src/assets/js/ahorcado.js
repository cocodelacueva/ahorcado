//secciones
const resultadosSection = document.querySelector('#resultados');
const contenedorJuego = document.querySelector('#juego');

//pantallas
const pantallas = {
    bienvenida: document.querySelector('#bienvenida'),
    palabra: document.querySelector('#palabra'),
    juego: document.querySelector('#juego'),
    resultados: document.querySelector('#resultados'),
}
let pantallaActiva = null;

//elementos juego
const formularioPalabra = document.querySelector('#formulario-juego');
const tableroJuego = document.querySelector('#tablero');
const divAhorcado = tableroJuego.querySelectorAll('.ahorcado');
const divLetras = tableroJuego.querySelector('.letras');
const inputLetras = divLetras.querySelector('#letras');
const letrasDiv = divLetras.querySelector('.letras-lista');

//elementos resultados
const pResumenResultado = resultadosSection.querySelectorAll('.resultado-text');
const divResumenWrapper = resultadosSection.querySelectorAll('.resumen-juego');

//variables del juego
let palabraABuscar = null;
let palabras = [];
let letras = [];
let ganador = false;
let tiempo = 0;
let dificultad = 'facil';
let oportunidades = 7;
let oportunidadesPerdidas = 0;
let timeOut = 20000//20segundos;
let opcionesDificultad = {
    facil : {
        mostrarLetras: 2,
        timeOut: 20000//20segundos
    },
    medio : {
        mostrarLetras: 1,
        timeOut: 15000//15segundos
    },
    dificil : {
        mostrarLetras: 0,
        timeOut: 10000//10segundos
    },
}

//textos
let juegoIniciado = 'Juego Iniciado';
let juegoEnPausa = 'Has puesto pausa';
let resetJuego = 'El juego ha sido borrado';
let juegoPerdido = 'Has perdido!';
let textoFinalTiempo = 'Se te acabó el tiempo';
let palabraRepetida = 'Esta palabra ya la elegiste!!';



export default function ahorcado() {
    
    //setea formulario y eventos y resetea el juego
    pantallasNav();
    resetGame();

    //setea formulario palabra
    formularioPalabra.addEventListener('submit', function(){
        event.preventDefault();

        let palabra = formularioPalabra.querySelector('input').value;
        let dificultad = formularioPalabra.querySelector('select').value;

        if (palabra == '') {
            alert('Debería insertar una palabra');
            return true;
        }

        if (dificultad == '' || dificultad == null || dificultad == undefined) {
            dificultad = 'facil';
        }

        startGame(palabra, dificultad);

    });

    //muestra pantalla bienvenida
    setScreen('bienvenida');

}

function resetGame() {
    console.log(resetJuego);

    palabraABuscar = null
    letras = [];
    ganador = false;
    tiempo = 0;
    dificultad = 'facil';
    oportunidadesPerdidas = 0;
    letrasDiv.innerHTML = '';

}

function startGame(palabraElegida, dificultadElegida) {
    console.log(juegoIniciado);

    
    //reset game
    resetGame();

    //setear juego nuevo
    palabraABuscar = palabraElegida.toLowerCase();
    dificultad = dificultadElegida;
    oportunidades = opcionesDificultad[dificultad].oportunidades;
    timeOut = opcionesDificultad[dificultad].timeOut;
    
    if ( palabras.includes( palabraABuscar ) ) {
        alert(palabraRepetida);
    } else {
        palabras.push(palabraABuscar);
    }

    //guardo la palabra en el input
    inputLetras.value = palabraABuscar;
    
    //procesa las letras
    letras = palabraABuscar.split('');
    
    //muestra las letras
    renderLetras();

    //cargar imagen ahorcado

    //iniciar tiempo
    setTimeout(() => {
        alert(textoFinalTiempo);

        //va a pagina de resultados
        setScreen('resultados');

    }, timeOut);
    //ir a pantalla juego
    setScreen('juego');
}


//imprime los li con las letras y calcula cuantas mostrar
function renderLetras () {

    const letrasMostrar = opcionesDificultad[dificultad].mostrarLetras
    let letrasMostradas = 0;
    let posicion = null;
    
    //listar los li con las letras
    letras.forEach( (letra, index) => {
        let li = document.createElement('li');
        li.setAttribute('data-letra', letra);
        li.innerHTML = '<span>'+letra+'</span>';

        //si letras a mostrar es = a 0 no hay nada que hacer
        if ( letrasMostrar != letrasMostradas ) {
            
            //si no es igual a cero analizamos cuantos es han mostradas y cual es la posicion de la anterior, para que no estén todas pegadas
            if ( posicion == null ) {
                li.classList.add('active');
                posicion = index;
                letrasMostradas++;
            } else if (index == (posicion+2) ) {
                li.classList.add('active');
                letrasMostradas++;
            }

        }
        
        //agregamos li al nodo
        letrasDiv.append(li);
    });
}

function pauseGame() {
    console.log(juegoEnPausa);
}


//cada intento de adivinar del usuario, cuando coloca una imagen
function intento(params) {
    oportunidadesPerdidas++

    imagenAhorcado(oportunidadesPerdidas);

    if (oportunidadesPerdidas == oportunidades) {
        console.log(juegoPerdido);
        pauseGame();
    }
}

function imagenAhorcado(oportunidadesPerdidas) {
    console.log('imagen ahorcado, paso n: ' + oportunidadesPerdidas);
}


function pantallasNav() {
    const btns = document.querySelectorAll('.btns');
    
    btns.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            setScreen(href);

        })
    });
}

function setScreen(href) {
    
    if (pantallaActiva != null) {
        pantallas[pantallaActiva].classList.remove('active');
    }
    
    pantallas[href].classList.add('active');

    pantallaActiva = href;
}