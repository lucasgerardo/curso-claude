const ars = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const pct = new Intl.NumberFormat("es-AR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatARS = (value: number) => ars.format(value);
export const formatPercent = (value: number) => pct.format(value);

/** Cuota fija (sistema francés) a partir de la TNA. */
export function monthlyPayment(principal: number, tna: number, months: number) {
  const i = tna / 12;
  if (i === 0) return principal / months;
  return (principal * i) / (1 - Math.pow(1 + i, -months));
}

/** TEA equivalente a una TNA con capitalización mensual. */
export const teaFromTna = (tna: number) => Math.pow(1 + tna / 12, 12) - 1;
