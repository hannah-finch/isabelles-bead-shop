import "../assets/css/admin.css";
import { useState } from "react";
import exampleData from "../assets/example-data.json";

function AdminPage() {
  const ProductList = exampleData.products.map((product) => {
    console.log(product.name);
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
              {product.price}
            </p>
            <p>
              <span className="bold">Category: </span>
              {product.category}
            </p>
            <p>
              <span className="bold">Number in stock: </span>
              {product.quantity}
            </p>
            <button className="btn-1">Edit product</button>
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
    const [image, setImgae] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageDescription, setImageDescription] = useState("");

    function handleFormSubmit() {}

    return (
      <>
        <form onSubmit={handleFormSubmit} className="new-product-form">
          <h2>Add new product</h2>
          <input
            value={name}
            name="name"
            type="text"
            placeholder="Product name"
          ></input>
          <input
            value={price}
            name="price"
            type="text"
            placeholder="Price"
          ></input>
          <input
            // value={quantity}
            name="quantity"
            type="number"
            min="0"
            placeholder="Stock"
          ></input>
          <input
            value={category}
            name="category"
            type="text"
            placeholder="Category"
          ></input>
          <textarea
            value={description}
            name="description"
            type="text"
            placeholder="Description"
          ></textarea>
          <input value={image} name="image" type="file"></input>
          <input
            value={imageName}
            name="category"
            type="text"
            placeholder="Image title"
          ></input>
          <input
            value={imageDescription}
            name="imageDescription"
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
