// refactor/stockTest

import { useState } from "react";
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
  const [DeleteProduct] = useMutation(DELETE_PRODUCT);

  const { addToCart } = useContext(ShoppingCartContext);
  const [addClicked, setAddClicked] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const product = data ? data.singleProduct : [];
  console.log(product);
  const { id, category, description, imageURL, stock, price, name, reviews } =
    product;

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
    return <h1>Loading</h1>;
  }
  return (
    <>
      <section className="product-section">
        <figure className="product-img">
          <img src={imageURL} className="crop-img"></img>
        </figure>

        <div className="product-info">
          <h2>
            {name}
          </h2>

          <p>
            Price: <span className="price">${toDecimal(price)}</span>
          </p>
          <p>{description}</p>
          <div className="spacer"></div>

          {Auth.isLoggedIn() ? (
            Auth.isAdmin() ? (
              <>
                <div className="spacer"></div>
                <button className="btn-3" onClick={clickEdit}>
                  {showEdit ? "Cancel Edit" : "Edit Product"}
                </button>
                {!showConfirm && (
                  <button className="btn-2" onClick={clickConfirm}>
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
                      <button className="btn-1" onClick={deleteItem}>
                        Yes, Delete Product
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : null
          ) : (
            <div className="button-container">
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
              <div className="like-btn-2 ">
                <p id="quantity">
                  1
                </p>
              </div>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-0 px-2 rounded-full"
                onClick={() => {
                  const quantityElement = document.getElementById("quantity");
                  let quantity = parseInt(quantityElement.innerText);
                  quantity = Math.min(quantity + 1, stock);
                  quantityElement.innerText = quantity;
                }}
              >
                +
              </button>

              {stock < 0 ? (
                <p className="bold">OUT OF STOCK</p>
              ) : (
                <button
                  onClick={() => {
                    addToCart(
                      product,
                      parseInt(document.getElementById("stock").innerText)
                    );
                    document.getElementById("stock").innerText = 1;
                    delayClick();
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
              <section className="admin-stuff-section">
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
              {/* map through reviews and pass in info to make one card per review */}
              {reviews.map((review, index) => {
                return <ReviewCard review={review} key={index} />;
              })}
            </div>
          </section>
        </>
      ) : null}

      {/* {Auth.isLoggedIn() ? (
        Auth.isAdmin() ? (
          <section className="admin-stuff-section">
            <UpdateForm product={product} />
          </section>
        ) : null
      ) : null} */}
    </>
  );
}

export default ProductPage;
