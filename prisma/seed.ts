import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [
  {
    id: "q001_company_description",
    block: "BLOQUE 0 — CONTEXTO GENERAL",
    title: "¿Cuál es el nombre de la empresa y a qué se dedica en una oración?",
    inputType: "short_text",
    order: 1,
    isBaseline: false,
  },
  {
    id: "q002_business_age",
    block: "BLOQUE 0 — CONTEXTO GENERAL",
    title: "¿Cuántos años lleva operando el negocio? Si es menos de un año, indique los meses.",
    inputType: "short_text",
    order: 2,
    isBaseline: false,
  },
  {
    id: "q003_business_stage",
    block: "BLOQUE 0 — CONTEXTO GENERAL",
    title: "¿En qué etapa considera que se encuentra el negocio actualmente?",
    inputType: "single_choice",
    order: 3,
    isBaseline: false,
  },
  {
    id: "q004_team_size",
    block: "BLOQUE 0 — CONTEXTO GENERAL",
    title: "¿Cuántas personas trabajan en la empresa incluyendo socios, empleados y colaboradores?",
    inputType: "number",
    order: 4,
    isBaseline: false,
  },
  {
    id: "q005_main_challenge",
    block: "BLOQUE 0 — CONTEXTO GENERAL",
    title: "En una sola oración: ¿cuál es el mayor problema o reto que enfrenta hoy el negocio?",
    inputType: "long_text",
    order: 5,
    isBaseline: false,
  },
  {
    id: "q006_monthly_transactions",
    block: "BLOQUE 1 — MÉTRICAS BASE",
    title: "¿Cuántas operaciones o transacciones de venta realiza al mes en promedio?",
    inputType: "number_or_range",
    order: 6,
    isBaseline: true,
  },
  {
    id: "q007_monthly_revenue",
    block: "BLOQUE 1 — MÉTRICAS BASE",
    title: "¿Cuál es el monto total de ventas o ingresos mensuales aproximados?",
    inputType: "currency_or_range",
    order: 7,
    isBaseline: true,
  },
  {
    id: "q008_average_ticket",
    block: "BLOQUE 1 — MÉTRICAS BASE",
    title: "¿Cuál es el ticket promedio por venta o transacción?",
    inputType: "currency",
    order: 8,
    isBaseline: true,
  },
  {
    id: "q009_active_clients",
    block: "BLOQUE 1 — MÉTRICAS BASE",
    title: "¿Cuántos clientes activos tiene actualmente — clientes que han comprado en los últimos 90 días?",
    inputType: "number",
    order: 9,
    isBaseline: true,
  },
  {
    id: "q010_repeat_customer_percentage",
    block: "BLOQUE 1 — MÉTRICAS BASE",
    title: "¿Qué porcentaje aproximado de sus ventas proviene de clientes que regresan a comprar de nuevo?",
    inputType: "percentage",
    order: 10,
    isBaseline: true,
  },
];

async function main() {
  for (const question of questions) {
    await prisma.question.upsert({
      where: { id: question.id },
      update: question,
      create: question,
    });
  }

  console.log(`Seed completed. Inserted/updated ${questions.length} questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
