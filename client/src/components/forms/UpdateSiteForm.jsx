import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_INFO } from "../../utils/queries";

function UpdateSiteForm() {
  const { data } = useQuery(GET_INFO);

  const [formState, setFormState] = useState({
    announcementTitle: data?.info[0].announcementTitle,
    announcement: data?.info[0].announcement,
    about1Title: data?.info[0].about1Title,
    about1Text: data?.info[0].about1Text,
    about2Title: data?.info[0].about2Title,
    about2Text: data?.info[0].about2Text,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
  };
  
  return (
    <>
      {formState.announcementTitle}
      <br></br>
      {formState.announcement}
      <br></br>
      {formState.about1Title}
      <br></br>
      {formState.about1Text}
      <br></br>
      {formState.about2Title}
      <br></br>
      {formState.about2Text}

      <form onSubmit={handleFormSubmit}>
        <h2>Update Site Text</h2>

        <h3>Shop Announcement:</h3>
        <label htmlFor="announcementTitle">Title:</label>
        <input
          value={formState.announcementTitle}
          name="announcementTitle"
          onChange={handleInputChange}
          type="text"
        ></input>

        <label htmlFor="announcement">Announcement:</label>
        <input
          value={formState.announcement}
          name="announcement"
          onChange={handleInputChange}
          type="text"
        ></input>

        <div className="horizontal-line"></div>

        <h3>About Paragraph #1:</h3>

        <label htmlFor="about1Title">About Paragraph #1 Title:</label>
        <input
          value={formState.about1Title}
          name="about1Title"
          onChange={handleInputChange}
          type="text"
        ></input>

        <label htmlFor="about1Text">About Paragraph #1 Text:</label>
        <textarea
          value={formState.about1Text}
          name="about1Text"
          onChange={handleInputChange}
          type="text"
        ></textarea>

        <div className="horizontal-line"></div>

        <h3>About Paragraph #2:</h3>

        <label htmlFor="about2Title">About Paragraph #2 Title:</label>
        <input
          value={formState.about2Title}
          name="about2Title"
          onChange={handleInputChange}
          type="text"
        ></input>

        <label htmlFor="about2Text">About Paragraph #2 Text:</label>
        <textarea
          value={formState.about2Text}
          name="about2Text"
          onChange={handleInputChange}
          type="text"
        ></textarea>
      </form>
    </>
  );
}

export default UpdateSiteForm;
