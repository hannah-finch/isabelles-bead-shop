import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice";

function ProductCard(prop) {
  const { _id, category, image, name, price, stock, imageURL, featured, originalPrice } = prop.product;
  if (prop.selected == category || prop.selected == "all") {
    return (
      <Link to={`/product/${_id}`} data-category={category} data-stock={stock}>
        <div className="product-card">
          <figure className="card-image">
            <img
              src={imageURL}
              alt={name}
              className="crop-img"
            ></img>
          </figure>
          <p>{name} {featured && <span className="product-badge">Featured</span>}</p>
          <p className="card-price"><ProductPrice price={price} originalPrice={originalPrice} /></p>
        </div>
      </Link>
    );
  } else {
    return null;
  }
}

export default ProductCard;
