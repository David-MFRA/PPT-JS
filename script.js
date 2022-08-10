let puntuacionJugador = 0
let puntuacionMaquina = 0
let ganador = ''

function jugar(eleccionJugador, eleccionMaquina) {
    if (eleccionJugador == eleccionMaquina) {
        ganador = 'Empate'
    }
    else if (
        (eleccionJugador === 'PIEDRA' && eleccionMaquina === 'TIJERA') ||
        (eleccionJugador === 'TIJERA' && eleccionMaquina === 'PAPEL') ||
        (eleccionJugador === 'PAPEL' && eleccionMaquina === 'PIEDRA')
    ) {
        puntuacionJugador++
        ganador = 'Jugador'
    }
    else {
        puntuacionMaquina++
        ganador = 'Maquina'
    }
    actualizarMensaje(ganador, eleccionJugador, eleccionMaquina)
}

function getEleccionRandom() {
    let numeroAleatorio = Math.floor(Math.random() * 3)
    switch (numeroAleatorio) {
    case 0:
      return 'PIEDRA'
    case 1:
      return 'PAPEL'
    case 2:
      return 'TIJERA'
  }
}

function finPartida() {
    return puntuacionJugador === 5 || puntuacionMaquina === 5
}

const infoPuntos = document.getElementById('infoPuntos')
const mensajePuntos = document.getElementById('mensajePuntos')
const puntosJugador = document.getElementById('puntosJugador')
const puntosMaquina = document.getElementById('puntosMaquina')
const simboloJugador = document.getElementById('simboloJugador')
const simboloMaquina = document.getElementById('simboloMaquina')
const piedra = document.getElementById('piedra')
const papel = document.getElementById('papel')
const tijera = document.getElementById('tijera')
const finJuego = document.getElementById('finJuego')
const mensajeFin = document.getElementById('mensajeFin')
const overlay = document.getElementById('overlay')
const botonReiniciar = document.getElementById('botonReiniciar')

piedra.addEventListener('click', () => jugada('PIEDRA'))
papel.addEventListener('click', () => jugada('PAPEL'))
tijera.addEventListener('click', () => jugada('TIJERA'))
botonReiniciar.addEventListener('click', nuevaPartida)
overlay.addEventListener('click', cerrarModalFin)

function jugada(eleccionJugador) {
    if(finPartida()) {
        abrirModalFin()
        return
    }

    const eleccionMaquina = getEleccionRandom()
    jugar(eleccionJugador, eleccionMaquina)
    actualizarEleccion(eleccionJugador, eleccionMaquina)
    actualizarPuntuacion()

    if(finPartida()) {
        abrirModalFin()
        setMensajeFin()
    }
}

function actualizarEleccion(eleccionJugador, eleccionMaquina) {
    switch (eleccionJugador) {
        case 'PIEDRA':
            simboloJugador.textContent = '✊'
            break
        case 'PAPEL':
            simboloJugador.textContent = '✋'
            break
        case 'TIJERA':
            simboloJugador.textContent = '✌'
            break
    }
    switch (eleccionMaquina) {
        case 'PIEDRA':
            simboloMaquina.textContent = '✊'
            break
        case 'PAPEL':
            simboloMaquina.textContent = '✋'
            break
        case 'TIJERA':
            simboloMaquina.textContent = '✌'
            break
    }
}

function actualizarPuntuacion() {
    if(ganador === 'Empate') {
        infoPuntos.textContent = "¡Empate!"
    } else if (ganador === 'Jugador') {
        infoPuntos.textContent = '¡Has ganado!'
    }
    else {
        infoPuntos.textContent = '¡Has perdido!'
    }

    puntosJugador.textContent = `Jugador: ${puntuacionJugador}`
    puntosMaquina.textContent = `Máquina: ${puntuacionMaquina}`
}

function actualizarMensaje(ganador, eleccionJugador, eleccionMaquina) {
    if (ganador === 'Jugador') {
        mensajePuntos.textContent = `${eleccionJugador} gana a ${eleccionMaquina}`
        return
    }
    if (ganador === 'Maquina') {
        mensajePuntos.textContent = `${eleccionMaquina} gana a ${eleccionJugador}`
        return
    }

    mensajePuntos.textContent = `${eleccionJugador} empata con ${eleccionMaquina}`
}

function abrirModalFin() {
    finJuego.classList.add('active')
    overlay.classList.add('active')
}

function cerrarModalFin() {
    finJuego.classList.remove('active')
    overlay.classList.remove('active')
}

function setMensajeFin() {
    return puntuacionJugador > puntuacionMaquina 
        ? (mensajeFin.textContent = '¡Has ganado!')
        : (mensajeFin.textContent = 'Has perdido...')
}

function nuevaPartida() {
    console.log("cacaca")
    puntuacionJugador = 0
    puntuacionMaquina = 0
    infoPuntos.textContent = 'Escoge (✊ | ✋ | ✌)'
    mensajePuntos.textContent = '¡El mejor de 5 gana!'
    puntosJugador.textContent = 'Jugador: 0'
    puntosMaquina.textContent = 'Máquina: 0'
    simboloJugador.textContent = '❔'
    simboloMaquina.textContent = '❔'
    finJuego.classList.remove('active')
    overlay.classList.remove('active')
}