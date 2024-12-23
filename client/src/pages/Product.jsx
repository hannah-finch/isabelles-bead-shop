import { useState, useEffect } from "react";
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

  const product = data
    ? data.singleProduct
    : {
        id: "",
        category: "",
        description: "",
        imageURL: "",
        stock: 0,
        price: 0,
        name: "",
        reviews: [],
      };

  const { description, imageURL, stock, price, name, reviews } = product;
  const { addToCart, cartItems } = useContext(ShoppingCartContext);
  const [addClicked, setAddClicked] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentAvailable, setCurrentAvailable] = useState(stock);

  // set current available stock when the product is first rendered. (stock - quantity in cart)
  useEffect(() => {
    const checkCart = cartItems.find((item) => item._id === productId);
    if (checkCart) {
      setCurrentAvailable(stock - checkCart.quantity);
    } else {
      setCurrentAvailable(stock);
    }
  }, [stock, productId, cartItems]);

  function delayClick() {
    setAddClicked(true);

    setTimeout(() => {
      setAddClicked(false);
    }, 2000);
  }

  const clickEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleClaimItem = () => {
    if (currentAvailable > 0) {
      addToCart(product, 1);
      setCurrentAvailable(currentAvailable - 1);
      delayClick();
    }
  };

  const ReviewCard = (prop) => {
    const { rating, content, username } = prop.review;

    return (
      <div className="review-card">
        <div className="block">
          <img src={`/images/stars/${rating}.svg`}></img>
          <p>&quot; {content} &quot;</p>
          <p className="bold">- {username}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
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
          <div className="spacer"></div>( {currentAvailable} available )
          <div className="spacer"></div>
          {Auth.isLoggedIn() && Auth.isAdmin() ? (
            <button className="btn-edit" onClick={clickEdit}>
              {showEdit ? "X" : "Edit"}
            </button>
          ) : (
            <div className="button-container button-container-product">
              <button
                onClick={() => {
                  handleClaimItem();
                }}
                className="btn-1 add-cart-btn"
                style={{
                  transition: ".5s",
                  backgroundColor: addClicked
                    ? "var(--blue)"
                    : currentAvailable < 1
                    ? "var(--gray)"
                    : "var(--blackish)",
                  color: addClicked && "var(--blackish)",
                  cursor: currentAvailable < 1 && "default",
                }}
              >
                {addClicked
                  ? "Added to Cart!"
                  : currentAvailable < 1
                  ? "None Available"
                  : "Add to Cart"}
              </button>

              <ReviewForm />
            </div>
          )}
        </div>
      </section>

      {showEdit && (
        <>
          {Auth.isLoggedIn() ? (
            Auth.isAdmin() ? (
              <section style={{ backgroundColor: "var(--light-blue)" }}>
                <UpdateForm product={product} />
              </section>
            ) : null
          ) : null}
        </>
      )}

      {reviews.length ? (
        <>
          <div className="sub-banner"></div>
          <section className="review-section">
            <h2>Reviews</h2>
            <div className="review-grid">
              {reviews.map((review, index) => {
                return <ReviewCard review={review} key={index} />;
              })}
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}

export default ProductPage;
