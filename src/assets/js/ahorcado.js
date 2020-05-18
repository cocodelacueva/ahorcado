import pantallasNav from './pantallas';

//pantallasNav();

//secciones
const resultadosSection = document.querySelector('#resultados');
const contenedorJuego = document.querySelector('#juego');

//elementos juego
const formularioPalabra = document.querySelector('#formulario-juego');
const tableroJuego = document.querySelector('#tablero');
const divAhorcado = tableroJuego.querySelectorAll('.ahorcado');
const divLetras = tableroJuego.querySelector('.letras');
const inputLetras = divLetras.querySelector('#letras');
const letrasDiv = divLetras.querySelectorAll('.letras-lista');

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
let timeOut = 300000//5segundos;

//textos
let juegoIniciado = 'Juego Iniciado';
let juegoEnPausa = 'Has puesto pausa';
let resetJuego = 'El juego ha sido borrado';
let juegoPerdido = 'Has perdido!';


export default function ahorcado() {
    
    //setea formulario y eventos y resetea el juego


}

function resetGame() {
    console.log(resetJuego);

    palabraABuscar = null
    letras = [];
    ganador = false;
    tiempo = 0;
    dificultad = 'facil';
    oportunidadesPerdidas = 0;

}

function startGame() {
    console.log(juegoIniciado);

    //ir a pantalla juego

    //procesar palabra

    //listar los li con las letras

    //cargar imagen ahorcado

    //iniciar tiempo

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