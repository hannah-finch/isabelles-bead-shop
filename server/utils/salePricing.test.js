const { test } = require("node:test");
const assert = require("node:assert/strict");
const { salePricing } = require("./salePricing");

test("price reductions preserve the original price across later edits", () => {
  const sale = salePricing({ price: 1000 }, 800);
  assert.deepEqual(sale, { price: 800, originalPrice: 1000 });
  assert.deepEqual(salePricing(sale, 800), sale);
  assert.deepEqual(salePricing(sale, 600), { price: 600, originalPrice: 1000 });
  assert.deepEqual(salePricing(sale, 900), { price: 900, originalPrice: 1000 });
});
test("regular prices and ending a sale clear the original price", () => {
  assert.deepEqual(salePricing({ price: 1000 }, 1000), { price: 1000, originalPrice: null });
  assert.deepEqual(salePricing({ price: 800, originalPrice: 1000 }, 1200), { price: 1200, originalPrice: null });
  assert.deepEqual(salePricing({ price: 800, originalPrice: 1000 }, 800, true), { price: 1000, originalPrice: null });
});
test("invalid prices are rejected", () => {
  for (const price of [-1, 1.5, NaN]) assert.throws(() => salePricing({ price: 1000 }, price));
});
