import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";

import { Dialog } from "@material-tailwind/react";

function ReviewForm() {
  const { productId } = useParams();
  const [open, setOpen] = useState(false);
  const [AddReview] = useMutation(ADD_REVIEW);
  const [formState, setFormState] = useState({
    username: "",
    content: "",
    rating: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    name === "rating"
      ? setFormState({
          ...formState,
          [name]: +value,
        })
      : setFormState({
          ...formState,
          [name]: value,
        });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await AddReview({
        variables: { id: productId, reviewDetails: formState },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="btn-2">
        Leave a Review
      </button>

      <Dialog open={open} handler={handleOpen}>
        <form onSubmit={handleFormSubmit} id="ReviewForm">
          <h2>Leave a Review</h2>
          <div className="flex-row">
            <div className="flex-col">
              <label htmlFor="username">Your name:</label>
              <input
                value={formState.username}
                name="username"
                onChange={handleInputChange}
                type="text"
                required
              ></input>
            </div>
            <div className="flex-col">
              <label htmlFor="rating">Number of stars:</label>
              <select
                value={formState.rating}
                name="rating"
                type="number"
                onChange={handleInputChange}
                required
              >
                <option value=""></option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
          </div>
          <label htmlFor="content">Review text:</label>
          <textarea
            value={formState.content}
            name="content"
            onChange={handleInputChange}
            type="text"
            required
          ></textarea>
        </form>
        <div className="form-footer">
          <div className="button-container">
            <button className="btn-2" onClick={handleOpen}>
              <span>Cancel</span>
            </button>
            <button
              className="btn-1"
              type="submit"
              onClick={handleOpen}
              form="ReviewForm"
            >
              Send Review
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ReviewForm;
