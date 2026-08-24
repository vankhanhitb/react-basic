export function formattedPrice (amount: string | number){
  const price = typeof(amount) === "string" ? parseInt(amount) : amount;
  return new Number(price).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
}