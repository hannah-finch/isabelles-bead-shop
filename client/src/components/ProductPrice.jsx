import { toDecimal } from "../utils/math";

export default function ProductPrice({ price, originalPrice }) {
  const onSale = originalPrice != null && originalPrice > price;
  return (
    <span className="product-price">
      {onSale && <><span className="product-badge">On sale</span>{" "}<span className="original-price">Was <s>${toDecimal(originalPrice)}</s></span>{" "}</>}
      <span>{onSale ? "Now " : ""}${toDecimal(price)}</span>
    </span>
  );
}
