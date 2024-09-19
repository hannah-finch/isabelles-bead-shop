import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "../utils/queries.js";
import { toDecimal } from "../utils/math.js";
import { useContext } from "react";


import { ShoppingCartContext } from '../utils/ProductsContext.jsx'

function ProductPage() {
  // get product id from url
  const { productId } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
  });

  const { addToCart } = useContext(ShoppingCartContext);

  const product = data ? data.singleProduct : [];
  const { id, category, description, image, quantity, price, name } = product;

  const InStock = () => {
    if (quantity < 0) {
      return "OUT OF STOCK";
    } else {
      return;
    }
  };

  const AdminStuff = () => {
    const UpdateForm = () => {
      const [newName, setName] = useState(name);
      const [newPrice, setPrice] = useState(price);
      const [newCategory, setCategory] = useState(category);
      const [newDescription, setDescription] = useState(description);
      const [newQuantity, setQuantity] = useState(quantity);
      const [newImage, setImage] = useState(image.URL);
      const [newImageName, setImageName] = useState(image.name);
      const [newImageDescription, setImageDescription] = useState(
        image.description
      );

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

      return (
        <>
          <form onSubmit={""}> 
            {/* TODO: needs a function */}
            <h2>Edit product</h2>
            <label htmlFor="name">Name:</label>
            <input
              value={newName}
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="Product name"
            ></input>
            <label htmlFor="price">Price:</label>
            <input
              value={newPrice}
              name="price"
              onChange={handleInputChange}
              type="number"
              placeholder="Price"
            ></input>
            <label htmlFor="quantity">Number in stock:</label>
            <input
              value={newQuantity}
              name="quantity"
              onChange={handleInputChange}
              type="number"
              min="0"
              placeholder="Stock"
            ></input>
            <label htmlFor="category">Category:</label>
            <input
              value={newCategory}
              name="category"
              onChange={handleInputChange}
              type="text"
              placeholder="Category"
            ></input>
            <label htmlFor="description">Description:</label>
            <textarea
              value={newDescription}
              name="description"
              onChange={handleInputChange}
              type="text"
              placeholder="Description"
            ></textarea>
            <label htmlFor="image">Image:</label>
            <input
              value={newImage}
              name="image"
              onChange={handleInputChange}
              type="file"
            ></input>
            <label htmlFor="imageName">Image title:</label>
            <input
              value={newImageName}
              name="imageName"
              onChange={handleInputChange}
              type="text"
              placeholder="Image title"
            ></input>
            <label htmlFor="imageDescription">Image Caption:</label>
            <input
              value={newImageDescription}
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
      <section>
        Number in stock: {quantity} <br></br>
        Product id: {productId} <br></br>
        <button className="btn-1" onClick={""}>
          Edit Product
        </button>
        <button className="btn-1" onClick={""}>
          Delete Product
        </button>
        <UpdateForm />
      </section>
    );
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <section className="product-section">
        <figure className="product-img">
          <img src={`../${image.Url}`}></img>
        </figure>

        <div className="product-info">
          <h2>{name}</h2>
          <p>
            Price: <span className="price">${toDecimal(price)}</span>{" "}
            <InStock />{" "}
          </p>
          <p>{description}</p>
          {/* TODO: Make a dropdown or arrow selection thing to select quantity to add to cart */}
          <p>Quantity:{quantity}</p>

          <div className="button-container">
            <button onClick={() => addToCart(product)} className="btn-1">Add to Cart</button>
            <button className="btn-2">Leave a Review</button>
          </div>
        </div>
      </section>

      <AdminStuff />
    </>
  );
}

export default ProductPage;
