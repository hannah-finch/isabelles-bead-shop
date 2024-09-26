import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "../utils/queries";
import { toDecimal } from "../utils/math";
import NewProductForm from "../components/forms/NewProductForm";
import UpdateForm from "../components/forms/UpdateForm.jsx";
import { GET_SINGLE_PRODUCT } from "../utils/queries.js";

function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const { data } = useQuery(GET_All_PRODUCTS);

  const [product, setProduct] = useState();

  //* return if you are not logged in, if you are the client, and if you are not admin
  if (!Auth.isLoggedIn() || Auth.isClient() || !Auth.isAdmin()) {
    return <h1>you are not authorized to view this page</h1>;
  }
  const { products } = data ? data : [];

  // I am sure there's a dryer way to write these, but I'm too tired to look up a reference
  const clickShowForm = () => {
    setShowProducts(false);
    setShowForm(true);
    setShowEdit(false);
  };

  const clickShowProducts = () => {
    setShowProducts(true);
    setShowForm(false);
    setShowEdit(false);
  };

  const clickEdit = (event) => {
    setProduct(event.target.id);
    setShowProducts(false);
    setShowForm(false);
    setShowEdit(true);
  };

  const ProductList = products.map((product, key) => {
    return (
      <>
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
          <div className="button-container-2">
            <Link to={`/product/${product._id}`} className="btn-4">
              View
            </Link>
            <button className="btn-4" id={product._id} onClick={clickEdit}>
              Edit
            </button>
          </div>
        </div>
      </>
    );
  });

  const UpdateSection = (props) => {
    const productId = props.product.product;

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

    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    return <UpdateForm product={product} />;
  };

  return (
    <>
      <section className="admin-page">
        <section className="admin-welcome-section">
          <h1>Hi Isabelle!</h1>
          <h2>What would you like to do?</h2>
          <div className="spacer"></div>

          <div className="button-container button-container-product">
            <button className="btn-big" onClick={clickShowForm}>
              + New Product
            </button>
            <button className="btn-big" onClick={clickShowProducts}>
              Product List
            </button>
            <Link
              to="https://dashboard.stripe.com/test/dashboard"
              target="_blank"
              className="btn-big"
            >
              View Orders
            </Link>
          </div>
        </section>

        <section>
          {showForm && <NewProductForm />}
          {showProducts && (
            <>
              <div className="white-container">
                <h2 className="text-center">Products:</h2>
                {ProductList}
              </div>
            </>
          )}
          {showEdit && <UpdateSection product={{ product }} />}
        </section>
      </section>
    </>
  );
}

export default AdminPage;
