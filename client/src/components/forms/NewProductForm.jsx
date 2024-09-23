import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../utils/mutations";

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
function NewProductForm() {
  const [addProduct] = useMutation(ADD_PRODUCT);
  // TODO SEND INT TO DATABASE
  const [formState, setFormState] = useState({
    name: "",
    price: undefined,
    category: "",
    description: "",
    stock: 1,
    image: "",
  });

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState(import.meta.env.VITE_CLOUDNAME);
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
          [name]: +value,
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
    console.log(formState);
    try {
      const { data } = await addProduct({
        variables: {
          name,
          price,
          category,
          description,
          stock,
          image: publicId,
        },
      });
      console.log(data);
      if (!data) {
        alert("form is invalid");
      }
      if (data) {
        alert("Item ADDED");
        //TODO FIX BUG FROM CAUSING FORMS FROM AUTO SUBMITTING
        // setFormState({
        // name: "",
        // price: undefined,
        // category: "",
        // description: "",
        // stock: 1,
        // image: "",
        // });
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
      <form onSubmit={handleFormSubmit} className="new-product-form">
        <h2>Add new product</h2>
        <label htmlFor="name">Name:</label>
        <input
          value={formState.name}
          name="name"
          onChange={handleInputChange}
          type="text"
        ></input>
        {/* //TODO FORCE THIS INTO DECIMAL AND MAKE FUNCTION TO CONVERT INTO DATABASE SHTUFF */}
        <label htmlFor="price">Price:</label>
        <input
          value={formState.price}
          name="price"
          onChange={handleInputChange}
          type="number"
          min="0"
        ></input>
        <label htmlFor="stock">Number in stock:</label>
        <input
          value={formState.stock}
          name="stock"
          onChange={handleInputChange}
          type="number"
          min="0"
        ></input>
        <label htmlFor="category">Category:</label>
        {/* //TODO MAKE this a dropdown to limit CATEGORIES */}
        <input
          value={formState.category}
          name="category"
          onChange={handleInputChange}
          type="text"
        ></input>
        <label htmlFor="description">Description:</label>
        <textarea
          value={formState.description}
          name="description"
          onChange={handleInputChange}
          type="text"
        ></textarea>
        {/* //! IMAGE STUFF HERE */}
        <label htmlFor="image">Image:</label>
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
        <div style={{ width: "200px" }}>
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={myImage}
            plugins={[responsive(), placeholder()]}
          />
        </div>

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
        <button className="btn-1" type="submit">
          Submit
        </button>

        <div className="form-footer"></div>
      </form>
    </>
  );
}

export default NewProductForm;
