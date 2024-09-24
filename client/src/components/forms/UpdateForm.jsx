import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { IntToCurrency, currencyToInt } from "../../utils/math.js";

function UpdateForm(prop) {
  const [UpdateProduct] = useMutation(UPDATE_PRODUCT);
  const { description, category, image, name, price, stock } = prop.product;
  const { productId } = useParams();

  const [formState, setFormState] = useState({
    id: productId,
    name: name,
    price: IntToCurrency(price / 100),
    category: category,
    description: description,
    stock: stock,
    image: image,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "price":
        setFormState({
          ...formState,
          [name]: value,
        });
        break;
      case "stock":
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

  //TODO This function runs when you click the upload button when the page is first loaded
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    const { name, price, category, description, stock, image } = formState;
    try {
      const { data } = await UpdateProduct({
        variables: {
          id: productId,
          name,
          price: currencyToInt(price),
          category,
          description,
          stock,
          image,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  function revertEdit() {
    setFormState({
      id: productId,
      name: name,
      price: price,
      category: category,
      description: description,
      stock: stock,
      image: image,
    });
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} id="UpdateForm">
        <h2>Edit product</h2>

        <label htmlFor="productId">Product ID: (editing disabled)</label>
        <input
          value={formState.id}
          onChange={handleInputChange}
          type="text"
          placeholder="Product id"
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
          onBlur={(event) => {
            const { value } = event.target;
            setFormState({ ...formState, price: IntToCurrency(value) });
          }}
          type="text"
          placeholder="Price"
        ></input>
        <label htmlFor="stock">Number in stock:</label>
        <input
          value={formState.stock}
          name="stock"
          onChange={handleInputChange}
          type="number"
          min="0"
          placeholder="Stock"
        ></input>
        <label htmlFor="category">Category:</label>
        <select
          value={formState.category}
          name="category"
          onChange={handleInputChange}
        >
          <option value="bracelet">bracelet</option>
          <option value="earring">earring</option>
          <option value="fidget">fidget</option>
          <option value="keychain">key chain</option>
          <option value="necklace">necklace</option>
          <option value="trinket">trinket</option>
          <option value="other">other</option>
        </select>
        <label htmlFor="description">Description:</label>
        <textarea
          value={formState.description}
          name="description"
          onChange={handleInputChange}
          type="text"
          placeholder="Description"
        ></textarea>
        <label htmlFor="image">Image: (editing disabled)</label>
        <input
          value={formState.image}
          name="image"
          onChange={handleInputChange}
          type="text"
          disabled
        ></input>
      </form>
      <div className="form-footer center">
        <div className="button-container">
          <button className="btn-2" onClick={revertEdit}>
            Revert
          </button>
          <button className="btn-1" type="submit" form="UpdateForm">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateForm;
