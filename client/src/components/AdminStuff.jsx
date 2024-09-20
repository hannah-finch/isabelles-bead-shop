import { useState } from 'react'

function AdminStuff (prop) {
  const { _id, description, category, image, name, price, quantity } = prop.product;
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

export default AdminStuff;