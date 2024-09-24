function Announcement() {
  // later, use state instead and let admin edit the title and announcement, save in db
  const announcementTitle = "NOTICE: ";
  const announcement =
    "This website is currently under construction. DON'T USE IT";

  if (announcement !== "") {
    return (
      <>
        <div className="announcement">
          <span className="bold">{announcementTitle}&nbsp;</span> {announcement}
        </div>
      </>
    );
  }
}

export default Announcement;
