/**
 * data.js
 * Expedientes del Tema 6 — Control Ambiental
 *
 * Cada expediente describe HECHOS objetivos.
 * El campo `esApto` NO existe aquí: lo calcula rules.js automáticamente
 * aplicando la normativa real del Tema 6.
 *
 * Estructura de `hechos`:
 * ─────────────────────────────────────────────────────────────────
 * DATOS GENERALES
 *   trabajadores          {number}  Plantilla total
 *   esEntidadIntPublico   {boolean} Entidad de interés público
 *   activosSuperan20M     {boolean} Activos > 20 M€ dos años consecutivos
 *   volumenSupera40M      {boolean} Volumen negocio > 40 M€ dos años consecutivos
 *   anioExpediente        {number}  Año al que se refiere el expediente
 *
 * EINF (Ley 11/2018)
 *   tieneEINF             {boolean} Publica Estado de Información No Financiera
 *   einfFirmadaAdmins     {boolean} Firmada por todos los administradores
 *   einfEnRegistro        {boolean} Presentada en Registro Mercantil con cuentas anuales
 *   einfPublicaWeb        {boolean} Disponible gratuitamente en la web
 *   einfVerificadaENAC    {boolean} Verificada por prestador acreditado por ENAC
 *   einfCubreAmbiental    {boolean} Incluye cuestiones ambientales
 *   einfCubreSocial       {boolean} Incluye cuestiones sociales y de personal
 *   einfCubreRRHH         {boolean} Incluye respeto a los derechos humanos
 *   einfCubreCorrupcion   {boolean} Incluye lucha contra corrupción y soborno
 *   einfCubreSociedad     {boolean} Incluye información sobre la sociedad
 *
 * EVALUACIÓN AMBIENTAL (Ley 21/2013 + Ley 9/2018)
 *   tieneProyectoNuevo    {boolean} Hay proyecto/ampliación que requiere evaluación
 *   tieneDIA              {boolean} Obtuvo Declaración de Impacto Ambiental (ord.)
 *   tieneIIA              {boolean} Obtuvo Informe de Impacto Ambiental (simplif.)
 *   cumpleCondicionesDIA  {boolean} Cumple condiciones impuestas en la DIA/IIA
 *
 * NORMATIVA SECTORIAL
 *   sectorAgua            {boolean} Opera en sector con afección a aguas
 *   cumpleNormativaAgua   {boolean} Cumple RDL 1/2001 (Ley de Aguas)
 *   sectorAtmosfera       {boolean} Genera emisiones atmosféricas relevantes
 *   cumpleNormativaAtm    {boolean} Cumple Ley 34/2007 (calidad del aire)
 *   sectorResiduos        {boolean} Genera residuos peligrosos o especiales
 *   cumpleNormativaRes    {boolean} Cumple Ley 7/2022 (residuos)
 *   sectorBiodiversidad   {boolean} Actividad con afección a espacios naturales
 *   cumpleNormativaBio    {boolean} Cumple Ley 42/2007 (Patrimonio Natural)
 *   sectorClimatico       {boolean} Actividad con emisiones de GEI significativas
 *   cumpleNormativaClima  {boolean} Cumple Ley 7/2021 (cambio climático)
 *
 * ESTÁNDARES VOLUNTARIOS
 *   tieneISO14001         {boolean} Certificación ISO 14001 vigente
 *   tieneEMAS             {boolean} Registro EMAS activo
 * ─────────────────────────────────────────────────────────────────
 */

const EXPEDIENTES = [

  /* ── EXP-001 ─────────────────────────────────────────────────── */
  {
    id: "EXP-001",
    nombre: "Industrias Metalúrgicas Vega S.A.",
    descripcion:
      "Empresa del sector siderúrgico con 250 trabajadores y considerada entidad de interés público. " +
      "Sus activos superan los 20 millones de euros dos años consecutivos. Publica su Estado de " +
      "Información No Financiera firmado por todos los administradores, presentado en el Registro " +
      "Mercantil junto con las cuentas anuales y disponible en su web corporativa. El informe cubre " +
      "las cinco áreas exigidas. No ha realizado ninguna ampliación ni proyecto nuevo, por lo que no " +
      "se requiere evaluación ambiental. Gestiona sus residuos metálicos con empresa autorizada y " +
      "contrato escrito, cumpliendo la Ley 7/2022. El expediente corresponde al ejercicio 2023.",
    areas: ["einf", "sga", "residuos"],
    hechos: {
      // General
      trabajadores:        250,
      esEntidadIntPublico: true,
      activosSuperan20M:   true,
      volumenSupera40M:    false,
      anioExpediente:      2023,
      // EINF
      tieneEINF:           true,
      einfFirmadaAdmins:   true,
      einfEnRegistro:      true,
      einfPublicaWeb:      true,
      einfVerificadaENAC:  false,   // 2023 → verificación no obligatoria aún
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      // Evaluación ambiental
      tieneProyectoNuevo:  false,
      tieneDIA:            false,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      // Sectorial
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      true,
      cumpleNormativaRes:  true,    // contrato escrito con gestor autorizado
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      // Voluntarios
      tieneISO14001:       true,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-002 ─────────────────────────────────────────────────── */
  {
    id: "EXP-002",
    nombre: "Papelera del Norte S.L.",
    descripcion:
      "Industria papelera con 300 trabajadores cuyos activos superan los 20 millones de euros " +
      "durante dos ejercicios consecutivos, lo que la obliga a publicar EINF. Elabora y firma el " +
      "informe correctamente y lo publica en su web, pero NO lo presenta en el Registro Mercantil " +
      "junto con las cuentas anuales, incumpliendo el procedimiento de la Ley 11/2018. Además, " +
      "sus efluentes líquidos no se gestionan conforme a la Ley 7/2022 de residuos, al carecer " +
      "de contrato escrito con gestor autorizado. El expediente corresponde al ejercicio 2024.",
    areas: ["einf", "residuos"],
    hechos: {
      trabajadores:        300,
      esEntidadIntPublico: false,
      activosSuperan20M:   true,
      volumenSupera40M:    false,
      anioExpediente:      2024,
      tieneEINF:           true,
      einfFirmadaAdmins:   true,
      einfEnRegistro:      false,   // ← INCUMPLIMIENTO
      einfPublicaWeb:      true,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  false,
      tieneDIA:            false,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      true,
      cumpleNormativaRes:  false,   // ← INCUMPLIMIENTO (sin contrato escrito)
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           true,
    }
  },

  /* ── EXP-003 ─────────────────────────────────────────────────── */
  {
    id: "EXP-003",
    nombre: "EcoMadera Ibérica S.A.",
    descripcion:
      "Empresa forestal con 180 trabajadores, activos inferiores a 20 millones de euros y volumen " +
      "de negocio inferior a 40 millones. Al no superar los umbrales de la Ley 11/2018, no está " +
      "obligada a publicar EINF, aunque lo hace voluntariamente cubriendo todas las áreas. " +
      "Sus actividades de explotación forestal están en zona de especial protección, por lo que " +
      "sometió el proyecto a evaluación ambiental simplificada, obteniendo un Informe de Impacto " +
      "Ambiental favorable. Cumple íntegramente las condiciones impuestas. Registrada en EMAS.",
    areas: ["einf", "forestal", "dia"],
    hechos: {
      trabajadores:        180,
      esEntidadIntPublico: false,
      activosSuperan20M:   false,
      volumenSupera40M:    false,
      anioExpediente:      2024,
      tieneEINF:           true,    // voluntaria, no obligatoria
      einfFirmadaAdmins:   true,
      einfEnRegistro:      true,
      einfPublicaWeb:      true,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  true,
      tieneDIA:            false,
      tieneIIA:            true,    // procedimiento simplificado correcto
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      false,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: true,
      cumpleNormativaBio:  true,    // cumple Ley 42/2007
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           true,
    }
  },

  /* ── EXP-004 ─────────────────────────────────────────────────── */
  {
    id: "EXP-004",
    nombre: "Cementos Levante S.A.",
    descripcion:
      "Gran empresa industrial con 500 trabajadores, entidad de interés público y volumen de " +
      "negocio superior a 40 millones de euros. Publica su EINF correctamente en todos los " +
      "aspectos formales. Sin embargo, en 2021 realizó una ampliación que modificó " +
      "sustancialmente su capacidad productiva sin someterla al procedimiento de Evaluación " +
      "de Impacto Ambiental exigido por la Ley 21/2013, alegando que la normativa autonómica " +
      "no la requería. Genera emisiones de CO₂ significativas pero carece de plan de adaptación " +
      "al cambio climático conforme a la Ley 7/2021.",
    areas: ["einf", "dia", "impacto"],
    hechos: {
      trabajadores:        500,
      esEntidadIntPublico: true,
      activosSuperan20M:   true,
      volumenSupera40M:    true,
      anioExpediente:      2024,
      tieneEINF:           true,
      einfFirmadaAdmins:   true,
      einfEnRegistro:      true,
      einfPublicaWeb:      true,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  true,
      tieneDIA:            false,   // ← INCUMPLIMIENTO (no tramitó DIA ni IIA)
      tieneIIA:            false,
      cumpleCondicionesDIA:false,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      false,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     true,
      cumpleNormativaClima:false,   // ← INCUMPLIMIENTO (Ley 7/2021)
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-005 ─────────────────────────────────────────────────── */
  {
    id: "EXP-005",
    nombre: "BioEnergía Sur S.L.",
    descripcion:
      "Planta de biogás de nueva construcción con 120 trabajadores. Al ser un proyecto nuevo " +
      "sometió su actividad al procedimiento ordinario de Evaluación de Impacto Ambiental, " +
      "obteniendo Declaración de Impacto Ambiental favorable condicionada en 2022, cuyas " +
      "condiciones cumple íntegramente. No supera los umbrales de la Ley 11/2018 para la EINF " +
      "obligatoria, aunque publica voluntariamente un informe de sostenibilidad en su web. " +
      "Sus emisiones de biogás están dentro de los límites de la Ley 34/2007.",
    areas: ["dia", "einf", "sga"],
    hechos: {
      trabajadores:        120,
      esEntidadIntPublico: false,
      activosSuperan20M:   false,
      volumenSupera40M:    false,
      anioExpediente:      2024,
      tieneEINF:           true,    // voluntaria
      einfFirmadaAdmins:   true,
      einfEnRegistro:      false,   // voluntaria → no obligada a presentarla
      einfPublicaWeb:      true,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  true,
      tieneDIA:            true,    // procedimiento ordinario correcto
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     true,
      cumpleNormativaAtm:  true,    // cumple Ley 34/2007
      sectorResiduos:      false,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-006 ─────────────────────────────────────────────────── */
  {
    id: "EXP-006",
    nombre: "Textiles Fast Fashion Co.",
    descripcion:
      "Empresa textil con 260 trabajadores y volumen de negocio superior a 40 millones de euros " +
      "durante dos ejercicios, lo que la obliga a publicar EINF según la Ley 11/2018. Sin embargo, " +
      "no ha elaborado ningún Estado de Información No Financiera. Sus residuos de tintura " +
      "son gestionados por un tercero, pero sin contrato escrito que lo acredite, incumpliendo " +
      "la Ley 7/2022. Además, sus emisiones de compuestos orgánicos volátiles (COVs) superan " +
      "los límites establecidos en la Ley 34/2007 de calidad del aire. El expediente es de 2024.",
    areas: ["einf", "residuos", "impacto"],
    hechos: {
      trabajadores:        260,
      esEntidadIntPublico: false,
      activosSuperan20M:   false,
      volumenSupera40M:    true,
      anioExpediente:      2024,
      tieneEINF:           false,   // ← INCUMPLIMIENTO (obligada por >250 trab. + vol. >40M)
      einfFirmadaAdmins:   false,
      einfEnRegistro:      false,
      einfPublicaWeb:      false,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  false,
      einfCubreSocial:     false,
      einfCubreRRHH:       false,
      einfCubreCorrupcion: false,
      einfCubreSociedad:   false,
      tieneProyectoNuevo:  false,
      tieneDIA:            false,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     true,
      cumpleNormativaAtm:  false,   // ← INCUMPLIMIENTO (COVs fuera de límites)
      sectorResiduos:      true,
      cumpleNormativaRes:  false,   // ← INCUMPLIMIENTO (sin contrato escrito)
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-007 ─────────────────────────────────────────────────── */
  {
    id: "EXP-007",
    nombre: "Agro-Química Extremeña S.A.",
    descripcion:
      "Industria química agraria con 350 trabajadores, entidad de interés público y activos " +
      "superiores a 20 millones de euros. Publica su EINF con todas las firmas, presentada en " +
      "el Registro Mercantil y verificada por un prestador acreditado por la ENAC (expediente " +
      "de 2025). Cubre las cinco áreas exigidas. Realizó la Evaluación de Impacto Ambiental " +
      "para su última ampliación obteniendo DIA favorable, cuyos condicionantes cumple. " +
      "Gestiona residuos peligrosos con empresa autorizada y contrato vigente (Ley 7/2022). " +
      "Certificada bajo ISO 14001.",
    areas: ["einf", "dia", "residuos", "sga"],
    hechos: {
      trabajadores:        350,
      esEntidadIntPublico: true,
      activosSuperan20M:   true,
      volumenSupera40M:    false,
      anioExpediente:      2025,
      tieneEINF:           true,
      einfFirmadaAdmins:   true,
      einfEnRegistro:      true,
      einfPublicaWeb:      true,
      einfVerificadaENAC:  true,    // 2025 → verificación obligatoria y cumplida
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  true,
      tieneDIA:            true,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      true,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       true,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-008 ─────────────────────────────────────────────────── */
  {
    id: "EXP-008",
    nombre: "Impresiones Verdes S.L.",
    descripcion:
      "Imprenta con 90 trabajadores, activos y volumen de negocio por debajo de los umbrales " +
      "de la Ley 11/2018, por lo que no está obligada a publicar EINF. No realiza ningún " +
      "proyecto nuevo que requiera evaluación ambiental. No obstante, en la inspección de 2024 " +
      "se detectó que emplea tintas con disolventes orgánicos cuyos niveles de COVs superan " +
      "los límites de emisión fijados en la Ley 34/2007 de calidad del aire y protección de " +
      "la atmósfera. No dispone de plan de reducción de emisiones ni ha solicitado la " +
      "autorización de emisiones difusas preceptiva.",
    areas: ["impacto", "sga"],
    hechos: {
      trabajadores:        90,
      esEntidadIntPublico: false,
      activosSuperan20M:   false,
      volumenSupera40M:    false,
      anioExpediente:      2024,
      tieneEINF:           false,   // no obligada → OK
      einfFirmadaAdmins:   false,
      einfEnRegistro:      false,
      einfPublicaWeb:      false,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  false,
      einfCubreSocial:     false,
      einfCubreRRHH:       false,
      einfCubreCorrupcion: false,
      einfCubreSociedad:   false,
      tieneProyectoNuevo:  false,
      tieneDIA:            false,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     true,
      cumpleNormativaAtm:  false,   // ← INCUMPLIMIENTO (COVs superan límites Ley 34/2007)
      sectorResiduos:      false,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-009 ── APTO ──────────────────────────────────────────
     Depuradora municipal. Obligada a EINF. Tramita DIA. Todo OK.
     Reglas que aplican: R1,R2,R3,R4,R5(no,2024),R6,R7,R8,R9,R10
     Resultado esperado: APTO                                      */
  {
    id: "EXP-009",
    nombre: "Aqualia Depuración S.A.",
    descripcion:
      "Empresa de tratamiento de aguas residuales con 280 trabajadores, entidad de interés " +
      "público y activos superiores a 20 millones de euros. Está obligada a publicar EINF " +
      "conforme a la Ley 11/2018. Su informe está firmado por todos los administradores, " +
      "depositado en el Registro Mercantil junto con las cuentas anuales de 2024, disponible " +
      "en su web y cubre las cinco áreas exigidas. La construcción de una nueva línea de " +
      "tratamiento se sometió al procedimiento ordinario de EIA, obteniendo DIA favorable " +
      "cuyos condicionantes cumple íntegramente. La gestión de lodos —clasificados como " +
      "residuo especial— se realiza con gestor autorizado y contrato escrito vigente, " +
      "cumpliendo la Ley 7/2022. Sus vertidos al cauce público se ajustan al RDL 1/2001.",
    areas: ["einf", "dia", "residuos"],
    hechos: {
      trabajadores:        280,
      esEntidadIntPublico: true,
      activosSuperan20M:   true,
      volumenSupera40M:    false,
      anioExpediente:      2024,
      tieneEINF:           true,
      einfFirmadaAdmins:   true,
      einfEnRegistro:      true,
      einfPublicaWeb:      true,
      einfVerificadaENAC:  false,   // 2024 → verificación aún no obligatoria
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  true,
      tieneDIA:            true,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          true,
      cumpleNormativaAgua: true,    // cumple RDL 1/2001
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      true,
      cumpleNormativaRes:  true,    // gestor autorizado + contrato escrito
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       true,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-010 ── NO APTO ───────────────────────────────────────
     Gran empresa sin EINF y con vertidos ilegales (Ley de Aguas).
     Reglas que aplican: R1,R9_agua
     Resultado esperado: NO APTO (2 incumplimientos)               */
  {
    id: "EXP-010",
    nombre: "HidroIndustrias del Tajo S.L.",
    descripcion:
      "Empresa de fabricación de papel reciclado con 310 trabajadores y volumen de negocio " +
      "superior a 40 millones de euros durante dos ejercicios consecutivos. Está obligada a " +
      "publicar EINF según la Ley 11/2018, pero alega que está en proceso de elaboración y " +
      "no la ha publicado en el ejercicio 2024. Además, sus vertidos industriales al río " +
      "superan los límites de DBO₅ autorizados en su concesión, incumpliendo el Real " +
      "Decreto Legislativo 1/2001 (Ley de Aguas). No ha realizado ningún proyecto nuevo " +
      "que requiera evaluación ambiental. Gestiona sus residuos sólidos correctamente.",
    areas: ["einf", "impacto"],
    hechos: {
      trabajadores:        310,
      esEntidadIntPublico: false,
      activosSuperan20M:   false,
      volumenSupera40M:    true,
      anioExpediente:      2024,
      tieneEINF:           false,   // ← INCUMPLIMIENTO (obligada, no publicada)
      einfFirmadaAdmins:   false,
      einfEnRegistro:      false,
      einfPublicaWeb:      false,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  false,
      einfCubreSocial:     false,
      einfCubreRRHH:       false,
      einfCubreCorrupcion: false,
      einfCubreSociedad:   false,
      tieneProyectoNuevo:  false,
      tieneDIA:            false,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          true,
      cumpleNormativaAgua: false,   // ← INCUMPLIMIENTO (vertidos superan límites DBO₅)
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      true,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-011 ── APTO ──────────────────────────────────────────
     Pequeña empresa no obligada a EINF, sin proyectos nuevos,
     sin sectores de riesgo. Caso simple pero correcto.
     Resultado esperado: APTO (ninguna regla incumplida)           */
  {
    id: "EXP-011",
    nombre: "Carpintería Artesanal Roble S.L.",
    descripcion:
      "Pequeña empresa artesanal de carpintería con 18 trabajadores y volumen de negocio " +
      "inferior a 40 millones de euros. Al no superar ninguno de los umbrales de la " +
      "Ley 11/2018, no está obligada a publicar EINF. No ha realizado ningún proyecto " +
      "nuevo ni ampliación que requiera evaluación ambiental. Sus residuos de serrín y " +
      "viruta no están clasificados como peligrosos, por lo que no le aplica la Ley 7/2022 " +
      "en cuanto a gestión de residuos especiales. No genera emisiones atmosféricas ni " +
      "afecta a espacios naturales protegidos. Cumple toda la normativa que le es aplicable.",
    areas: ["sga"],
    hechos: {
      trabajadores:        18,
      esEntidadIntPublico: false,
      activosSuperan20M:   false,
      volumenSupera40M:    false,
      anioExpediente:      2024,
      tieneEINF:           false,   // no obligada → correcto
      einfFirmadaAdmins:   false,
      einfEnRegistro:      false,
      einfPublicaWeb:      false,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  false,
      einfCubreSocial:     false,
      einfCubreRRHH:       false,
      einfCubreCorrupcion: false,
      einfCubreSociedad:   false,
      tieneProyectoNuevo:  false,
      tieneDIA:            false,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      false,   // residuos no peligrosos → no aplica R9
      cumpleNormativaRes:  true,
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-012 ── NO APTO ───────────────────────────────────────
     Grande empresa con EINF incompleta (falta área RRHH y corrupción)
     y proyecto sin DIA. Triple incumplimiento.
     Resultado esperado: NO APTO (3 incumplimientos)               */
  {
    id: "EXP-012",
    nombre: "Construcciones e Infraestructuras Koral S.A.",
    descripcion:
      "Gran constructora con 420 trabajadores, entidad de interés público y activos " +
      "superiores a 20 millones de euros durante dos ejercicios. Publica su EINF, la firma, " +
      "la deposita en el Registro Mercantil y la cuelga en su web. Sin embargo, el informe " +
      "solo cubre cuestiones ambientales, sociales y de sociedad; omite completamente los " +
      "apartados de derechos humanos y lucha contra la corrupción, incumpliendo el contenido " +
      "obligatorio de la Ley 11/2018. Por otra parte, inició en 2023 la construcción de un " +
      "nuevo polígono industrial sin tramitar ningún procedimiento de evaluación ambiental, " +
      "contraviniendo la Ley 21/2013. El expediente corresponde a 2024.",
    areas: ["einf", "dia", "impacto"],
    hechos: {
      trabajadores:        420,
      esEntidadIntPublico: true,
      activosSuperan20M:   true,
      volumenSupera40M:    false,
      anioExpediente:      2024,
      tieneEINF:           true,
      einfFirmadaAdmins:   true,
      einfEnRegistro:      true,
      einfPublicaWeb:      true,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       false,   // ← INCUMPLIMIENTO (Ley 11/2018)
      einfCubreCorrupcion: false,   // ← INCUMPLIMIENTO (Ley 11/2018)
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  true,
      tieneDIA:            false,   // ← INCUMPLIMIENTO (Ley 21/2013)
      tieneIIA:            false,
      cumpleCondicionesDIA:false,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      false,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-013 ── APTO ──────────────────────────────────────────
     Empresa con expediente de 2025: cumple la verificación ENAC
     (nueva obligación). Zona de biodiversidad; cumple Ley 42/2007.
     Resultado esperado: APTO                                      */
  {
    id: "EXP-013",
    nombre: "Energías Renovables Sierra Verde S.A.",
    descripcion:
      "Empresa de generación de energía eólica con 260 trabajadores y activos superiores " +
      "a 20 millones de euros. Obligada a EINF por la Ley 11/2018. Su informe del ejercicio " +
      "2025 está firmado, depositado en el Registro Mercantil, publicado en la web y " +
      "verificado por un prestador acreditado por la ENAC —cumpliendo así la exigencia de " +
      "verificación obligatoria a partir de 2025—, y cubre las cinco áreas reglamentarias. " +
      "Los aerogeneradores se ubican en zona de influencia de una ZEPA, por lo que el " +
      "proyecto se sometió a EIA ordinaria, obteniendo DIA favorable que cumple en " +
      "todos sus condicionantes, incluida la Ley 42/2007 de Patrimonio Natural.",
    areas: ["einf", "dia", "forestal"],
    hechos: {
      trabajadores:        260,
      esEntidadIntPublico: false,
      activosSuperan20M:   true,
      volumenSupera40M:    false,
      anioExpediente:      2025,
      tieneEINF:           true,
      einfFirmadaAdmins:   true,
      einfEnRegistro:      true,
      einfPublicaWeb:      true,
      einfVerificadaENAC:  true,    // 2025 → obligatoria y cumplida ✔
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  true,
      tieneDIA:            true,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      false,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: true,
      cumpleNormativaBio:  true,    // cumple Ley 42/2007
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       true,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-014 ── NO APTO ───────────────────────────────────────
     EINF con todos los formalismos correctos PERO sin verificación
     ENAC en expediente de 2025 (obligatoria ese año).
     Incumplimiento sutil pero determinante.
     Resultado esperado: NO APTO (1 incumplimiento)               */
  {
    id: "EXP-014",
    nombre: "Distribuidora Logística Nacional S.A.",
    descripcion:
      "Empresa de logística y transporte con 290 trabajadores, entidad de interés público. " +
      "Publica su EINF del ejercicio 2025 firmada por todos los administradores, depositada " +
      "en el Registro Mercantil y disponible en su web, cubriendo las cinco áreas obligatorias. " +
      "Sin embargo, la empresa asume que la verificación por prestador acreditado por la ENAC " +
      "es todavía voluntaria y no la ha solicitado, sin saber que desde 2025 es obligatoria " +
      "según la Ley 11/2018. No tiene proyectos nuevos ni opera en sectores con normativa " +
      "sectorial específica. El resto de la actividad es conforme a derecho.",
    areas: ["einf"],
    hechos: {
      trabajadores:        290,
      esEntidadIntPublico: true,
      activosSuperan20M:   false,
      volumenSupera40M:    false,
      anioExpediente:      2025,
      tieneEINF:           true,
      einfFirmadaAdmins:   true,
      einfEnRegistro:      true,
      einfPublicaWeb:      true,
      einfVerificadaENAC:  false,   // ← INCUMPLIMIENTO (obligatoria desde 2025)
      einfCubreAmbiental:  true,
      einfCubreSocial:     true,
      einfCubreRRHH:       true,
      einfCubreCorrupcion: true,
      einfCubreSociedad:   true,
      tieneProyectoNuevo:  false,
      tieneDIA:            false,
      tieneIIA:            false,
      cumpleCondicionesDIA:true,
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      false,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: false,
      cumpleNormativaBio:  true,
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

  /* ── EXP-015 ── NO APTO ───────────────────────────────────────
     Empresa con DIA favorable pero que NO cumple sus condicionantes.
     Incumplimiento de R8 (condiciones DIA) + Ley 42/2007.
     Resultado esperado: NO APTO (2 incumplimientos)              */
  {
    id: "EXP-015",
    nombre: "Minería Extractiva del Sur S.A.",
    descripcion:
      "Empresa minera de extracción de áridos con 200 trabajadores. No está obligada a " +
      "publicar EINF al no superar los umbrales económicos de la Ley 11/2018. Su cantera " +
      "se sometió al procedimiento ordinario de EIA y obtuvo DIA favorable condicionada, " +
      "que entre otros requisitos obligaba a instalar pantallas acústicas y a no operar " +
      "en periodo de cría de aves protegidas (LIC adyacente). En la inspección de 2024 se " +
      "constató que las pantallas no han sido instaladas y que la empresa ha operado durante " +
      "el periodo de veda, afectando a especies catalogadas e incumpliendo los condicionantes " +
      "de la DIA y la Ley 42/2007 del Patrimonio Natural y de la Biodiversidad.",
    areas: ["dia", "impacto"],
    hechos: {
      trabajadores:        200,
      esEntidadIntPublico: false,
      activosSuperan20M:   false,
      volumenSupera40M:    false,
      anioExpediente:      2024,
      tieneEINF:           false,   // no obligada → correcto
      einfFirmadaAdmins:   false,
      einfEnRegistro:      false,
      einfPublicaWeb:      false,
      einfVerificadaENAC:  false,
      einfCubreAmbiental:  false,
      einfCubreSocial:     false,
      einfCubreRRHH:       false,
      einfCubreCorrupcion: false,
      einfCubreSociedad:   false,
      tieneProyectoNuevo:  true,
      tieneDIA:            true,
      tieneIIA:            false,
      cumpleCondicionesDIA:false,   // ← INCUMPLIMIENTO (no instaló pantallas, operó en veda)
      sectorAgua:          false,
      cumpleNormativaAgua: true,
      sectorAtmosfera:     false,
      cumpleNormativaAtm:  true,
      sectorResiduos:      false,
      cumpleNormativaRes:  true,
      sectorBiodiversidad: true,
      cumpleNormativaBio:  false,   // ← INCUMPLIMIENTO (Ley 42/2007)
      sectorClimatico:     false,
      cumpleNormativaClima:true,
      tieneISO14001:       false,
      tieneEMAS:           false,
    }
  },

];
