import { useState } from "react";

function ReviewForm() {
  const [formState, setFormState] = useState({
    username: "",
    content: "",
    rating: "",
  });

  const handleInputChange = () => {};

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2>Leave a Review</h2>
        <input
          value={formState.username}
          name="username"
          onChange={handleInputChange}
          type="text"
          placeholder="Your name"
          required
        ></input>
        <input
          value={formState.rating}
          name="rating"
          onChange={handleInputChange}
          type="number"
          placeholder="Star rating (1-5)"
          min="1"
          max="5"
          required
        ></input>
        <textarea
          value={formState.content}
          name="content"
          onChange={handleInputChange}
          type="text"
          placeholder="Review text"
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
