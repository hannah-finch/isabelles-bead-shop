import { useState } from "react";
import exampleData from "../assets/example-data.json"

function AdminPage() {
  const ProductList = (exampleData.products.map((product) => {
    console.log(product.name)
    return(
      <>
        <div className="cart-item">
          <figure className="product-img-cart">
            <img src="images/tempPictures/defaultProductImage.jpg"></img>
          </figure>
          <div className="item-text-box">
            <p><span className="bold">Name: </span>
              {product.name}
            </p>
            <p><span className="bold">Price: </span>
              {product.description}
            </p>
            <p><span className="bold">Category: </span>
              {product.description}
            </p>
            <p><span className="bold">Description: </span>
              {product.description}
            </p>
            <p><span className="bold">Image Title: </span>
              {product.description}
            </p>
            <p><span className="bold">Image Caption: </span>
              {product.description}
            </p>
            <p><span className="bold">Number in stock: </span>
              {product.quantity}
            </p>
          </div>
          <button className="btn-del">x</button>
        </div>
      </>
    )
  }))

  // const NewProductForm = () => {

  //   const [name, setName] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [quantity, setQuantity] = useState("");
  //   const [image, setImgae] = useState("");
  //   const [imageName, setImageName] = useState("");
  //   const [imageDescription, setImageDescription] = useState("");

  //   function handleFormSubmit() {

  //   }

  //   return (
  //     <>
  //     <h2>Form to add new product</h2>
  //       <form onSubmit={handleFormSubmit}>
  //         <input
  //           value={name}
  //           name="name"
  //           type="text"
  //           placeholder="Product name"
  //         ></input>
  //         <input
  //           value={price}
  //           name="price"
  //           type="text"
  //           placeholder="Price"
  //         ></input>
  //         <input
  //           // value={quantity}
  //           name="quantity"
  //           type="number"
  //           min="0"
  //           placeholder="Stock"
  //         ></input>
  //         <input
  //           value={category}
  //           name="category"
  //           type="text"
  //           placeholder="Category"
  //         ></input>
  //         <textarea
  //           value={description}
  //           name="description"
  //           type="text"
  //           placeholder="Description"
  //         ></textarea>
  //         <input value={image} name="image" type="file"></input>
  //         <input
  //           value={imageName}
  //           name="category"
  //           type="text"
  //           placeholder="Image title"
  //         ></input>
  //         <input
  //           value={imageDescription}
  //           name="imageDescription"
  //           type="text"
  //           placeholder="Image caption"
  //         ></input>

  //         <button className="btn-2" type="submit">
  //           Submit
  //         </button>
  //         <br />
  //       </form>
  //     </>
  //   );
  // };

  // const UpdateProductForm = () => {
  //   // ideas.... 

  //   const [name, setName] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [quantity, setQuantity] = useState("");
  //   const [image, setImgae] = useState("");
  //   const [imageName, setImageName] = useState("");
  //   const [imageDescription, setImageDescription] = useState("");

  //   function handleFormSubmit() {

  //   }

  //   return (
  //     <>
  //     <h2>Form to update product</h2>
  //       <form onSubmit={handleFormSubmit}>
  //         <input
  //           value={name}
  //           name="name"
  //           type="text"
  //           placeholder="Product name"
  //         ></input>
  //         <input
  //           value={price}
  //           name="price"
  //           type="text"
  //           placeholder="Price"
  //         ></input>
  //         <input
  //           // value={quantity}
  //           name="quantity"
  //           type="number"
  //           min="0"
  //           placeholder="Stock"
  //         ></input>
  //         <input
  //           value={category}
  //           name="category"
  //           type="text"
  //           placeholder="Category"
  //         ></input>
  //         <textarea
  //           value={description}
  //           name="description"
  //           type="text"
  //           placeholder="Description"
  //         ></textarea>
  //         <input value={image} name="image" type="file"></input>
  //         <input
  //           value={imageName}
  //           name="category"
  //           type="text"
  //           placeholder="Image title"
  //         ></input>
  //         <input
  //           value={imageDescription}
  //           name="imageDescription"
  //           type="text"
  //           placeholder="Image caption"
  //         ></input>

  //         <button className="btn-2" type="submit">
  //           Submit
  //         </button>
  //         <br />
  //       </form>
  //     </>
  //   );
  // };

  // const UpdateProduct = (e) => {
  //   // this'll be a function that takes the product id of the button clicked to populate the data in updateProductForm...and un hides the form
  // }

  return (
    <>
      <h2>Admin page</h2>
      <h2>Products:</h2>
      {ProductList}
      
      {/* <NewProductForm />
      <UpdateProductForm /> */}
    </>
  );
}

export default AdminPage;
