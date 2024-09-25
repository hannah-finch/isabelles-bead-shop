import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "../utils/queries.js";
import UpdateForm from "../components/forms/UpdateForm";

import { Dialog } from "@material-tailwind/react";

function EditButton(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const productId = props.productId;

  const { loading, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
  });

  const product = data
    ? data.singleProduct
    : {
        id: "",
        category: "",
        description: "",
        imageURL: "",
        stock: 0,
        price: 0,
        name: "",
        reviews: [],
      };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      {open && <section className="form-holder">
        <UpdateForm product={product} />
      </section> }
      <button className="btn-4 edit-btn" onClick={handleOpen}>
        Edit
      </button>

      {/* <Dialog  open={open} handler={handleOpen}>
      <div className="spacer"></div>
        <div className="overflow-y-scroll" style={{ maxHeight: "90vh" }}>
          <UpdateForm product={product} />
        </div>
        <div className="spacer"></div>
      </Dialog> */}
    </>
  );
}

export default EditButton;
