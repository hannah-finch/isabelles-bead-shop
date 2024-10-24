import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INFO } from "../../utils/queries";
import { UPDATE_INFO } from "../../utils/mutations";

function UpdateSiteForm() {
  const { data } = useQuery(GET_INFO);
  const [UpdateInfo] = useMutation(UPDATE_INFO);

  const initialValues = {
    announcementTitle: data?.info[0].announcementTitle,
    announcement: data?.info[0].announcement,
    about1Title: data?.info[0].about1Title,
    about1Text: data?.info[0].about1Text,
    about2Title: data?.info[0].about2Title,
    about2Text: data?.info[0].about2Text,
  };

  const [formState, setFormState] = useState(initialValues);

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
    const {
      announcementTitle,
      announcement,
      about1Title,
      about1Text,
      about2Title,
      about2Text,
    } = formState;

    try {
      const { data } = await UpdateInfo({
        variables: {
          announcementTitle,
          announcement,
          about1Title,
          about1Text,
          about2Title,
          about2Text,
        },
      });

      if (data) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} id="UpdateSiteForm">
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

        <label htmlFor="about1Title">Title:</label>
        <input
          value={formState.about1Title}
          name="about1Title"
          onChange={handleInputChange}
          type="text"
        ></input>

        <label htmlFor="about1Text">Text:</label>
        <textarea
          value={formState.about1Text}
          name="about1Text"
          onChange={handleInputChange}
          type="text"
        ></textarea>

        <div className="horizontal-line"></div>

        <h3>About Paragraph #2:</h3>

        <label htmlFor="about2Title">Title:</label>
        <input
          value={formState.about2Title}
          name="about2Title"
          onChange={handleInputChange}
          type="text"
        ></input>

        <label htmlFor="about2Text">Text:</label>
        <textarea
          value={formState.about2Text}
          name="about2Text"
          onChange={handleInputChange}
          type="text"
        ></textarea>
      </form>
      <div className="form-footer center">
        <div className="button-container">
        <button className="btn-2" onClick={() => window.location.reload()}>
            Cancel
          </button>
          <button className="btn-1" type="submit" form="UpdateSiteForm">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateSiteForm;
