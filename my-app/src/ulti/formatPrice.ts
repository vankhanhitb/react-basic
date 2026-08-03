export function formattedPrice (amount){
  const price = typeof(amount) === "string" ? parseInt(amount) : amount;
  return new Number(price).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
}