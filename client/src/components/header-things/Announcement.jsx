import { useQuery } from "@apollo/client";
import { GET_INFO } from "../../utils/queries";

function Announcement() {
  const { data } = useQuery(GET_INFO)
  const announcementTitle = data?.info[0].announcementTitle;
  const announcement = data?.info[0].announcement;

  if (announcement !== "") {
    return (
      <>
        {/* this hack div gets shadow to show */}
        <div className="hack">
          <div className="announcement">
            <p className="text-center">
              <span className="bold">{announcementTitle}:&nbsp;</span>{" "}
              {announcement}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Announcement;
