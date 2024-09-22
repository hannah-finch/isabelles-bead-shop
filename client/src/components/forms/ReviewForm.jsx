import { useState } from "react";

function ReviewForm() {
  const [formState, setFormState] = useState({
    username: "",
    content: "",
    rating: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
        <label htmlFor="rating">Number of stars:</label>
        <select
          value={formState.rating}
          name="rating"
          onChange={handleInputChange}
          placeholder="Star rating (1-5)"
          required
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
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
