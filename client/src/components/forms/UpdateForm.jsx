import { useState } from "react";

function UpdateForm(prop) {
  const { description, category, image, name, price, quantity } = prop.product;

  const [formState, setFormState] = useState({
    name: name,
    price: price,
    category: category,
    description: description,
    quantity: quantity,
    image: image.URL,
    imageName: image.name,
    imageDescription: image.description,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //TODO FINISH FUNCTION
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2>Edit product</h2>
        <label htmlFor="name">Name:</label>
        <input
          value={formState.name}
          name="name"
          onChange={handleInputChange}
          type="text"
          placeholder="Product name"
        ></input>
        <label htmlFor="price">Price:</label>
        <input
          value={formState.price}
          name="price"
          onChange={handleInputChange}
          type="number"
          placeholder="Price"
        ></input>
        <label htmlFor="quantity">Number in stock:</label>
        <input
          value={formState.quantity}
          name="quantity"
          onChange={handleInputChange}
          type="number"
          min="0"
          placeholder="Stock"
        ></input>
        <label htmlFor="category">Category:</label>
        <input
          value={formState.category}
          name="category"
          onChange={handleInputChange}
          type="text"
          placeholder="Category"
        ></input>
        <label htmlFor="description">Description:</label>
        <textarea
          value={formState.description}
          name="description"
          onChange={handleInputChange}
          type="text"
          placeholder="Description"
        ></textarea>
        <label htmlFor="image">Image:</label>
        <input
          value={formState.image}
          name="image"
          onChange={handleInputChange}
          type="file"
        ></input>
        <label htmlFor="imageName">Image title:</label>
        <input
          value={formState.imageName}
          name="imageName"
          onChange={handleInputChange}
          type="text"
          placeholder="Image title"
        ></input>
        <label htmlFor="imageDescription">Image Caption:</label>
        <input
          value={formState.imageDescription}
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
}

export default UpdateForm;
