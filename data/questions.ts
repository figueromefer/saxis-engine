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
    id: "q001_company_description",
    label: "¿Cuál es el nombre de la empresa y a qué se dedica en una oración?",
    hint: "Describe la empresa de forma concreta. Esta respuesta también se usará como referencia interna del diagnóstico.",
    placeholder: "Ej. Bóveda Creativa es una agencia enfocada en estrategia digital y desarrollo web.",
  },
  {
    id: "q002_business_age",
    label: "¿Cuántos años lleva operando el negocio?",
    hint: "Si es menos de un año, indique los meses.",
    placeholder: "Ej. 3 años / 8 meses / 12 años",
  },
  {
    id: "q003_business_stage",
    label: "¿En qué etapa considera que se encuentra el negocio actualmente?",
    hint: "Arranque / Crecimiento / Consolidación / Expansión.",
    placeholder: "Ej. Crecimiento, pero con operación todavía muy dependiente del dueño.",
  },
  {
    id: "q004_team_size",
    label: "¿Cuántas personas trabajan en la empresa incluyendo socios, empleados y colaboradores?",
    hint: "Incluye equipo fijo, socios activos, freelancers recurrentes y colaboradores clave.",
    placeholder: "Ej. 12 personas",
  },
  {
    id: "q005_main_challenge",
    label: "En una sola oración: ¿cuál es el mayor problema o reto que enfrenta hoy el negocio?",
    hint: "No hay respuesta incorrecta. Sea directo y específico.",
    placeholder: "Ej. Dependemos demasiado de referidos y no tenemos un sistema comercial predecible.",
  },
  {
    id: "q006_monthly_transactions",
    label: "¿Cuántas operaciones o transacciones de venta realiza al mes en promedio?",
    hint: "Métrica base. Ventas, pedidos, servicios prestados o contratos cerrados. Si varía, usa promedio de 3 meses.",
    placeholder: "Ej. 40 ventas al mes / entre 25 y 35 contratos",
  },
  {
    id: "q007_monthly_revenue",
    label: "¿Cuál es el monto total de ventas o ingresos mensuales aproximados?",
    hint: "Métrica base. Puede ser rango. Este dato es confidencial y calibra el diagnóstico.",
    placeholder: "Ej. $80,000 - $120,000 MXN mensuales",
  },
  {
    id: "q008_average_ticket",
    label: "¿Cuál es el ticket promedio por venta o transacción?",
    hint: "Métrica base. Valor promedio de cada venta individual.",
    placeholder: "Ej. $3,500 MXN por venta",
  },
  {
    id: "q009_active_clients",
    label: "¿Cuántos clientes activos tiene actualmente?",
    hint: "Métrica base. Clientes que han comprado en los últimos 90 días.",
    placeholder: "Ej. 85 clientes activos",
  },
  {
    id: "q010_repeat_customer_percentage",
    label: "¿Qué porcentaje aproximado de sus ventas proviene de clientes que regresan a comprar de nuevo?",
    hint: "Métrica base. Ejemplo: 30% nuevos, 70% recurrentes.",
    placeholder: "Ej. 60% recurrentes / 40% nuevos",
  },
  {
    id: "q011_customer_channels",
    label: "¿Por qué canales llegan la mayoría de sus clientes hoy?",
    hint: "Redes sociales / Referidos / Publicidad pagada / Búsqueda en Google / Tráfico físico / Otro.",
    placeholder: "Ej. Principalmente referidos y redes sociales; poco tráfico desde Google.",
  },
  {
    id: "q012_marketing_budget",
    label: "¿Tienen presupuesto definido para atraer clientes? ¿Cuánto invierten al mes aproximadamente en marketing o publicidad?",
    hint: "Si no hay presupuesto definido, escríbalo así.",
    placeholder: "Ej. No hay presupuesto fijo / invertimos aprox. $15,000 MXN mensuales en ads.",
  },
  {
    id: "q013_customer_acquisition_cost",
    label: "¿Saben cuánto les cuesta conseguir un cliente nuevo — su costo de adquisición?",
    hint: "Sí lo sabemos con precisión / tenemos una idea aproximada / no lo hemos calculado.",
    placeholder: "Ej. Tenemos una idea aproximada, pero no lo medimos formalmente.",
  },
  {
    id: "q014_best_customer_channel",
    label: "¿Han identificado qué canal o fuente genera los mejores clientes?",
    hint: "No los más baratos, sino los más valiosos. Describa brevemente.",
    placeholder: "Ej. Los referidos corporativos compran más rápido y con mayor ticket.",
  },
];

export const propertyQuestions: Question[] = [];

export const ventureQuestions: Question[] = [];
