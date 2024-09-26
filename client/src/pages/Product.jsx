// refactor/stockTest

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "../utils/queries.js";
import { DELETE_PRODUCT } from "../utils/mutations.js";
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
  const [DeleteProduct] = useMutation(DELETE_PRODUCT);
  const { addToCart, cartItems } = useContext(ShoppingCartContext);
  const [addClicked, setAddClicked] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentAvailable, setCurrentAvailable] = useState(stock);
  const [quantityToAdd, setQuantityToAdd] = useState(1);

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

  const clickConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const handleIncrement = () => {
    if (quantityToAdd < currentAvailable) {
      setQuantityToAdd(quantityToAdd + 1);
    }
  };

  const handleDecrement = () => {
    if (quantityToAdd > 1) {
      setQuantityToAdd(quantityToAdd - 1);
    }
  };

  // add product to cart
  // update available stock
  // reset quantity to add
  const handleAddToCart = () => {
    addToCart(product, parseInt(quantityToAdd, 10));
    setCurrentAvailable(currentAvailable - quantityToAdd);
    setQuantityToAdd(1);
    delayClick();
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

  const deleteItem = async (event) => {
    event.preventDefault;
    try {
      const { data } = await DeleteProduct({
        variables: { id: productId },
      });
      if (data.deleteProduct) {
        window.location.assign("/");
      }
    } catch (error) {
      console.log(error);
    }
    setShowConfirm(false);
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
          <div className="spacer"></div>

          {Auth.isLoggedIn() && Auth.isAdmin() ? (
            <>
              <div className="spacer"></div>
              <button className="btn-3" onClick={clickEdit}>
                {showEdit ? "Cancel Edit" : "Edit Product"}
              </button>
              {!showConfirm && (
                <button className="btn-del" onClick={clickConfirm}>
                  Delete Product
                </button>
              )}

              {showConfirm && (
                <>
                  <p>Are you sure? This can&apos;t be undone</p>
                  <div className="button-container">
                    <button className="btn-2" onClick={clickConfirm}>
                      Never mind
                    </button>
                    <button className="btn-del" onClick={deleteItem}>
                      Yes, Delete Product
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="button-container">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-0 px-2  rounded-full"
                onClick={() => {
                  handleDecrement();
                }}
              >
                -
              </button>

              {stock > 0 ? (
                <div className="like-btn-2 ">
                  <p id="quantity">{quantityToAdd}</p>
                </div>
              ) : (
                <p className="bold">OUT OF STOCK</p>
              )}

              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-0 px-2 rounded-full"
                onClick={() => {
                  handleIncrement();
                }}
              >
                +
              </button>

              {currentAvailable <= 0 ? (
                <p className="bold">NO MORE AVAIABLE</p>
              ) : (
                <button
                  onClick={() => {
                    handleAddToCart();
                  }}
                  className="btn-1 add-cart-btn"
                  style={{
                    transition: ".5s",
                    backgroundColor: addClicked
                      ? "var(--blue)"
                      : "var(--blackish)",
                  }}
                >
                  {addClicked ? "Added to Cart!" : "Add to Cart"}
                </button>
              )}

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
