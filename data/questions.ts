import { AnalysisType } from "@/types/analysis";

export type Question = {
  id: string;
  label: string;
  hint: string;
  placeholder: string;
  type?: "text" | "textarea";
  appliesTo?: AnalysisType[];
};

export const baseQuestions: Question[] = [
  {
    id: "name",
    label: "¿Cómo se llama el proyecto, propiedad o iniciativa?",
    hint: "El nombre muchas veces revela posicionamiento, intención o narrativa.",
    placeholder: "Ej. Torre Aurora / StudioGrid / Hacienda Cinco",
  },

  {
    id: "targetMarket",
    label: "¿Quién crees que es el cliente, comprador o usuario ideal?",
    hint: "No describas demographics únicamente. Describe comportamiento y motivaciones.",
    placeholder:
      "Ej. Familias buscando patrimonio aspiracional cerca de la ciudad...",
  },

  {
    id: "mainGoal",
    label: "¿Qué quieres lograr realmente con este proyecto?",
    hint: "No solo dinero. ¿Liquidez? ¿Posicionamiento? ¿Flujo? ¿Autoridad? ¿Escalabilidad?",
    placeholder:
      "Ej. Generar flujo constante mientras aumenta plusvalía...",
  },

  {
    id: "currentStage",
    label: "¿En qué etapa está actualmente?",
    hint: "La etapa cambia completamente las oportunidades disponibles.",
    placeholder:
      "Idea / validación / construcción / operación / estancamiento...",
  },

  {
    id: "constraints",
    label: "¿Cuál es el principal cuello de botella o limitante?",
    hint: "Capital, tiempo, permisos, diferenciación, mercado, ejecución, etc.",
    placeholder:
      "Ej. Dependemos demasiado de recomendaciones y no tenemos sistema comercial...",
  },

  {
    id: "knownOpportunities",
    label: "¿Cuáles son las oportunidades OBVIAS que ya detectaste?",
    hint: "Queremos separar lo evidente de lo no evidente.",
    placeholder:
      "Ej. Crecimiento de la zona, poca competencia premium...",
  },

  {
    id: "suspectedOpportunities",
    label: "¿Qué sientes que podría existir pero aún no logras comprobar?",
    hint: "Aquí normalmente aparecen oportunidades invisibles.",
    placeholder:
      "Ej. Sospecho que hay demanda extranjera no atendida...",
  },

  {
    id: "risks",
    label: "¿Qué es lo que más te preocupa de este proyecto?",
    hint: "Los riesgos percibidos ayudan a detectar riesgos ocultos.",
    placeholder:
      "Ej. Que el mercado ya esté saturado sin que nos demos cuenta...",
  },

  {
    id: "competitorsOrAlternatives",
    label: "¿Contra qué compite realmente?",
    hint: "A veces el verdadero competidor no es obvio.",
    placeholder:
      "Ej. No competimos con otros desarrollos, sino con rentas temporales...",
  },

  {
    id: "availableAssets",
    label: "¿Qué activos o ventajas ya tienes que otros podrían subestimar?",
    hint: "Territorio, contactos, marca, experiencia, ubicación, narrativa, comunidad...",
    placeholder:
      "Ej. Tenemos acceso directo a inversionistas y una marca ya posicionada...",
  },

  {
    id: "timeline",
    label: "¿Cuál es la ventana de tiempo ideal para ejecutar esto?",
    hint: "El timing es uno de los factores más importantes del sistema.",
    placeholder:
      "Ej. Los próximos 18 meses antes de que entren competidores grandes...",
  },
];

export const propertyQuestions: Question[] = [
  {
    id: "location",
    label: "¿Dónde está ubicada la propiedad o activo?",
    hint: "El territorio es más importante que el inmueble aislado.",
    placeholder:
      "Ciudad, zona, contexto territorial, cercanía con desarrollos, etc.",
    appliesTo: ["property"],
  },

  {
    id: "propertyTransformation",
    label: "¿Qué transformación está viviendo la zona?",
    hint: "Las oportunidades más grandes suelen aparecer antes del consenso.",
    placeholder:
      "Ej. Nuevos desarrollos, turismo creciente, cambio demográfico...",
    appliesTo: ["property"],
  },

  {
    id: "propertyNarrative",
    label: "¿Cómo se vende actualmente esta propiedad y cómo CREES que debería venderse?",
    hint: "Aquí suelen aparecer oportunidades narrativas invisibles.",
    placeholder:
      "Ej. Se vende como terreno, pero podría venderse como activo estratégico...",
    appliesTo: ["property"],
  },
];

export const ventureQuestions: Question[] = [
  {
    id: "ventureDistribution",
    label: "¿Cómo llegan actualmente los clientes o usuarios?",
    hint: "La distribución suele ser más importante que el producto.",
    placeholder:
      "Ej. Referidos, ads, comunidad, ventas directas, partnerships...",
    appliesTo: ["venture"],
  },

  {
    id: "ventureAsymmetry",
    label: "¿Qué entiendes o ves del mercado que otros parecen ignorar?",
    hint: "Aquí nacen muchas ventajas asimétricas.",
    placeholder:
      "Ej. El mercado no quiere más opciones, quiere menos fricción...",
    appliesTo: ["venture"],
  },

  {
    id: "ventureLeverage",
    label: "¿Qué parte del modelo podría escalar sin crecer proporcionalmente en costos?",
    hint: "Buscamos leverage oculto.",
    placeholder:
      "Ej. Automatización, comunidad, distribución, licenciamiento...",
    appliesTo: ["venture"],
  },
];