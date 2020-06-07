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
const divAhorcado = tableroJuego.querySelector('.ahorcado');
const divLetras = tableroJuego.querySelector('.letras');
const inputLetras = divLetras.querySelector('#letras');
const letrasDiv = divLetras.querySelector('.letras-lista');

//elementos resultados
const pTituloResultado = resultadosSection.querySelector('.titulo-section');
const pResumenResultado = resultadosSection.querySelector('.resultado-text');
const divResumenWrapper = resultadosSection.querySelector('.resumen-juego');

//variables del juego
let palabraABuscar = null;
let palabras = [];
let letras = [];
let letrasAdivinadas = 0;
let ganador = false;
let tiempo = 0;
let dificultad = 'facil';
let oportunidadesPerdidas = 0;
let letrasIntentadas = [];
let timeOut = 20000//20segundos;
let opcionesJuego = {
    facil : {
        oportunidades: 7,
        mostrarLetras: 2,
        timeOut: 50000//30segundos
    },
    medio : {
        oportunidades: 7,
        mostrarLetras: 1,
        timeOut: 40000//20segundos
    },
    dificil : {
        oportunidades: 7,
        mostrarLetras: 0,
        timeOut: 30000//10segundos
    },
}

//textos
let textos = {
    juegoIniciado : 'Juego Iniciado',
    juegoEnPausa : 'Has puesto pausa',
    resetJuego : 'El juego ha sido borrado',
    juegoPerdido : 'Has perdido!',
    textoFinalTiempo : 'Se te acabó el tiempo',
    palabraRepetida : 'Esta palabra ya la elegiste!!',
    hasGanado : 'Has ganado el juego',
    tituloGanado : 'Felicitaciones!',
    yaLaDijiste : 'Ya habías dicho esa letra',
    tituloPerdido : 'Perdiste!',
    hasPerdido : 'No siempre se gana.',
};

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
    console.log(textos.resetJuego);

    letrasAdivinadas = 0;
    palabraABuscar = null
    letras = [];
    letrasIntentadas = [];
    ganador = false;
    tiempo = 0;
    dificultad = 'facil';
    oportunidadesPerdidas = 0;
    letrasDiv.innerHTML = '';

}

function startGame(palabraElegida, dificultadElegida) {
    console.log(textos.juegoIniciado);

    //reset game
    resetGame();

    //setear juego nuevo
    palabraABuscar = palabraElegida.toLowerCase();
    dificultad = dificultadElegida;
    timeOut = opcionesJuego[dificultad].timeOut;
    
    if ( palabras.includes( palabraABuscar ) ) {
        alert(textos.palabraRepetida);
    } else {
        palabras.push(palabraABuscar);
    }

    //guardo la palabra en el input
    inputLetras.value = palabraABuscar;
    
    //procesa las letras
    letras = palabraABuscar.split('');
    
    //muestra las letras
    renderLetras();

    //carga los listener del juego, en la funcion endGame los borra
    document.addEventListener('keypress', intento);
    
    //cargar imagen ahorcado
    imagenAhorcado(oportunidadesPerdidas);

    //iniciar tiempo
    window.timeoutGameId = setTimeout(() => {
        alert(textos.textoFinalTiempo);

        //termina el juego
        endGame(false);
        

    }, timeOut);
    //ir a pantalla juego
    setScreen('juego');
}


//carga los resultados y te lleva a la pantalla de resultados
function endGame(exito) {
    clearInterval(window.timeoutGameId);

    document.removeEventListener('keypress', intento);
    
    //textos ganadores o perdedores
    if (exito) {
        pTituloResultado.innerText = textos.tituloGanado;
        pResumenResultado.innerText = textos.hasGanado;
    } else {
        pTituloResultado.innerText = textos.tituloPerdido;
        pResumenResultado.innerText = textos.hasPerdido;
    }

    

    let tituloResultados = document.createElement('h4');
        tituloResultados.innerText = 'Resultados:';

    let pTiempo = document.createElement('p');
        pTiempo.innerHTML = '<strong>Tiempo</strong>: '+(opcionesJuego[dificultad].timeOut/1000)+' segundos:';
    
    let pPalabra = document.createElement('p');
        pPalabra.innerHTML = '<strong>Palabra</strong>: '+palabraABuscar;

    let pIntentos = document.createElement('p');
        pIntentos.innerHTML = '<strong>Intentos fallidos</strong>: '+oportunidadesPerdidas;

    divResumenWrapper.innerHTML = '';
    divResumenWrapper.append(tituloResultados);
    divResumenWrapper.append(pTiempo);
    divResumenWrapper.append(pPalabra);
    divResumenWrapper.append(pIntentos);
    
    setScreen('resultados');

}


//imprime los li con las letras y calcula cuantas mostrar
function renderLetras () {

    const letrasMostrar = opcionesJuego[dificultad].mostrarLetras
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

                //las letras mostramos las contamos como si fueran adivinadas para que luego de la suma
                letrasAdivinadas++;
            } else if (index == (posicion+2) ) {
                li.classList.add('active');
                letrasMostradas++;

                //las letras mostramos las contamos como si fueran adivinadas para que luego de la suma
                letrasAdivinadas++;
            }

        }
        
        //agregamos li al nodo
        letrasDiv.append(li);
    });
}

function pauseGame() {
    console.log(textos.juegoEnPausa);
}


//cada intento de adivinar del usuario, cuando coloca una imagen
function intento(event) {
    let letra = event.key.toLowerCase();
    console.log(letra);

    //primero vemos si la letra no se uso antes
    if ( letrasIntentadas.includes(letra) ) {
        alert(textos.yaLaDijiste);
        return true;
    } else {
        //si no se uso se agrega al array de intentos
        letrasIntentadas.push(letra);
    }

    
    //ahora vemos si adivinaste o no la letra
    if (letras.includes(letra)) {
        //ADIVINASTE

        //vemos en que posicion esta esa letra, puede estar repetida
        let posiciones = [];
        letras.forEach( (l, index) => {
            if (l === letra) {
                posiciones.push(index);
            }
        });

        //mostramos las que corresponden
        let lisLetras = letrasDiv.querySelectorAll('li');
        posiciones.forEach(posicion => {
            //chequeamos si esta activa o no, sino esta activa la sumamos y sino continaumos
            if ( !lisLetras[posicion].classList.contains('active') ){
                lisLetras[posicion].classList.add('active');

                //sumamos las letras adivinadas
                letrasAdivinadas++;
            }
        });
        
        console.log(letrasAdivinadas, letras.length);
        if ( letrasAdivinadas >= letras.length ) {
            endGame(true);
        }
        

    } else {
        //NO ADIVINASTE
        
        //1. sumo una oportunidad perdida
        oportunidadesPerdidas++;
        
        //2. redibujo la imagen del ahorcado
        imagenAhorcado(oportunidadesPerdidas);

        //si oportunidades peridas es = a lo permitida el juego se termina
        if ( oportunidadesPerdidas === opcionesJuego[dificultad].oportunidades ) {
            endGame(false);
        }

    }
}

function imagenAhorcado(oportunidadesPerdidas) {
    let urlImagen = 'assets/images/ahoracado';
    let extension = '.png';
    let retina = '@2x';
    
    let img = document.createElement('img');
        img.setAttribute('src', urlImagen+oportunidadesPerdidas+extension);
        img.setAttribute('srcset', urlImagen+oportunidadesPerdidas+extension + ' 1x, ' + urlImagen+oportunidadesPerdidas+retina+extension + ' 2x');
    
    divAhorcado.innerHTML = '';
    divAhorcado.append(img);
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