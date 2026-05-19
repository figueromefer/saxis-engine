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
  { id: "q001_company_description", label: "¿Cuál es el nombre de la empresa y a qué se dedica en una oración?", hint: "Describe la empresa de forma concreta.", placeholder: "Ej. Empresa dedicada a servicios empresariales." },
  { id: "q002_business_age", label: "¿Cuántos años lleva operando el negocio?", hint: "Si es menos de un año, indique los meses.", placeholder: "Ej. 3 años / 8 meses" },
  { id: "q003_business_stage", label: "¿En qué etapa considera que se encuentra el negocio actualmente?", hint: "Arranque / Crecimiento / Consolidación / Expansión.", placeholder: "Ej. Crecimiento." },
  { id: "q004_team_size", label: "¿Cuántas personas trabajan en la empresa incluyendo socios, empleados y colaboradores?", hint: "Incluye socios activos, empleados y colaboradores recurrentes.", placeholder: "Ej. 12 personas" },
  { id: "q005_main_challenge", label: "En una sola oración: ¿cuál es el mayor problema o reto que enfrenta hoy el negocio?", hint: "Sea directo y específico.", placeholder: "Ej. No tenemos un sistema comercial predecible." },
  { id: "q006_monthly_transactions", label: "¿Cuántas operaciones o transacciones de venta realiza al mes en promedio?", hint: "Métrica base. Use promedio de los últimos 3 meses si varía.", placeholder: "Ej. 40 ventas al mes" },
  { id: "q007_monthly_revenue", label: "¿Cuál es el monto total de ventas o ingresos mensuales aproximados?", hint: "Métrica base. Puede ser rango.", placeholder: "Ej. $80,000 - $120,000 MXN/mes" },
  { id: "q008_average_ticket", label: "¿Cuál es el ticket promedio por venta o transacción?", hint: "Métrica base. Valor promedio de cada venta individual.", placeholder: "Ej. $3,500 MXN" },
  { id: "q009_active_clients", label: "¿Cuántos clientes activos tiene actualmente?", hint: "Clientes que han comprado en los últimos 90 días.", placeholder: "Ej. 85 clientes activos" },
  { id: "q010_repeat_customer_percentage", label: "¿Qué porcentaje aproximado de sus ventas proviene de clientes que regresan a comprar de nuevo?", hint: "Métrica base. Estime nuevos vs recurrentes.", placeholder: "Ej. 60% recurrentes" },
  { id: "q011_customer_channels", label: "¿Por qué canales llegan la mayoría de sus clientes hoy?", hint: "Redes sociales / Referidos / Publicidad pagada / Búsqueda en Google / Tráfico físico / Otro.", placeholder: "Ej. Referidos y redes sociales." },
  { id: "q012_marketing_budget", label: "¿Tienen presupuesto definido para atraer clientes? ¿Cuánto invierten al mes aproximadamente?", hint: "Si no hay presupuesto definido, escríbalo así.", placeholder: "Ej. $15,000 MXN mensuales / no hay presupuesto fijo" },
  { id: "q013_customer_acquisition_cost", label: "¿Saben cuánto les cuesta conseguir un cliente nuevo — su costo de adquisición?", hint: "Sí con precisión / idea aproximada / no calculado.", placeholder: "Ej. Tenemos una idea aproximada, pero no lo medimos formalmente." },
  { id: "q014_best_customer_channel", label: "¿Han identificado qué canal o fuente genera los mejores clientes?", hint: "No los más baratos, sino los más valiosos.", placeholder: "Ej. Los referidos corporativos compran más rápido y con mayor ticket." },
  { id: "q015_new_customers_trend", label: "En los últimos 3 meses, ¿el número de clientes nuevos aumentó, se mantuvo igual o disminuyó? ¿Saben por qué?", hint: "Explique tendencia y causa probable.", placeholder: "Ej. Disminuyó por menor inversión en anuncios y menor seguimiento." },
  { id: "q016_sales_process", label: "¿Tienen un proceso definido desde que un prospecto muestra interés hasta que compra? ¿Cuántos pasos tiene?", hint: "Describa brevemente el proceso actual.", placeholder: "Ej. Contacto, cotización, seguimiento, cierre." },
  { id: "q017_response_time", label: "¿Cuánto tiempo pasa en promedio desde que un cliente potencial contacta el negocio hasta que recibe respuesta?", hint: "Menos de 5 min / 5-60 min / 1-24 horas / más de 24 horas / no sabemos.", placeholder: "Ej. Entre 1 y 24 horas." },
  { id: "q018_conversion_rate", label: "¿De cada 10 personas que muestran interés en comprar, cuántas terminan comprando efectivamente?", hint: "Ejemplo: 3 de cada 10 = 30%.", placeholder: "Ej. 3 de cada 10" },
  { id: "q019_lost_sale_reason", label: "¿Cuál es la principal razón por la que alguien interesado decide no comprar? ¿Lo saben con datos o es una suposición?", hint: "Explique razón y nivel de certeza.", placeholder: "Ej. Precio; creemos que es suposición porque no medimos objeciones." },
  { id: "q020_follow_up_process", label: "¿Hacen seguimiento a clientes que no compraron la primera vez?", hint: "Sí sistemático / ocasionalmente / no. Si sí, explique cómo.", placeholder: "Ej. Ocasionalmente por WhatsApp, sin proceso definido." },
  { id: "q021_top_products", label: "¿Cuáles son sus 2 o 3 productos o servicios que más se venden? ¿Qué porcentaje representan?", hint: "Indique productos y peso aproximado en ventas.", placeholder: "Ej. Servicio A 50%, Servicio B 30%, Servicio C 20%." },
  { id: "q022_pricing_method", label: "¿Cómo definen sus precios actualmente?", hint: "Costo + margen / mercado / lo que paga el cliente / sin criterio claro.", placeholder: "Ej. Precio de mercado con ajustes por margen." },
  { id: "q023_price_increase", label: "¿Han subido precios en el último año? ¿Cuánto? ¿Cómo reaccionaron los clientes?", hint: "Describa incremento y reacción.", placeholder: "Ej. Subimos 10% y casi no hubo resistencia." },
  { id: "q024_differentiation", label: "¿Tienen claro qué los diferencia de su competencia directa?", hint: "Evite respuestas genéricas como mejor calidad o servicio.", placeholder: "Ej. Menor tiempo de implementación y acompañamiento operativo." },
  { id: "q025_new_offer_opportunity", label: "¿Qué producto o servicio nuevo podrían ofrecer que sus clientes actuales estén pidiendo o necesitando?", hint: "Piense en demanda no capturada.", placeholder: "Ej. Mantenimiento mensual después de la venta inicial." },
  { id: "q026_customer_database", label: "¿Tienen una base de datos organizada de sus clientes con información de contacto?", hint: "Sí actualizada / algo incompleta / no tenemos.", placeholder: "Ej. Tenemos base incompleta en hojas de cálculo." },
  { id: "q027_post_purchase_communication", label: "¿Se comunican activamente con sus clientes después de que compran? ¿Cómo y con qué frecuencia?", hint: "Explique canales y cadencia.", placeholder: "Ej. WhatsApp ocasional, sin calendario." },
  { id: "q028_inactive_customers", label: "¿Saben cuántos clientes que compraron una vez no han vuelto a comprar? ¿Hacen algo al respecto?", hint: "Explique si lo miden y acciones.", placeholder: "Ej. No lo medimos; no tenemos campaña de reactivación." },
  { id: "q029_referrals", label: "¿Qué hace que un cliente los recomiende a alguien más? ¿Tienen algún programa de referidos?", hint: "Explique causa de recomendación y si hay sistema.", placeholder: "Ej. Nos recomiendan por rapidez, pero no tenemos programa formal." },
  { id: "q030_top_client_risk", label: "Si sus mejores 5 clientes dejaran de comprar mañana, ¿cuánto impacto tendría en sus ingresos totales?", hint: "Mide concentración de riesgo.", placeholder: "Ej. Perderíamos 40% de ingresos." },
  { id: "q031_owner_dependency", label: "¿Qué pasaría con el negocio si el dueño o persona clave no pudiera trabajar por 30 días?", hint: "Mide dependencia operativa.", placeholder: "Ej. Se detendrían ventas y autorizaciones importantes." },
  { id: "q032_documented_processes", label: "¿Los procesos principales del negocio están documentados?", hint: "Sí todo / algunos procesos / no, todo está en la cabeza del equipo.", placeholder: "Ej. Algunos procesos, pero ventas no está documentado." },
  { id: "q033_operational_bottlenecks", label: "¿Cuáles son los 2 o 3 cuellos de botella operativos más frecuentes?", hint: "Cosas que se traban o retrasan con mayor frecuencia.", placeholder: "Ej. Cotizaciones tardías, seguimiento y cobranza." },
  { id: "q034_management_tools", label: "¿Usan alguna herramienta de gestión — software, CRM, app, hoja de control? ¿Cuál?", hint: "Indique herramientas reales.", placeholder: "Ej. Excel y WhatsApp; no usamos CRM." },
  { id: "q035_owner_time_allocation", label: "¿Cuánto tiempo dedica el dueño a tareas operativas vs a pensar y planear crecimiento?", hint: "Ejemplo: 80% operativo, 20% estratégico.", placeholder: "Ej. 85% operativo, 15% estratégico." },
  { id: "q036_net_margin", label: "¿Saben cuál es su margen de ganancia neta aproximado?", hint: "Sí calculado / idea aproximada / no calculado. Si sí, indique cuánto.", placeholder: "Ej. Tenemos idea: 18% neto aproximado." },
  { id: "q037_business_personal_finances", label: "¿Tienen separadas las finanzas del negocio de las finanzas personales del dueño?", hint: "Sí completamente / parcialmente / no.", placeholder: "Ej. Parcialmente separadas." },
  { id: "q038_cash_flow_health", label: "¿El negocio genera suficiente flujo para cubrir gastos del mes sin depender de ventas futuras?", hint: "Sí siempre / mayoría / a veces ajustado / frecuente falta de liquidez.", placeholder: "Ej. A veces es ajustado." },
  { id: "q039_largest_fixed_cost", label: "¿Cuál es el mayor gasto fijo mensual del negocio?", hint: "El que más pesa aunque no vendan nada.", placeholder: "Ej. Nómina: $120,000 MXN mensuales." },
  { id: "q040_12_month_goal", label: "¿Cuál es el objetivo más importante del negocio para los próximos 12 meses — en números concretos?", hint: "Sea numérico y específico.", placeholder: "Ej. Llegar a $500,000 MXN mensuales y abrir segunda sucursal." },
  { id: "q041_main_blocker", label: "¿Qué está impidiendo hoy que ese objetivo ya se esté cumpliendo?", hint: "Sea honesto. Esta es una de las preguntas más importantes.", placeholder: "Ej. Falta de proceso comercial y dependencia del dueño." },
  { id: "q042_previous_attempts", label: "¿Han intentado antes resolver el problema principal? ¿Qué intentaron y por qué no funcionó?", hint: "Explique intentos previos.", placeholder: "Ej. Contratamos agencia, pero no había seguimiento comercial interno." },
  { id: "q043_second_operator", label: "¿Existe alguien en el negocio además del dueño que entienda la operación completa?", hint: "Sí persona clave / conocimiento parcial repartido / todo depende del dueño.", placeholder: "Ej. Hay conocimiento parcial repartido." },
  { id: "q044_postponed_decision", label: "¿Qué decisión comercial o de negocio han estado postergando que saben que necesitan tomar?", hint: "No hay respuesta incorrecta.", placeholder: "Ej. Subir precios y dejar clientes poco rentables." },
  { id: "q045_capacity_to_act", label: "Si el diagnóstico identifica que el problema principal está en ventas, operación, precios o equipo, ¿están en posición de actuar sobre eso?", hint: "Incluya limitaciones reales: tiempo, dinero, personas.", placeholder: "Ej. Sí, pero con presupuesto limitado y poco tiempo del dueño." },
];

export const propertyQuestions: Question[] = [];

export const ventureQuestions: Question[] = [];
