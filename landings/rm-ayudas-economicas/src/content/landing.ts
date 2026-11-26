/**
 * Todo el copy y los datos de la landing de RM.
 *
 * ⚠️ PLACEHOLDERS: los valores marcados con `PLACEHOLDER` son supuestos
 * y deben reemplazarse por datos reales de RM antes de publicar
 * (tasas, montos, teléfono, testimonios, datos legales y URL del sitio).
 */
import type { IconName } from "@/components/ui/Icon";

export type NavLink = { label: string; href: string };
export type Feature = { icon: IconName; title: string; description: string };
export type Step = { title: string; description: string };
export type Testimonial = { quote: string; name: string; detail: string };
export type FaqItem = { question: string; answer: string };

export const site = {
  name: "RM",
  legalName: "[Razón social de RM]", // PLACEHOLDER
  copyrightYear: 2026,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rm-ayudas.com.ar", // PLACEHOLDER
  locale: "es-AR",
  title: "RM · Ayudas económicas rápidas y transparentes",
  description:
    "Pedí tu ayuda económica en minutos, con cuotas fijas y sin letra chica. Simulá tu cuota online y recibí el dinero en tu cuenta.",
  whatsapp: "5490000000000", // PLACEHOLDER: número de WhatsApp de RM, formato internacional sin "+"
  email: "contacto@rm-ayudas.com.ar", // PLACEHOLDER
};

export const nav: NavLink[] = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Simulador", href: "#simulador" },
  { label: "Requisitos", href: "#requisitos" },
  { label: "Preguntas", href: "#preguntas" },
];

export const hero = {
  badge: "Respuesta en 24 h hábiles", // PLACEHOLDER: confirmar plazo real
  title: "La ayuda económica que necesitás, sin vueltas",
  subtitle:
    "Pedila online en pocos minutos, con cuotas fijas en pesos y todos los costos a la vista antes de firmar.",
  primaryCta: { label: "Simulá tu cuota", href: "#simulador" },
  secondaryCta: { label: "Ver requisitos", href: "#requisitos" },
  highlights: [
    { value: "$2.000.000", label: "monto máximo" }, // PLACEHOLDER
    { value: "24", label: "cuotas fijas" }, // PLACEHOLDER
    { value: "100%", label: "online" },
  ],
};

export const sections = {
  features: {
    eyebrow: "Por qué RM",
    title: "Una ayuda pensada para tu día a día",
    subtitle: "Sin filas, sin letra chica y con alguien del otro lado cuando lo necesitás.",
  },
  howItWorks: { eyebrow: "Cómo funciona", title: "Tres pasos y listo" },
  testimonials: { title: "Lo que dicen quienes ya confiaron en RM" },
  faq: { title: "Preguntas frecuentes" },
};

export const features: Feature[] = [
  {
    icon: "bolt",
    title: "Rápida",
    description: "Completás la solicitud desde el celular y te respondemos en el día hábil.",
  },
  {
    icon: "eye",
    title: "Transparente",
    description: "Ves la cuota, la TNA, la TEA y el CFT antes de aceptar. Sin costos escondidos.",
  },
  {
    icon: "calendar",
    title: "Cuotas fijas",
    description: "Elegís el plazo que mejor se adapte a tu sueldo y la cuota no cambia.",
  },
  {
    icon: "shield",
    title: "Segura",
    description: "Tus datos viajan cifrados y solo se usan para evaluar tu solicitud.",
  },
  {
    icon: "phone",
    title: "Sin trámites presenciales",
    description: "Todo el proceso es digital: validamos tu identidad con tu DNI y una selfie.",
  },
  {
    icon: "user",
    title: "Atención humana",
    description: "Un asesor te acompaña por WhatsApp de principio a fin.",
  },
];

export const steps: Step[] = [
  {
    title: "Simulá",
    description: "Elegí el monto y la cantidad de cuotas para conocer cuánto vas a pagar por mes.",
  },
  {
    title: "Solicitá",
    description: "Envianos tu solicitud por WhatsApp con tu DNI y tu último recibo de sueldo.",
  },
  {
    title: "Recibí el dinero",
    description: "Una vez aprobada, firmás online y te transferimos a tu cuenta bancaria o CVU.",
  },
];

export const simulator = {
  title: "Simulá tu ayuda económica",
  subtitle: "Mové los valores y mirá al instante cuánto pagarías por mes.",
  amount: { min: 50_000, max: 2_000_000, step: 10_000, initial: 500_000 }, // PLACEHOLDER
  terms: [3, 6, 9, 12, 18, 24], // PLACEHOLDER
  initialTerm: 12,
  tna: 0.6, // PLACEHOLDER: TNA de ejemplo, NO es la tasa real de RM
  cft: "[A confirmar]", // PLACEHOLDER: CFT con IVA, informado por RM
  disclaimer:
    "Valores ilustrativos y sujetos a aprobación crediticia. La cuota no incluye IVA ni seguros. Consultá TNA, TEA y CFT definitivos antes de aceptar.",
  cta: "Solicitar por WhatsApp",
};

export const requirements = {
  title: "Requisitos",
  subtitle: "Pocos papeles, todos digitales.",
  items: [
    "Ser mayor de 18 años y residir en Argentina.",
    "DNI argentino vigente.",
    "Ingresos demostrables: recibo de sueldo, jubilación o monotributo.",
    "Cuenta bancaria o CVU a tu nombre.",
  ], // PLACEHOLDER: confirmar requisitos reales
};

export const testimonials: Testimonial[] = [
  {
    quote: "[Testimonio real de un cliente sobre la rapidez del proceso.]",
    name: "[Nombre del cliente]",
    detail: "[Ciudad]",
  },
  {
    quote: "[Testimonio real de un cliente sobre la claridad de las condiciones.]",
    name: "[Nombre del cliente]",
    detail: "[Ciudad]",
  },
  {
    quote: "[Testimonio real de un cliente sobre la atención recibida.]",
    name: "[Nombre del cliente]",
    detail: "[Ciudad]",
  },
]; // PLACEHOLDER: reemplazar por testimonios reales con autorización

export const faq: FaqItem[] = [
  {
    question: "¿Cuánto tarda la aprobación?",
    answer:
      "Con la documentación completa, te respondemos dentro de las 24 horas hábiles. Si se aprueba, el dinero se acredita en tu cuenta luego de la firma.",
  },
  {
    question: "¿Puedo pedir una ayuda si estoy en el Veraz?",
    answer:
      "Cada solicitud se evalúa de forma individual. Una deuda informada no implica un rechazo automático, pero sí incide en el análisis.",
  },
  {
    question: "¿Qué es el CFT y por qué es importante?",
    answer:
      "El Costo Financiero Total incluye la tasa de interés y todos los cargos asociados. Es el número que te permite comparar ofertas de forma justa, y siempre te lo informamos antes de firmar.",
  },
  {
    question: "¿Puedo cancelar antes de tiempo?",
    answer:
      "Sí. Podés adelantar cuotas o cancelar el total cuando quieras, pagando solo el capital pendiente y los intereses devengados hasta esa fecha.",
  },
  {
    question: "¿Cómo pago las cuotas?",
    answer: "Por débito automático en tu cuenta, transferencia o en puntos de pago habilitados.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Sí. Usamos conexiones cifradas y tratamos tus datos según la Ley 25.326 de Protección de Datos Personales.",
  },
];

export const ctaBanner = {
  title: "¿Listo para dar el próximo paso?",
  subtitle: "Simulá tu cuota en menos de un minuto. Sin compromiso.",
  cta: { label: "Simulá tu cuota", href: "#simulador" },
};

export const footer = {
  legal:
    "RM no solicita pagos por adelantado para otorgar ayudas económicas. Las solicitudes están sujetas a evaluación crediticia. TNA, TEA y CFT informados en cada oferta.", // PLACEHOLDER: revisar con el área legal
  links: [
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Defensa del consumidor", href: "https://www.argentina.gob.ar/produccion/defensadelconsumidor" },
  ], // PLACEHOLDER: páginas legales por crear
};
