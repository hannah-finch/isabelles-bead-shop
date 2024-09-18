import { useState } from "react";

function AdminPage() {
  const NewProductForm = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImgae] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageDescription, setImageDescription] = useState("");

    function handleFormSubmit() {

    }

    return (
      <>
      <h2>Form to add new product</h2>
        <form onSubmit={handleFormSubmit}>
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

          <button className="btn-2" type="submit">
            Submit
          </button>
          <br />
        </form>
      </>
    );
  };
  
  return (
    <>
      <h2>Admin page</h2>
      <NewProductForm />
    </>
  );
}

export default AdminPage;
