/**
 * game.js
 * Motor principal del juego — estado, flujo y eventos
 * Depende de: data.js · rules.js · ui.js · credits.js
 */

const Estado = {
  jugador:     "",
  puntos:      0,
  indice:      0,
  expedientes: [],
  historial:   [],
  pausado:     false,
};

function iniciarPartida(nombreJugador) {
  Estado.jugador     = nombreJugador;
  Estado.puntos      = 0;
  Estado.indice      = 0;
  Estado.historial   = [];
  Estado.pausado     = false;
  Estado.expedientes = [...EXPEDIENTES].sort(() => Math.random() - 0.5);

  actualizarPuntos(0);
  actualizarProgreso(0, Estado.expedientes.length);
  mostrarJuego();
  cargarExpediente();
}

function cargarExpediente() {
  if (Estado.indice >= Estado.expedientes.length) {
    terminarPartida();
    return;
  }
  const exp = Estado.expedientes[Estado.indice];
  actualizarProgreso(Estado.indice + 1, Estado.expedientes.length);
  mensajeroEntrar();
  setTimeout(() => renderizarExpediente(exp), 400);
  desbloquearPalancas();
}

function procesarDecision(decisionJugador) {
  if (Estado.pausado) return;

  const exp       = Estado.expedientes[Estado.indice];
  // evaluarDecision llama internamente a evaluarExpediente → todo automático
  const resultado = evaluarDecision(decisionJugador, exp);

  Estado.puntos += resultado.puntos;
  Estado.historial.push({
    expediente:  exp,
    correcto:    resultado.correcto,
    puntos:      resultado.puntos,
    esAptoReal:  resultado.esAptoReal,
  });

  mostrarSello(decisionJugador);
  actualizarPuntos(Estado.puntos);

  abrirModal({
    titulo:       resultado.correcto ? "¡CORRECTO!" : "INCORRECTO",
    resultado:    resultado.mensaje,
    explicacion:  resultado.explicacion,
    cambioPuntos: resultado.puntos,
  });
}

function siguienteExpediente() {
  cerrarModal();
  mensajeroSalir();
  Estado.indice++;
  setTimeout(() => cargarExpediente(), 450);
}

function terminarPartida() {
  const aciertos = Estado.historial.filter(h => h.correcto).length;
  const resumen  = generarResumen(Estado.historial, Estado.puntos, Estado.jugador);
  const calific  = calcularCalificacion(aciertos, Estado.historial.length);

  mostrarPantallaFinal(
    `${calific} — ${aciertos}/${Estado.historial.length}`,
    Estado.puntos,
    resumen
  );
}

function togglePausa() {
  Estado.pausado = !Estado.pausado;
  if (Estado.pausado) abrirPausa();
  else cerrarPausa();
}

/* ── Eventos ── */
document.getElementById("startGameBtn").addEventListener("click", () => mostrarPantallaNombre());
document.getElementById("creditsBtn").addEventListener("click", () => abrirCreditos());

document.getElementById("confirmNameBtn").addEventListener("click", () => {
  const nombre = UI.playerNameInput.value.trim();
  if (nombre.length < 2) { alert("El nombre debe tener al menos 2 caracteres."); return; }
  iniciarPartida(nombre);
});

UI.playerNameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("confirmNameBtn").click();
});

document.getElementById("leverApto").addEventListener("click", () => {
  if (Estado.pausado) return;
  animarPalanca(true);
  bloquearPalancas();
  setTimeout(() => procesarDecision(true), 300);
});

document.getElementById("leverNoApto").addEventListener("click", () => {
  if (Estado.pausado) return;
  animarPalanca(false);
  bloquearPalancas();
  setTimeout(() => procesarDecision(false), 300);
});

document.getElementById("decisionContinueBtn").addEventListener("click", () => siguienteExpediente());

document.getElementById("pauseBtn").addEventListener("click", () => togglePausa());
document.getElementById("resumeBtn").addEventListener("click", () => { Estado.pausado = false; cerrarPausa(); });
document.getElementById("restartFromPauseBtn").addEventListener("click", () => { cerrarPausa(); reiniciarVista(); });
document.getElementById("exitBtn").addEventListener("click", () => location.reload());
document.getElementById("restartBtn").addEventListener("click", () => reiniciarVista());
