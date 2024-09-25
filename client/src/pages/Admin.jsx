import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "../utils/queries";
import { toDecimal } from "../utils/math";
import NewProductForm from "../components/forms/NewProductForm";
import EditButton from "../components/EditButton.jsx";
import UpdateForm from "../components/forms/UpdateForm.jsx";

function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const { data } = useQuery(GET_All_PRODUCTS);

  const [product, setProduct] = useState()
  //* return if you are not logged in, if you are the client, and if you are not admin
  if (!Auth.isLoggedIn() || Auth.isClient() || !Auth.isAdmin()) {
    return <h1>you are not authorized to view this page</h1>;
  }
  const { products } = data ? data : [];

  const clickShowForm = () => {
    setShowProducts(false);
    setShowForm(true);
    setShowEdit(false)
  };

  const clickShowProducts = () => {
    setShowProducts(true);
    setShowForm(false);
    setShowEdit(false)
  };

  const clickShowEdit = () => {
    setShowProducts(false);
    setShowForm(false);
    setShowEdit(true)
  }

  // const buttonTest = document.querySelectorAll(".edit-btn")
  // console.log(buttonTest)

  // buttonTest.map((elem) => elem.addEventListener("click", clickShowEdit))

  // const clickShowProducts = () => {
  //   setShowForm(false);
  //   setShowProducts(!showProducts);
  // };
  const clickEdit = (event) => {
    console.log(event.target.id)
    setProduct(event.target.id)
    setShowProducts(false);
    setShowForm(false);
    setShowEdit(true)
  }

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
            <button id={product._id} onClick={clickEdit}>TESTER</button>
            {/* <EditButton productId={product._id} /> */}
          </div>
        </div>
      </>
    );
  });

  const UpdateSection = (props) => {
    if (props) {
      console.log(props)
      return(
        <EditButton productId={props.product.product}/>
      )
    }

  }



  return (
    <>
      <section className="admin-page">
        <section className="admin-welcome-section">
          <h1>Hi Isabelle!</h1>

          <h2>What would you like to do?</h2>

          <div className="spacer"></div>
          <div className="button-container">
            <button className="btn-big" onClick={clickShowForm}>
              + New Product
            </button>
            <button className="btn-big" onClick={clickShowProducts}>
              Product List
            </button>
            {/* <button className="btn-big" onClick={clickShowProducts}>
              Edit Products
            </button> */}
            <Link
              to="https://dashboard.stripe.com/test/dashboard"
              className="btn-big"
            >
              View Orders
            </Link>
          </div>
        </section>

        {/* <section>
          <UpdateForm product={product}/>
        </section> */}
        {showEdit && <UpdateSection product={{product}}/>}



        {(showForm || showProducts) && (
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
          </section>
        )}
      </section>
    </>
  );
}

export default AdminPage;
