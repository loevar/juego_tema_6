/**
 * ui.js
 * Manipulación del DOM — funciones de interfaz puras
 * No contiene lógica de juego, solo renderizado y eventos de pantalla
 */

/* ── Selectores cacheados ── */
const UI = {
  startScreen:          document.getElementById("startScreen"),
  nameScreen:           document.getElementById("nameScreen"),
  gameUI:               document.getElementById("gameUI"),
  finalScreen:          document.getElementById("finalScreen"),
  pauseOverlay:         document.getElementById("pauseOverlay"),
  modalBackdrop:        document.getElementById("decisionModalBackdrop"),

  scoreLabel:           document.getElementById("scoreLabel"),
  progressLabel:        document.getElementById("progressLabel"),
  statusBar:            document.getElementById("statusBar"),
  stamp:                document.getElementById("stamp"),

  expNombre:            document.getElementById("expNombre"),
  expId:                document.getElementById("expId"),
  expDescripcion:       document.getElementById("expDescripcion"),
  expAreas:             document.getElementById("expAreas"),

  finalTitle:           document.getElementById("finalTitle"),
  finalScoreText:       document.getElementById("finalScoreText"),
  finalDetails:         document.getElementById("finalDetails"),

  decisionTitle:        document.getElementById("decisionTitle"),
  decisionResultText:   document.getElementById("decisionResultText"),
  decisionExplanation:  document.getElementById("decisionExplanation"),
  decisionScoreChange:  document.getElementById("decisionScoreChange"),

  playerNameInput:      document.getElementById("playerNameInput"),
};

/* ── Pantallas ── */

function mostrarPantallaInicio() {
  UI.startScreen.classList.remove("hidden");
  UI.nameScreen.classList.add("hidden");
}

function mostrarPantallaNombre() {
  UI.startScreen.classList.add("hidden");
  UI.nameScreen.classList.remove("hidden");
}

function mostrarJuego() {
  UI.nameScreen.classList.add("hidden");
  UI.gameUI.classList.remove("hidden");
}

function mostrarPantallaFinal(titulo, puntos, detalles) {
  UI.gameUI.classList.add("hidden");
  UI.finalScreen.style.display = "block";
  UI.finalTitle.textContent      = titulo;
  UI.finalScoreText.textContent  = `Puntuación final: ${puntos} pts`;
  UI.finalDetails.textContent    = detalles;
}

function reiniciarVista() {
  UI.finalScreen.style.display = "none";
  UI.gameUI.classList.add("hidden");
  mostrarPantallaInicio();
}

/* ── Top bar ── */

function actualizarPuntos(puntos) {
  UI.scoreLabel.innerHTML = `<span class="icon-star"></span>Puntos: ${puntos}`;
}

function actualizarProgreso(actual, total) {
  UI.progressLabel.textContent = `Expediente ${actual} / ${total}`;
}

/* ── Expediente ── */

const AREA_CLASES = {
  einf:     "area-einf",
  sga:      "area-sga",
  residuos: "area-residuos",
  eco:      "area-eco",
  forestal: "area-forestal",
  dia:      "area-dia",
  impacto:  "area-impacto",
};

const AREA_NOMBRES = {
  einf:     "EINF",
  sga:      "ISO 14001 / EMAS",
  residuos: "Gestión de Residuos",
  eco:      "Ecoetiquetado",
  forestal: "Certificación Forestal",
  dia:      "DIA / EIA",
  impacto:  "Impacto Ambiental",
};

function renderizarExpediente(expediente) {
  UI.expNombre.textContent     = expediente.nombre;
  UI.expId.textContent         = expediente.id;
  UI.expDescripcion.textContent = expediente.descripcion;

  UI.expAreas.innerHTML = "";
  expediente.areas.forEach(area => {
    const li  = document.createElement("li");
    const tag = document.createElement("span");
    tag.className   = `area-tag ${AREA_CLASES[area] || ""}`;
    tag.textContent = AREA_NOMBRES[area] || area.toUpperCase();
    li.appendChild(tag);
    UI.expAreas.appendChild(li);
  });

  UI.statusBar.textContent = "Lee el expediente y toma una decisión.";
  ocultarSello();
}

/* ── Sello ── */

function mostrarSello(esApto) {
  UI.stamp.textContent = esApto ? "APTO" : "NO APTO";
  UI.stamp.className   = `stamp ${esApto ? "stamp--apto" : "stamp--noapto"}`;
  UI.stamp.classList.remove("hidden");

  // Forzar reflow para relanzar animación
  void UI.stamp.offsetWidth;
  UI.stamp.classList.add("show");
}

function ocultarSello() {
  UI.stamp.className   = "stamp hidden";
  UI.stamp.textContent = "";
}

/* ── Modal decisión ── */

function abrirModal({ titulo, resultado, explicacion, cambioPuntos }) {
  UI.decisionTitle.textContent       = titulo;
  UI.decisionResultText.textContent  = resultado;
  UI.decisionExplanation.textContent = explicacion;
  UI.decisionScoreChange.textContent = cambioPuntos >= 0
    ? `+${cambioPuntos} puntos`
    : `${cambioPuntos} puntos`;
  UI.decisionScoreChange.style.color = cambioPuntos >= 0 ? "#66ff99" : "#ff6666";
  UI.modalBackdrop.style.display     = "flex";
}

function cerrarModal() {
  UI.modalBackdrop.style.display = "none";
}

/* ── Pausa ── */

function abrirPausa() {
  UI.pauseOverlay.style.display = "flex";
}

function cerrarPausa() {
  UI.pauseOverlay.style.display = "none";
}

/* ══════════════════════════
   PALANCAS
   ══════════════════════════ */

const leverApto   = document.getElementById("leverApto");
const leverNoApto = document.getElementById("leverNoApto");
const leverArmA   = document.getElementById("leverArmApto");
const leverArmN   = document.getElementById("leverArmNoApto");
const lightApto   = document.getElementById("lightApto");
const lightNoApto = document.getElementById("lightNoApto");

function animarPalanca(esApto) {
  const arm      = esApto ? leverArmA   : leverArmN;
  const light    = esApto ? lightApto   : lightNoApto;
  const cls      = esApto ? "pulling-apto" : "pulling-noapto";
  const lightCls = esApto ? "on-green"     : "on-red";

  arm.classList.remove("pulling-apto", "pulling-noapto");
  void arm.offsetWidth;
  arm.classList.add(cls);

  light.classList.add(lightCls);
  setTimeout(() => {
    arm.classList.remove(cls);
    setTimeout(() => light.classList.remove(lightCls), 400);
  }, 550);
}

function bloquearPalancas() {
  leverApto.classList.add("locked");
  leverNoApto.classList.add("locked");
}

function desbloquearPalancas() {
  leverApto.classList.remove("locked");
  leverNoApto.classList.remove("locked");
}

/* ══════════════════════════
   MENSAJERO
   ══════════════════════════ */

const messenger = document.getElementById("messenger");
const msgBubble = document.getElementById("msgBubble");
let messengerIdleTimeout = null;

function mensajeroEntrar() {
  messenger.classList.remove("hidden", "idle", "exiting");
  messenger.classList.add("walking");

  clearTimeout(messengerIdleTimeout);
  messengerIdleTimeout = setTimeout(() => {
    messenger.classList.remove("walking");
    messenger.classList.add("idle");
    msgBubble.classList.remove("hidden");
    setTimeout(() => msgBubble.classList.add("hidden"), 1800);
  }, 750);
}

function mensajeroSalir() {
  clearTimeout(messengerIdleTimeout);
  messenger.classList.remove("idle", "walking");
  messenger.classList.add("exiting");
  setTimeout(() => messenger.classList.add("hidden"), 420);
}
