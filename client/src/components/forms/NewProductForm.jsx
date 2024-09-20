import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../utils/mutations";

function NewProductForm() {
  const [addProduct] = useMutation(ADD_PRODUCT);
  // TODO SEND INT TO DATABASE
  const [formState, setFormState] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    quantity: 1,
    image: undefined,
    imageName: undefined,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if the value is suppose to be an int, make it an int
    switch (name) {
      case "price":
        setFormState({
          ...formState,
          [name]: +value,
        });
        break;
      case "quantity":
        setFormState({
          ...formState,
          [name]: +value,
        });
        break;
      default:
        setFormState({
          ...formState,
          [name]: value,
        });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { name, price, category, description, quantity } = formState;
    console.log(formState);
    try {
      const { data } = addProduct({
        variables: { name, price, category, description, quantity },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

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
        {/* //TODO FORCE THIS INTO DECIMAL AND MAKE FUNCTION TO CONVERT INTO DATABASE SHTUFF */}
        <input
          value={formState.price}
          name="price"
          onChange={handleInputChange}
          type="number"
          placeholder="Price"
          min="0"
        ></input>
        <input
          value={formState.quantity}
          name="quantity"
          onChange={handleInputChange}
          type="number"
          min="0"
          placeholder="Stock"
        ></input>
        {/* //TODO MAKE this a dropdown to limit CATEGORIES */}
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
}

export default NewProductForm;
