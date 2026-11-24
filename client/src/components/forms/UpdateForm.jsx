import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { DELETE_PRODUCT } from "../../utils/mutations.js";

import { IntToCurrency, currencyToInt } from "../../utils/math.js";

function UpdateForm(prop) {
  const [UpdateProduct] = useMutation(UPDATE_PRODUCT);
  const [DeleteProduct] = useMutation(DELETE_PRODUCT);
  const { _id, description, category, image, imageURL, name, price, stock } =
    prop.product;
  const [endSale, setEndSale] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const initialValues = {
    id: _id,
    name: name,
    price: IntToCurrency(price / 100),
    category: category,
    description: description,
    stock: stock,
    featured: prop.product.featured ?? false,
    image: image,
  };
  
  const [formState, setFormState] = useState(initialValues);

  const clickConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const deleteItem = async (event) => {
    event.preventDefault;
    try {
      const { data } = await DeleteProduct({
        variables: { id: _id },
      });
      if (data.deleteProduct) {
        location.pathname === "/admin"
          ? window.location.reload()
          : window.location.assign("/");
      }
    } catch (error) {
      console.log(error);
    }
    setShowConfirm(false);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormState({ ...formState, [name]: checked });
      return;
    }
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
    const { name, price, category, description, stock, image } = formState;
    try {
      const { data } = await UpdateProduct({
        variables: {
          endSale,
          id: _id,
          featured: formState.featured,
          name,
          price: currencyToInt(price),
          category,
          description,
          stock,
          image,
        },
      });

      if (data != null) {
        window.location.reload();
      }
    } catch (err) {
      setSaveError("Could not save this product. Please try again.");
    }
  };

  console.log(imageURL);
  return (
    <>
      <form onSubmit={handleFormSubmit} id="UpdateForm">
        <h2>Edit product</h2>

        <figure className="product-img-admin center">
          <img
            src={imageURL}
            alt={name}
            className="crop-img"
          ></img>
        </figure>

        <label htmlFor="name">Name:</label>
        <input
          value={formState.name}
          name="name"
          onChange={handleInputChange}
          type="text"
          placeholder="Product name"
        ></input>
        <label htmlFor="price">Price:</label>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <p style={{ alignSelf: "baseline" }}>$ &nbsp;</p>
          <input
            style={{ width: "100%" }}
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
        </div>
        <div className="product-help">Lower the price to show the original price and sale price automatically.</div>
        {prop.product.originalPrice > price && (
          <label className="product-option">
            <input type="checkbox" checked={endSale} onChange={(event) => setEndSale(event.target.checked)} />
            End sale and restore ${ (prop.product.originalPrice / 100).toFixed(2) }
          </label>
        )}
        {saveError && <div role="alert">{saveError}</div>}
        <label className="product-option">
          <input type="checkbox" name="featured" checked={formState.featured} onChange={handleInputChange} />
          Feature this product on the homepage
        </label>
        <label htmlFor="stock">Number in stock:</label>
        <input
          value={formState.stock}
          name="stock"
          onChange={handleInputChange}
          type="number"
          min="0"
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
          <option value="keychain">keychain</option>
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

      </form>
      <div className="form-footer center">
        <div className="button-container">
          {!showConfirm && (
            <>
              <button className="btn-del" onClick={clickConfirm}>
                Delete
              </button>
              <button className="btn-2" onClick={() => window.location.reload()}>
                Cancel
              </button>
              <button className="btn-1" type="submit" form="UpdateForm">
                Save Changes
              </button>
            </>
          )}
          {showConfirm && (
            <>
              <p>Are you sure? This can&apos;t be undone</p>
              <div className="button-container">
                <button className="btn-2" onClick={clickConfirm}>
                  Never mind
                </button>
                <button className="btn-del" onClick={deleteItem}>
                  Yes, Delete Product
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateForm;
