/**
 * rules.js
 * Motor de evaluación automática — Tema 6: Control Ambiental
 *
 * Aplica la normativa real del documento de reglas:
 *   · Ley 11/2018  → obligación y forma de la EINF
 *   · Ley 21/2013 + Ley 9/2018 → evaluación ambiental (DIA / IIA)
 *   · Normativa sectorial: Ley 7/2022, Ley 34/2007, Ley 42/2007, Ley 7/2021
 *   · Verificación ENAC obligatoria desde 2025
 *
 * Función principal exportada:
 *   evaluarExpediente(expediente) → { esApto, incumplimientos[], cumplimientos[], explicacion }
 */

const PUNTOS_ACIERTO = 10;
const PUNTOS_ERROR   = -5;

/* ════════════════════════════════════════════════════════════════
   REGLAS — cada regla devuelve:
     { aplica: bool, cumple: bool, norma: string, texto: string }
   ════════════════════════════════════════════════════════════════ */

const REGLAS = [

  /* ── R1: ¿Está obligada a publicar EINF? ──────────────────────
     Obligadas: >250 trabajadores Y (entidad interés público
     O activos >20M O volumen >40M) — Ley 11/2018              */
  {
    id: "R1",
    norma: "Ley 11/2018 — Obligación EINF",
    evaluar(h) {
      const obligada = h.trabajadores > 250 &&
        (h.esEntidadIntPublico || h.activosSuperan20M || h.volumenSupera40M);
      if (!obligada) return { aplica: false };

      if (!h.tieneEINF) return {
        aplica: true, cumple: false,
        texto: "La empresa está OBLIGADA a publicar EINF (Ley 11/2018) " +
               "por superar los 250 trabajadores y cumplir criterios económicos, " +
               "pero NO la ha elaborado."
      };
      return {
        aplica: true, cumple: true,
        texto: "Obligada a EINF y la publica correctamente (Ley 11/2018)."
      };
    }
  },

  /* ── R2: EINF firmada por todos los administradores ───────────*/
  {
    id: "R2",
    norma: "Ley 11/2018 — Firma de administradores",
    evaluar(h) {
      if (!h.tieneEINF) return { aplica: false };
      const obligada = h.trabajadores > 250 &&
        (h.esEntidadIntPublico || h.activosSuperan20M || h.volumenSupera40M);
      if (!obligada) return { aplica: false };

      if (!h.einfFirmadaAdmins) return {
        aplica: true, cumple: false,
        texto: "La EINF no ha sido firmada por todos los administradores, " +
               "incumpliendo el requisito formal de la Ley 11/2018."
      };
      return {
        aplica: true, cumple: true,
        texto: "EINF firmada correctamente por todos los administradores."
      };
    }
  },

  /* ── R3: EINF presentada en Registro Mercantil ─────────────── */
  {
    id: "R3",
    norma: "Ley 11/2018 — Presentación en Registro Mercantil",
    evaluar(h) {
      const obligada = h.trabajadores > 250 &&
        (h.esEntidadIntPublico || h.activosSuperan20M || h.volumenSupera40M);
      if (!obligada || !h.tieneEINF) return { aplica: false };

      if (!h.einfEnRegistro) return {
        aplica: true, cumple: false,
        texto: "La EINF no se ha depositado en el Registro Mercantil junto con " +
               "las cuentas anuales en los tres primeros meses del año, " +
               "incumpliendo la Ley 11/2018."
      };
      return {
        aplica: true, cumple: true,
        texto: "EINF depositada en el Registro Mercantil en plazo."
      };
    }
  },

  /* ── R4: EINF disponible gratuitamente en la web ───────────── */
  {
    id: "R4",
    norma: "Ley 11/2018 — Publicidad web",
    evaluar(h) {
      const obligada = h.trabajadores > 250 &&
        (h.esEntidadIntPublico || h.activosSuperan20M || h.volumenSupera40M);
      if (!obligada || !h.tieneEINF) return { aplica: false };

      if (!h.einfPublicaWeb) return {
        aplica: true, cumple: false,
        texto: "La EINF no está disponible de forma gratuita en la web de " +
               "la entidad, contraviniendo la obligación de publicidad de la Ley 11/2018."
      };
      return {
        aplica: true, cumple: true,
        texto: "EINF publicada gratuitamente en la web corporativa."
      };
    }
  },

  /* ── R5: Verificación ENAC (obligatoria desde 2025) ─────────── */
  {
    id: "R5",
    norma: "Ley 11/2018 — Verificación ENAC (desde 2025)",
    evaluar(h) {
      const obligada = h.trabajadores > 250 &&
        (h.esEntidadIntPublico || h.activosSuperan20M || h.volumenSupera40M);
      if (!obligada || !h.tieneEINF) return { aplica: false };
      if (h.anioExpediente < 2025) return { aplica: false }; // no aplica antes de 2025

      if (!h.einfVerificadaENAC) return {
        aplica: true, cumple: false,
        texto: "A partir de 2025 la EINF debe ser verificada obligatoriamente " +
               "por un prestador acreditado por la ENAC. Este expediente (2025) " +
               "no acredita dicha verificación."
      };
      return {
        aplica: true, cumple: true,
        texto: "EINF verificada por prestador acreditado por la ENAC (obligatorio desde 2025)."
      };
    }
  },

  /* ── R6: EINF cubre las cinco áreas exigidas ───────────────── */
  {
    id: "R6",
    norma: "Ley 11/2018 — Contenido obligatorio (5 áreas)",
    evaluar(h) {
      const obligada = h.trabajadores > 250 &&
        (h.esEntidadIntPublico || h.activosSuperan20M || h.volumenSupera40M);
      if (!obligada || !h.tieneEINF) return { aplica: false };

      const faltantes = [];
      if (!h.einfCubreAmbiental)  faltantes.push("cuestiones ambientales");
      if (!h.einfCubreSocial)     faltantes.push("cuestiones sociales y de personal");
      if (!h.einfCubreRRHH)       faltantes.push("respeto a los derechos humanos");
      if (!h.einfCubreCorrupcion) faltantes.push("lucha contra la corrupción y el soborno");
      if (!h.einfCubreSociedad)   faltantes.push("información sobre la sociedad");

      if (faltantes.length > 0) return {
        aplica: true, cumple: false,
        texto: "La EINF no cubre todas las áreas obligatorias de la Ley 11/2018. " +
               "Faltan: " + faltantes.join(", ") + "."
      };
      return {
        aplica: true, cumple: true,
        texto: "La EINF cubre las cinco áreas obligatorias de la Ley 11/2018."
      };
    }
  },

  /* ── R7: Proyecto nuevo → necesita DIA o IIA ───────────────── */
  {
    id: "R7",
    norma: "Ley 21/2013 + Ley 9/2018 — Evaluación de Impacto Ambiental",
    evaluar(h) {
      if (!h.tieneProyectoNuevo) return { aplica: false };

      if (!h.tieneDIA && !h.tieneIIA) return {
        aplica: true, cumple: false,
        texto: "La actividad incluye un proyecto nuevo o ampliación sustancial " +
               "que requiere evaluación ambiental (Ley 21/2013, mod. Ley 9/2018), " +
               "pero no se ha tramitado ni Declaración ni Informe de Impacto Ambiental."
      };
      return {
        aplica: true, cumple: true,
        texto: h.tieneDIA
          ? "Proyecto sometido al procedimiento ordinario de EIA con DIA favorable (Ley 21/2013)."
          : "Proyecto sometido al procedimiento simplificado de EIA con IIA favorable (Ley 21/2013)."
      };
    }
  },

  /* ── R8: Cumplimiento de condiciones de la DIA/IIA ─────────── */
  {
    id: "R8",
    norma: "Ley 21/2013 — Condiciones de la DIA / IIA",
    evaluar(h) {
      if (!h.tieneProyectoNuevo) return { aplica: false };
      if (!h.tieneDIA && !h.tieneIIA) return { aplica: false };

      if (!h.cumpleCondicionesDIA) return {
        aplica: true, cumple: false,
        texto: "Tiene DIA/IIA favorable pero NO cumple los condicionantes " +
               "impuestos, lo que invalida la autorización ambiental del proyecto."
      };
      return {
        aplica: true, cumple: true,
        texto: "Cumple íntegramente las condiciones establecidas en la DIA/IIA."
      };
    }
  },

  /* ── R9: Normativa de residuos (Ley 7/2022) ────────────────── */
  {
    id: "R9",
    norma: "Ley 7/2022 — Residuos y suelos contaminados",
    evaluar(h) {
      if (!h.sectorResiduos) return { aplica: false };
      if (!h.cumpleNormativaRes) return {
        aplica: true, cumple: false,
        texto: "La empresa genera residuos peligrosos o especiales pero no cumple " +
               "la Ley 7/2022 de residuos (p.ej.: sin contrato escrito con gestor " +
               "autorizado o sin registro correcto de gestión)."
      };
      return {
        aplica: true, cumple: true,
        texto: "Gestión de residuos conforme a la Ley 7/2022."
      };
    }
  },

  /* ── R10: Normativa de calidad del aire (Ley 34/2007) ────────── */
  {
    id: "R10",
    norma: "Ley 34/2007 — Calidad del aire y protección de la atmósfera",
    evaluar(h) {
      if (!h.sectorAtmosfera) return { aplica: false };
      if (!h.cumpleNormativaAtm) return {
        aplica: true, cumple: false,
        texto: "La actividad genera emisiones atmosféricas que superan los límites " +
               "o no dispone de las autorizaciones preceptivas según la Ley 34/2007 " +
               "de calidad del aire y protección de la atmósfera."
      };
      return {
        aplica: true, cumple: true,
        texto: "Emisiones atmosféricas dentro de los límites de la Ley 34/2007."
      };
    }
  },

  /* ── R11: Normativa de biodiversidad (Ley 42/2007) ───────────── */
  {
    id: "R11",
    norma: "Ley 42/2007 — Patrimonio Natural y Biodiversidad",
    evaluar(h) {
      if (!h.sectorBiodiversidad) return { aplica: false };
      if (!h.cumpleNormativaBio) return {
        aplica: true, cumple: false,
        texto: "La actividad afecta a espacios naturales protegidos o especies " +
               "y no cumple la Ley 42/2007 del Patrimonio Natural y de la Biodiversidad."
      };
      return {
        aplica: true, cumple: true,
        texto: "Actividad compatible con la Ley 42/2007 (Patrimonio Natural)."
      };
    }
  },

  /* ── R12: Normativa de cambio climático (Ley 7/2021) ─────────── */
  {
    id: "R12",
    norma: "Ley 7/2021 — Cambio climático y transición energética",
    evaluar(h) {
      if (!h.sectorClimatico) return { aplica: false };
      if (!h.cumpleNormativaClima) return {
        aplica: true, cumple: false,
        texto: "La actividad genera emisiones de GEI significativas pero no " +
               "cumple las obligaciones de la Ley 7/2021 de cambio climático " +
               "(p.ej.: sin plan de adaptación o sin reporte de huella de carbono)."
      };
      return {
        aplica: true, cumple: true,
        texto: "Cumple las obligaciones de la Ley 7/2021 de cambio climático."
      };
    }
  },

];

/* ════════════════════════════════════════════════════════════════
   EVALUACIÓN PRINCIPAL
   ════════════════════════════════════════════════════════════════ */

/**
 * Evalúa un expediente aplicando todas las reglas.
 * @param {Object} expediente - objeto de EXPEDIENTES con campo `hechos`
 * @returns {{
 *   esApto: boolean,
 *   incumplimientos: string[],
 *   cumplimientos: string[],
 *   explicacion: string
 * }}
 */
function evaluarExpediente(expediente) {
  const h = expediente.hechos;
  const incumplimientos = [];
  const cumplimientos   = [];

  REGLAS.forEach(regla => {
    const resultado = regla.evaluar(h);
    if (!resultado.aplica) return;

    if (resultado.cumple) {
      cumplimientos.push(`✔ [${regla.norma}] ${resultado.texto}`);
    } else {
      incumplimientos.push(`✘ [${regla.norma}] ${resultado.texto}`);
    }
  });

  const esApto = incumplimientos.length === 0;

  let explicacion = "";
  if (esApto) {
    explicacion = "APTO: El expediente cumple toda la normativa aplicable del Tema 6.";
  } else {
    explicacion = "NO APTO por " + incumplimientos.length +
                  " incumplimiento(s):\n\n" +
                  incumplimientos.map((t, i) => `${i + 1}. ${t}`).join("\n");
  }

  return { esApto, incumplimientos, cumplimientos, explicacion };
}

/* ════════════════════════════════════════════════════════════════
   FUNCIONES DE PUNTUACIÓN Y RESUMEN (usadas desde game.js)
   ════════════════════════════════════════════════════════════════ */

function evaluarDecision(decisionJugador, expediente) {
  const { esApto, explicacion } = evaluarExpediente(expediente);
  const correcto = (decisionJugador === esApto);

  return {
    correcto,
    puntos:     correcto ? PUNTOS_ACIERTO : PUNTOS_ERROR,
    mensaje:    correcto ? "✔ CORRECTO" : "✘ INCORRECTO",
    explicacion,                   // generada automáticamente por las reglas
    esAptoReal: esApto,
  };
}

function calcularCalificacion(aciertos, total) {
  if (total === 0) return "SIN DATOS";
  const pct = (aciertos / total) * 100;
  if (pct >= 90) return "INSPECTOR JEFE";
  if (pct >= 70) return "INSPECTOR";
  if (pct >= 50) return "TÉCNICO AMBIENTAL";
  return "EN PRÁCTICAS";
}

function generarResumen(historial, puntosTotales, nombreJugador) {
  const aciertos     = historial.filter(h => h.correcto).length;
  const calificacion = calcularCalificacion(aciertos, historial.length);

  let texto = `Jugador  : ${nombreJugador}\n`;
  texto    += `Aciertos : ${aciertos} / ${historial.length}\n`;
  texto    += `Puntos   : ${puntosTotales}\n`;
  texto    += `Rango    : ${calificacion}\n\n`;
  texto    += `── DETALLE ──────────────────\n`;

  historial.forEach(h => {
    const icono    = h.correcto ? "✔" : "✘";
    const veredicto = h.esAptoReal ? "APTO" : "NO APTO";
    texto += `${icono} ${h.expediente.id} — ${veredicto}\n`;
    texto += `   ${h.expediente.nombre}\n`;
  });

  return texto;
}
