

function Announcement() {
  // later, use state instead and let admin edit the title and announcement, save in db
  const announcementTitle = "NOTICE: ";
  const announcement =
    "This website is currently under construction. DON'T USE IT";

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
