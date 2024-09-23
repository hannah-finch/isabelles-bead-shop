import "../assets/css/admin.css";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "../utils/queries";
import { toDecimal } from "../utils/math";
import NewProductForm from "../components/forms/NewProductForm";

function AdminPage() {
  const { data } = useQuery(GET_All_PRODUCTS);
  //* return if you are not logged in, if you are the client, and if you are not admin
  if (!Auth.isLoggedIn() || Auth.isClient() || !Auth.isAdmin()) {
    return <h1>you are not authorized to view this page</h1>;
  }
  const { products } = data ? data : [];

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

            <Link to={`/product/${product._id}`} className="btn-3">
              View / Edit
            </Link>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <section className="admin-product-section">
        <NewProductForm />

        <div className="white-container">
          <h2>Products:</h2>
          {ProductList}
        </div>
      </section>
    </>
  );
}

export default AdminPage;
