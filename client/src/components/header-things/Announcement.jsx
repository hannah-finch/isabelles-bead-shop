import { useQuery } from "@apollo/client";
import { GET_INFO } from "../../utils/queries";

function Announcement() {
  const { data } = useQuery(GET_INFO)
  console.log(data)
  // later, use state instead and let admin edit the title and announcement, save in db
  const announcementTitle = "NOTICE: ";
  const announcement = data?.info[0].announcement;

  if (announcement !== "") {
    return (
      <>
        {/* this hack div gets shadow to show */}
        <div className="hack">
          <div className="announcement">
            <p className="text-center">
              <span className="bold">{announcementTitle}&nbsp;</span>{" "}
              {announcement}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Announcement;
