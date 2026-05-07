/**
 * credits.js
 * Pantalla de créditos estilo recreativa de los 80
 * — Scroll vertical automático
 * — Música chiptune generada con Web Audio API (sin archivos externos)
 *
 * ════════════════════════════════════════════════
 *   EDITA AQUÍ LOS DATOS DE TU EQUIPO
 * ════════════════════════════════════════════════ */

const CREDITOS_DATA = {
  titulo:       "CONTROL AMBIENTAL",
  subtitulo:    "TEMA 6",
  colegio:      "I.E.S. Isidro de Arcenegui y Carmona",     // ← cambia esto
  ciudad:       "Marchena, Sevilla",              // ← cambia esto
  asignatura:   "DASPG y SASPG",           // ← cambia esto
  curso:        "2025 / 2026",                    // ← cambia esto
  profesor:     "Prof. Javier",          // ← cambia esto (o añade más)
  alumnos: [
    "Lucas  ·  Narbona Hidalgo",                   // ← cambia esto
    "Alejandro  ·  Perea Lora",                   // ← cambia esto
    "David  ·  Melero Vega",                   // ← cambia esto
    
  ],
  tecnologias:  ["HTML5", "CSS3", "JAVASCRIPT"],
  fuente:       "Press Start 2P — Google Fonts",
  anio:         "2026",
};

/* ════════════════════════════════════════════════
   GENERADOR DE CRÉDITOS HTML
   ════════════════════════════════════════════════ */

function construirCreditos() {
  const d = CREDITOS_DATA;
  const sep  = `<div class="cr-sep">▓▒░░░░░░░░░░░░░░░░▒▓</div>`;
  const line = `<div class="cr-line">═══════════════════════════════</div>`;

  const alumnosHTML = d.alumnos
    .map(a => `<div class="cr-name">${a}</div>`)
    .join("");

  const tecHTML = d.tecnologias
    .map(t => `<span class="cr-tech">${t}</span>`)
    .join(" &nbsp;·&nbsp; ");

  return `
    <div class="cr-stars">★  ★  ★  ★  ★  ★  ★  ★</div>
    ${sep}

    <div class="cr-game-title">${d.titulo}</div>
    <div class="cr-game-sub">${d.subtitulo}</div>

    ${sep}
    ${line}

    <div class="cr-section-label">UN JUEGO DE</div>

    <div class="cr-highlight">${d.colegio}</div>
    <div class="cr-muted">${d.ciudad}</div>

    ${line}

    <div class="cr-section-label">ASIGNATURA</div>
    <div class="cr-highlight">${d.asignatura}</div>

    <div class="cr-section-label">CURSO ACADÉMICO</div>
    <div class="cr-highlight">${d.curso}</div>

    ${line}
    ${sep}
    ${line}

    <div class="cr-section-label">EQUIPO DESARROLLADOR</div>
    <div class="cr-underline">────────────────────────────</div>

    ${alumnosHTML}

    ${line}

    <div class="cr-section-label">TUTORIZACIÓN</div>
    <div class="cr-name">${d.profesor}</div>

    ${line}
    ${sep}
    ${line}

    <div class="cr-section-label">AGRADECIMIENTOS</div>
    <div class="cr-body">A todos los que estudiaron<br>y repasaron el Tema 6</div>

    ${line}

    <div class="cr-section-label">TECNOLOGÍAS</div>
    <div class="cr-techrow">${tecHTML}</div>
    <div class="cr-muted">${d.fuente}</div>

    ${line}
    ${sep}
    ${line}

    <div class="cr-insert">★  INSERT COIN TO CONTINUE  ★</div>

    ${line}

    <div class="cr-copy">© ${d.anio} · TODOS LOS DERECHOS RESERVADOS</div>
    <div class="cr-muted">REPRODUCCIÓN LIBRE PARA USO EDUCATIVO</div>

    ${sep}
    <div class="cr-stars">★  ★  ★  ★  ★  ★  ★  ★</div>

    <div style="height: 80px;"></div>
  `;
}

/* ════════════════════════════════════════════════
   MOTOR CHIPTUNE — Web Audio API
   ════════════════════════════════════════════════ */

let audioCtx    = null;
let musicOn     = false;
let nextBeat    = 0;
let loopTimer   = null;
let activeNodes = [];   // todos los osciladores y gains en vuelo

// Frecuencias de notas (Hz)
const N = {
  C3:130.81, D3:146.83, E3:164.81, F3:174.61, G3:196.00, A3:220.00, B3:246.94,
  C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00, A4:440.00, B4:493.88,
  C5:523.25, D5:587.33, E5:659.26, F5:698.46, G5:783.99, A5:880.00, B5:987.77,
  R: null,
};

const BPM  = 138;
const BEAT = 60 / BPM;

// Melodía principal (voz aguda — square wave)
const MELODY = [
  [N.A5,.5],[N.G5,.5],[N.E5,.5],[N.D5,.5],
  [N.C5,.5],[N.D5,.5],[N.E5, 1],
  [N.G5,.5],[N.F5,.5],[N.E5,.5],[N.D5,.5],
  [N.E5, 2],
  [N.A4,.5],[N.C5,.5],[N.E5,.5],[N.A5,.5],
  [N.G5,.5],[N.E5,.5],[N.D5, 1],
  [N.C5,.5],[N.B4,.5],[N.C5,.5],[N.D5,.5],
  [N.A4, 2],
];

// Bajo (voz grave — square wave)
const BASS = [
  [N.A3,1],[N.A3,1],[N.A3,1],[N.A3,1],
  [N.F3,1],[N.F3,1],[N.G3,1],[N.G3,1],
  [N.C3,1],[N.C3,1],[N.E3,1],[N.E3,1],
  [N.D3,1],[N.D3,1],[N.G3,1],[N.G3,1],
];

// Arpegio de acompañamiento (triangle wave)
const ARPEGGIO = [
  [N.A4,.25],[N.C5,.25],[N.E5,.25],[N.A5,.25],
  [N.F4,.25],[N.A4,.25],[N.C5,.25],[N.F5,.25],
  [N.G4,.25],[N.B4,.25],[N.D5,.25],[N.G5,.25],
  [N.E4,.25],[N.G4,.25],[N.B4,.25],[N.E5,.25],
];

function playNote(freq, durBeats, startTime, vol, type) {
  if (!freq || !audioCtx) return;

  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const dur  = durBeats * BEAT;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.type = type || "square";
  osc.frequency.value = freq;

  // Envelope: ataque rápido, caída suave
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
  gain.gain.setValueAtTime(vol * 0.8, startTime + dur * 0.5);
  gain.gain.linearRampToValueAtTime(0, startTime + dur * 0.92);

  osc.start(startTime);
  osc.stop(startTime + dur + 0.05);

  // Registrar para poder cancelar en cualquier momento
  activeNodes.push(osc);
  osc.onended = () => {
    const idx = activeNodes.indexOf(osc);
    if (idx !== -1) activeNodes.splice(idx, 1);
  };
}

function scheduleSequence(seq, startTime, vol, type) {
  let t = startTime;
  seq.forEach(([freq, beats]) => {
    playNote(freq, beats, t, vol, type);
    t += beats * BEAT;
  });
  return t; // tiempo de fin
}

function loopMusica() {
  if (!musicOn || !audioCtx) return;

  const now   = audioCtx.currentTime;
  const start = Math.max(now + 0.05, nextBeat);

  scheduleSequence(MELODY,   start, 0.10, "square");
  scheduleSequence(BASS,     start, 0.07, "square");
  scheduleSequence(ARPEGGIO, start, 0.04, "triangle");

  // Duración total de la melodía (en segundos)
  const durMelody = MELODY.reduce((s, [,b]) => s + b, 0) * BEAT;
  nextBeat = start + durMelody;

  // Programar siguiente loop 200ms antes de que acabe
  loopTimer = setTimeout(loopMusica, (durMelody - 0.2) * 1000);
}

function iniciarMusica() {
  // Parar cualquier loop previo antes de empezar uno nuevo
  pararMusica();
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  musicOn  = true;
  nextBeat = 0;
  loopMusica();
}

function pararMusica() {
  musicOn = false;
  clearTimeout(loopTimer);
  // Detener inmediatamente todos los osciladores ya programados
  const now = audioCtx ? audioCtx.currentTime : 0;
  activeNodes.forEach(osc => {
    try { osc.stop(now); } catch (_) {}
  });
  activeNodes = [];
  nextBeat = 0;
}

/* ════════════════════════════════════════════════
   CONTROL DE LA PANTALLA
   ════════════════════════════════════════════════ */

function abrirCreditos() {
  const screen = document.getElementById("creditsScreen");
  const scroll = document.getElementById("creditsScroll");
  const btn    = document.getElementById("creditsMusicBtn");

  // Rellenar contenido
  scroll.innerHTML = construirCreditos();

  // Reiniciar animación
  scroll.classList.remove("scrolling");
  void scroll.offsetWidth;
  scroll.classList.add("scrolling");

  screen.classList.remove("hidden");
  btn.textContent = "♪ MÚSICA: OFF";
  musicOn = false;
}

function cerrarCreditos() {
  pararMusica();
  document.getElementById("creditsScreen").classList.add("hidden");
  document.getElementById("creditsMusicBtn").textContent = "♪ MÚSICA: OFF";
}

function toggleMusica() {
  const btn = document.getElementById("creditsMusicBtn");
  if (musicOn) {
    pararMusica();
    btn.textContent = "♪ MÚSICA: OFF";
  } else {
    iniciarMusica();
    btn.textContent = "♪ MÚSICA: ON";
  }
}

/* ── Eventos ── */
document.getElementById("creditsCloseBtn").addEventListener("click", cerrarCreditos);
document.getElementById("creditsMusicBtn").addEventListener("click", toggleMusica);

// Cerrar créditos con Escape; pausar/reanudar juego también con Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const creditsOpen = !document.getElementById("creditsScreen").classList.contains("hidden");
    if (creditsOpen) {
      cerrarCreditos();
    } else {
      // Solo pausar/reanudar si el juego está activo (gameUI visible)
      const juegoActivo = !document.getElementById("gameUI").classList.contains("hidden");
      if (juegoActivo) togglePausa();
    }
  }
});
