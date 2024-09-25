import { Link } from "react-router-dom";
import { toDecimal } from "../utils/math";

function ProductCard(prop) {
  const { _id, category, image, name, price, stock, imageURL } = prop.product;
  if (prop.selected == category || prop.selected == "all") {
    return (
      <Link to={`/product/${_id}`} data-category={category} data-stock={stock}>
        <div className="product-card">
          <figure className="card-image">
            <img
              src={imageURL}
              alt={image.description}
              className="crop-img"
            ></img>
          </figure>
          <p>{name}</p>
          <p className="card-price">${toDecimal(price)}</p>
        </div>
      </Link>
    );
  } else {
    return null;
  }
}

export default ProductCard;
