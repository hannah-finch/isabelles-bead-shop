import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";

function ReviewForm() {
  const { productId } = useParams();
  const [AddReview] = useMutation(ADD_REVIEW);
  const [formState, setFormState] = useState({
    username: "",
    content: "",
    rating: "",
  });

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
      <form onSubmit={handleFormSubmit} className="narrow">
        <h2>Leave a Review</h2>
        <label htmlFor="username">Your name:</label>
        <input
          value={formState.username}
          name="username"
          onChange={handleInputChange}
          type="text"
          required
        ></input>
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
        <label htmlFor="content">Review text:</label>
        <textarea
          value={formState.content}
          name="content"
          onChange={handleInputChange}
          type="text"
          required
        ></textarea>
        <button className="btn-1" type="submit">
          Send Review
        </button>
      </form>
    </>
  );
}

export default ReviewForm;
