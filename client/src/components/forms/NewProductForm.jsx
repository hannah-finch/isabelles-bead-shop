import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../utils/mutations";
import { IntToCurrency, currencyToInt } from "../../utils/math";

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
function NewProductForm() {
  const [addProduct] = useMutation(ADD_PRODUCT);

  const [formState, setFormState] = useState({
    name: "",
    price: IntToCurrency(5.99),
    category: "",
    description: "",
    stock: 1,
    image: "",
  });

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dflvzyvkr");
  const [uploadPreset] = useState("rpzhky6o");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if the value is suppose to be an int, make it an int
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { name, price, category, description, stock } = formState;
    try {
      const {
        data: { createProduct },
      } = await addProduct({
        variables: {
          name,
          price: currencyToInt(price),
          category,
          description,
          stock,
          image: publicId,
        },
      });
      if (createProduct != null) {
        alert("Item ADDED");

        window.location.assign("/admin");
        //TODO FIX BUG FROM CAUSING FORMS FROM AUTO SUBMITTING
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="new-product-form"
        id="NewProductForm"
      >
        <h2>Add new product</h2>
        <label htmlFor="name">Name:</label>
        <input
          value={formState.name}
          name="name"
          onChange={handleInputChange}
          type="text"
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
            type="string"
            max={2147483647}
            min="0"
          ></input>
        </div>
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
          <option value=""></option>
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
        ></textarea>
        {/* //! IMAGE STUFF HERE */}
        <label htmlFor="image">Image:</label>
        <div>
          <AdvancedImage
            className={publicId ? "upload-img" : ""}
            // style={{ maxWidth: "100%" }}
            cldImg={myImage}
            plugins={[responsive(), placeholder()]}
          />
        </div>

        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

        <label htmlFor="imageId">
          ImageID: (you don&apos;t have to know what this means)
        </label>
        <input
          type="text"
          value={publicId}
          onChange={handleInputChange}
          name="image"
          disabled
        />
      </form>
      <div className="form-footer center">
        <button
          className="btn-1"
          onClick={handleFormSubmit}
          form="NewProductForm"
        >
          Save New Product
        </button>
      </div>
    </>
  );
}

export default NewProductForm;
