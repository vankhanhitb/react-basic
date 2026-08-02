export function formattedPrice (amount: string){
  const price = parseInt(amount);
  return new Number(price).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
}