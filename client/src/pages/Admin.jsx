import "../assets/css/admin.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// import exampleData from "../assets/example-data.json";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "../utils/queries";
import { toDecimal } from "../utils/math";

function AdminPage() {
  const { data } = useQuery(GET_All_PRODUCTS);
  //* return if you are not logged in, if you are the client, and if you are not admin
  if (!Auth.isLoggedIn() || Auth.isClient() || !Auth.isAdmin()) {
    return <h1>you are not authorized to view this page</h1>;
  }

  const { products } = data ? data : [];
  console.log(products);

  const ProductList = products.map((product) => {
    return (
      <>
        <div className="product-admin">
          <figure className="product-img-admin">
            <img src="images/tempPictures/defaultProductImage.jpg"></img>
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
              {product.quantity}
            </p>

            <Link to="/product/PUT-PRODUCT_ID_HERE" className="btn-3">
              View / Edit
            </Link>
          </div>
        </div>
      </>
    );
  });

  const NewProductForm = () => {
    const [formState, setFormState] = useState({
      name: "",
      price: "",
      category: "",
      description: "",
      quantity: "",
      image: "",
      imageName: "",
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setFormState({
        ...formState,
        [name]: value,
      });
    };

    function handleFormSubmit() {}

    return (
      <>
        <form onSubmit={handleFormSubmit} className="new-product-form">
          <h2>Add new product</h2>
          <input
            value={formState.name}
            name="name"
            onChange={handleInputChange}
            type="text"
            placeholder="Product name"
          ></input>
          <input
            value={formState.price}
            name="price"
            onChange={handleInputChange}
            type="number"
            placeholder="Price"
          ></input>
          <input
            value={formState.quantity}
            name="quantity"
            onChange={handleInputChange}
            type="number"
            min="0"
            placeholder="Stock"
          ></input>
          <input
            value={formState.category}
            name="category"
            onChange={handleInputChange}
            type="text"
            placeholder="Category"
          ></input>
          <textarea
            value={formState.description}
            name="description"
            onChange={handleInputChange}
            type="text"
            placeholder="Description"
          ></textarea>
          <input
            value={formState.image}
            name="image"
            onChange={handleInputChange}
            type="file"
          ></input>
          <input
            value={formState.imageName}
            name="imageName"
            onChange={handleInputChange}
            type="text"
            placeholder="Image title"
          ></input>
          <input
            value={formState.imageDescription}
            name="imageDescription"
            onChange={handleInputChange}
            type="text"
            placeholder="Image caption"
          ></input>

          <button className="btn-1" type="submit">
            Submit
          </button>

          <div className="form-footer"></div>
        </form>
      </>
    );
  };

  return (
    <>
      <section className="admin-product-section">
        <NewProductForm />

        <div className="white-container">
          <h2>Products:</h2>
          {ProductList}
        </div>
      </section>

      {/* <NewProductForm />
      <UpdateProductForm /> */}
    </>
  );
}

export default AdminPage;
