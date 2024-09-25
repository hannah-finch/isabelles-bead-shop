import "../assets/css/admin.css";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "../utils/queries";
import { toDecimal } from "../utils/math";
import NewProductForm from "../components/forms/NewProductForm";

function AdminPage() {
  const { data } = useQuery(GET_All_PRODUCTS);
  const scrollPoint = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  //* return if you are not logged in, if you are the client, and if you are not admin
  if (!Auth.isLoggedIn() || Auth.isClient() || !Auth.isAdmin()) {
    return <h1>you are not authorized to view this page</h1>;
  }
  const { products } = data ? data : [];

  const scrollToPoint = () => {
    if (setShowProducts || setShowForm) {
      scrollPoint.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const clickShowForm = () => {
    setShowProducts(false);
    setShowForm(!showForm);
    // !showForm ? scrollToPoint() : null;
  };

  const clickShowProducts = () => {
    setShowForm(false);
    setShowProducts(!showProducts);
    // !showProducts ? scrollToPoint() : null;
  };

  const ProductList = products.map((product, key) => {
    return (
      <div className="product-admin" key={key}>
        <figure className="product-img-admin">
          <img src={product.imageURL}></img>
        </figure>
        <div className="item-text-box-admin">
          <p>
            <span className="bold">Name: </span>
            {product.name}
          </p>
          <p>
            <span className="bold">Price: </span>${toDecimal(product.price)}
          </p>
          <p>
            <span className="bold">Category: </span>
            {product.category}
          </p>
          <p>
            <span className="bold">Number in stock: </span>
            {product.stock}
          </p>


        </div>
        <Link to={`/product/${product._id}`} className="btn-3">
            View / Edit
          </Link>
      </div>
    );
  });

  return (
    <>
    <section className="admin-page">
      <section  className="admin-welcome-section">
        <h1>Hi Isabelle!</h1>

        <h2>What would you like to do?</h2>

        <div className="spacer"></div>
        <div className="button-container">
          <button className="btn-big" onClick={clickShowForm}>
            + New Product
          </button>
          <button className="btn-big" onClick={clickShowProducts}>
            Edit Products
          </button>
          <button className="btn-big">View Orders</button>
          <button className="btn-big" onClick={clickShowProducts}>
            Edit Products
          </button>
        </div>
        {/* <img src="/images/icons/cluster-1.svg"></img> */}
      </section>

      {/* <div ref={scrollPoint}></div> */}

      {(showForm || showProducts) && (
        <section ref={scrollPoint} className="admin-stuff-section">
          {showForm && <NewProductForm />}
          {showProducts && (
            <>
              <div className="white-container">
                <h2>Products:</h2>
                {ProductList}
              </div>
            </>
          )}
        </section>
      )}


      {/* {showProducts && (
        <section className="admin-stuff-section">
          <div className="white-container">
            <h2>Products:</h2>
            {ProductList}
          </div>
        </section>
      )} */}
      </section>
    </>
  );
}

export default AdminPage;
