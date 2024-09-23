import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "../utils/queries.js";
import { toDecimal } from "../utils/math.js";
import { useContext } from "react";
import Auth from "../utils/auth";

import { ShoppingCartContext } from "../utils/ProductsContext.jsx";
import UpdateForm from "../components/forms/UpdateForm.jsx";
import ReviewForm from "../components/forms/ReviewForm.jsx";

function ProductPage() {
  // get product id from url
  const { productId } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
  });

  const { addToCart } = useContext(ShoppingCartContext);
  const [isClicked, setIsClicked] = useState(false);

  function delayClick() {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  }

  const product = data ? data.singleProduct : [];
  console.log(product);
  const {
    id,
    category,
    description,
    imageURL,
    quantity,
    price,
    name,
    reviews,
  } = product;

  const ReviewCard = (prop) => {
    const { rating, content, username } = prop.review;

    return (
      <div className="review-card">
        <div className="block">
          <img src={`/images/stars-${rating}.png`}></img>
          <p>&quot; {content} &quot;</p>
          <p className="bold">- {username}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <section className="product-section">
        <figure className="product-img">
          <img src={imageURL} className="crop-img"></img>
        </figure>

        <div className="product-info">
          <h2>{name}</h2>
          <p>
            Price: <span className="price">${toDecimal(price)}</span>
          </p>
          <p>{description}</p>
          <div className="flex items-center border-solid border-gray-500 border-2 rounded-full px-5 py-0 w-min mb-2">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-0 px-2  rounded-full"
              onClick={() => {
                const quantityElement = document.getElementById("quantity");
                let quantity = parseInt(quantityElement.innerText);
                quantity = Math.max(quantity - 1, 1);
                quantityElement.innerText = quantity;
              }}
            >
              -
            </button>

            <p id="quantity" className="mx-2 w-8 text-center">
              1
            </p>

            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-0 px-2 rounded-full"
              onClick={() => {
                const quantityElement = document.getElementById("quantity");
                let quantity = parseInt(quantityElement.innerText);
                quantity = Math.min(quantity + 1, 10);
                quantityElement.innerText = quantity;
              }}
            >
              +
            </button>
          </div>
          <div className="button-container">
            {quantity < 0 ? (
              <p className="bold">OUT OF STOCK</p>
            ) : (
              <button
                onClick={() => {
                  addToCart(
                    product,
                    parseInt(document.getElementById("quantity").innerText)
                  );
                  document.getElementById("quantity").innerText = 1;
                  delayClick();
                }}
                className="btn-1 add-cart-btn"
                style={{
                  transition: ".5s",
                  backgroundColor: isClicked
                    ? "var(--blue)"
                    : "var(--blackish)",
                }}
              >
                {isClicked ? "Added to Cart!" : "Add to Cart"}
              </button>
            )}
            <ReviewForm />
          </div>
        </div>
      </section>

      {reviews.length ? (
        <>
          <div className="sub-banner"></div>
          <section className="review-section">
            <h2>Reviews</h2>
            <div className="review-grid">
              {/* map through reviews and pass in info to make one card per review */}
              {reviews.map((review, index) => {
                return <ReviewCard review={review} key={index} />;
              })}
            </div>
          </section>
        </>
      ) : null}

      {Auth.isLoggedIn() ? (
        Auth.isAdmin() ? (
          <section className="admin-stuff-section">
            <UpdateForm product={product} />
          </section>
        ) : null
      ) : null}
    </>
  );
}

export default ProductPage;
