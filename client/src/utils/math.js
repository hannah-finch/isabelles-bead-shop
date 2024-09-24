export function toDecimal(num) {
  return (num / 100).toFixed(2);
}

/*
new Intl.NumberFormat("en-IN", {
  type: "currency",
  currency: "USD",
  maximumSignificantDigits: "3",
}).format(value.replace(/,/g, ""))
*/
export function IntToCurrency(v) {
  let value = "";
  if (typeof v !== "string") {
    value = `${v}`;
  } else {
    value = v;
  }
  const maxDollarAmount = 20000000;
  let [dollar, cents] = value.split(".");
  if (!cents) {
    cents = "00";
  }
  if (cents.split("").length > 2) {
    const cent = cents.split("");
    cents = `${cent[0]}${cent[1]}`;
  }
  if (dollar.replace(/,/g, "") > maxDollarAmount) {
    dollar = `${maxDollarAmount}`;
  }
  let newDollar = new Intl.NumberFormat("en-US", {
    type: "currency",
    currency: "USD",
  }).format(dollar.replace(/,/g, ""));
  const amount = `${newDollar}.${cents}`;
  return amount;
}

export function currencyToInt(v) {
  let value = "";
  if (typeof v !== "string") {
    value = `${v}`;
  } else {
    value = v;
  }
  return +value.replace(/,/g, "").replace(/\./g, "");
}
