function salePricing(current, price, endSale = false) {
  if (!Number.isSafeInteger(price) || price < 0) {
    throw new Error("Price must be a non-negative whole number of cents");
  }
  const regularPrice = current.originalPrice ?? current.price;
  if (endSale) return { price: regularPrice, originalPrice: null };
  return { price, originalPrice: price < regularPrice ? regularPrice : null };
}

module.exports = { salePricing };
