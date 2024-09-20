import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "../utils/queries.js";
import { toDecimal } from "../utils/math.js";
import { useContext } from "react";
import Auth from "../utils/auth";

import { ShoppingCartContext } from "../utils/ProductsContext.jsx";

function ProductPage() {
  // get product id from url
  const { productId } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
  });

  const { addToCart } = useContext(ShoppingCartContext);

  const product = data ? data.singleProduct : [];
  const { id, category, description, image, quantity, price, name } = product;

  // just some fake review data to delete later --------------------
  const exampleReview = {
    name: "Reviewer Name",
    text: "1asldjf;jkla dofj aklsdjf alkjs dflkaj sdflkjasdklf jaslkdfj klasjdfl;ka sjd fkl;jasdfgsd fgsdfgsdfgsdfg sfgsdfgsdfg sdfgsdfgs fs gfsg ssdjkljk l;kasdjflkasj dflkja sdlkfj akljd klja sdfklj akljasdjfa;kjsd lkfja klsdfj akljsd fklaj sdflkja lskdf jakljsiajwkldjf lkjs dfklj",
    stars: 5,
  };
  // --------------------------------------------------------------

  const ReviewCard = (prop) => {
    const { stars, text, name } = prop.review;
    return (
      <div className="review-card">
        <div className="block">
          <img src={`/images/stars-${stars}.png`}></img>
          <p>&quot; {text} &quot;</p>
          <p className="bold">- {name}</p>
        </div>
      </div>
    );
  };

  const InStock = () => {
    if (quantity < 0) {
      return " OUT OF STOCK";
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

            <div className="button-container">
              <button className="btn-2" type="submit">
                Delete Product
              </button>
              <button className="btn-1" type="submit">
                Save Changes
              </button>
            </div>

            <div className="form-footer"></div>
          </form>
        </>
      );
    };

    return (
      <section className="admin-stuff-section">
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
          <img src={`../${image.Url}`} className="crop-img"></img>
        </figure>

        <div className="product-info">
          <h2>{name}</h2>
          <p>
            Price: <span className="price">${toDecimal(price)}</span>
            <InStock />
          </p>
          <p>{description}</p>
          {/* TODO: Make a dropdown or arrow selection thing to select quantity to add to cart */}
          {/* This quantity is number to add to cart, not number in stock */}
          <p>Quantity:</p>

          <div className="button-container">
            <button onClick={() => addToCart(product)} className="btn-1">
              Add to Cart
            </button>
            <button className="btn-2">Leave a Review</button>
          </div>
        </div>
      </section>

      <div className="sub-banner"></div>

      <section className="review-section">
        <h2>Reviews</h2>
        <div className="review-grid">
          {/* map through reviews and pass in info to make one card per review */}
          <ReviewCard review={exampleReview} />
        </div>
      </section>

      {Auth.isLoggedIn() ? Auth.isAdmin() ? <AdminStuff /> : null : null}
    </>
  );
}

export default ProductPage;
