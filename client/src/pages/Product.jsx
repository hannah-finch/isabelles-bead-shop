import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "../utils/queries.js";

function ProductPage() {
  // get product id from url
  const { productId } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
  });

  const product = data ? data.singleProduct : [];
  const { id, category, description, image, quantity, price, name } = product;

  const InStock = () => {
    if (quantity < 0) {
      return "OUT OF STOCK";
    } else {
      return;
    }
  };
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <section className="product-section">
        <figure className="product-img">
          <img src={`../${image.Url}`}></img>
        </figure>

        <div className="product-info">
          <h2>{name}</h2>
          <p>
            Price: <span className="price">${price}</span> <InStock />{" "}
          </p>
          <p>{description}</p>
          {/* TODO: Make a dropdown or arrow selection thing to select quantity to add to cart */}
          <p>Quantity:{quantity}</p>

          <div className="button-container">
            <button className="btn-1">Add to Cart</button>
            <button className="btn-2">Leave a Review</button>
          </div>
        </div>
      </section>

      {/* I put some product info here just in case we want it to show if admin is logged in */}
      <div>
        Product info for Admin: <br></br>
        Number in stock: {quantity} <br></br>
        Product id: {id}
      </div>
    </>
  );
}

export default ProductPage;
