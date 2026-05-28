export function formatMoney(value: string | number, currency = "EUR") {
  const num = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("de-AT", { style: "currency", currency, maximumFractionDigits: 0 }).format(num);
}
