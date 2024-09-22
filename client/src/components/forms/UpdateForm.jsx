import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT, DELETE_PRODUCT } from "../../utils/mutations";

function UpdateForm(prop) {
  const [UpdateProduct] = useMutation(UPDATE_PRODUCT);
  const [DeleteProduct] = useMutation(DELETE_PRODUCT);
  const { description, category, image, name, price, quantity } = prop.product;
  const { productId } = useParams();

  const [formState, setFormState] = useState({
    id: productId,
    name: name,
    price: price,
    category: category,
    description: description,
    quantity: quantity,
    image: image,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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

  //TODO FINISH FUNCTION
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);
    // const { name, price, description, image, category, quantity } = formState;
    try {
      const { data } = await UpdateProduct({
        variables: formState,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteItem = async (event) => {
    event.preventDefault;
    try {
      const { data } = await DeleteProduct({
        variables: { id: productId },
      });
      if (data.deleteProduct) {
        window.location.assign("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2>Edit product</h2>
        <label htmlFor="productId">Product ID:(editing disabled)</label>
        <input
          value={formState._id}
          onChange={handleInputChange}
          type="text"
          placeholder="Product name"
          disabled
        ></input>
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
        <label htmlFor="image">Image:(editing disabled)</label>
        <input
          value={formState.image}
          name="image"
          onChange={handleInputChange}
          type="text"
          disabled
        ></input>

        <div className="button-container">
          <button className="btn-2" onClick={deleteItem}>
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
