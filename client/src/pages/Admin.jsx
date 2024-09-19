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
              <span className="bold">Price: </span>
              ${toDecimal(product.price)}
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
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageDescription, setImageDescription] = useState("");

    const handleInputChange = (e) => {
      // Getting the value and name of the input which triggered the change
      const { target } = e;
      const inputType = target.name;
      const inputValue = target.value;

      // set the state based on input type
      switch (inputType) {
        case "name":
          setName(inputValue);
          break;
        case "price":
          setPrice(inputValue);
          break;
        case "category":
          setCategory(inputValue);
          break;
        case "description":
          setDescription(inputValue);
          break;
        case "quantity":
          setQuantity(inputValue);
          break;
        case "image":
          setImage(inputValue);
          break;
        case "imageName":
          setImageName(inputValue);
          break;
        case "imageDescription":
          setImageDescription(inputValue);
          break;
      }
    };

    function handleFormSubmit() {}

    return (
      <>
        <form onSubmit={handleFormSubmit} className="new-product-form">
          <h2>Add new product</h2>
          <input
            value={name}
            name="name"
            onChange={handleInputChange}
            type="text"
            placeholder="Product name"
          ></input>
          <input
            value={price}
            name="price"
            onChange={handleInputChange}
            type="number"
            placeholder="Price"
          ></input>
          <input
            value={quantity}
            name="quantity"
            onChange={handleInputChange}
            type="number"
            min="0"
            placeholder="Stock"
          ></input>
          <input
            value={category}
            name="category"
            onChange={handleInputChange}
            type="text"
            placeholder="Category"
          ></input>
          <textarea
            value={description}
            name="description"
            onChange={handleInputChange}
            type="text"
            placeholder="Description"
          ></textarea>
          <input
            value={image}
            name="image"
            onChange={handleInputChange}
            type="file"
          ></input>
          <input
            value={imageName}
            name="imageName"
            onChange={handleInputChange}
            type="text"
            placeholder="Image title"
          ></input>
          <input
            value={imageDescription}
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
