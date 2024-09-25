import Announcement from "./Announcement";
import BannerHome from "./BannerHome";
import Navbar from "./Navbar";
import Banner from "./Banner";

import { useLocation } from "react-router-dom";
import "../../assets/css/header.css";

function Header() {
  const location = useLocation();

  return (
    <>
      <Announcement />
      {location.pathname === "/" ? (
        <>
          <BannerHome />
          <Navbar />
        </>
      ) : (
        <>
          <Navbar />
          {/* <Banner /> */}
        </>
      )}
    </>
  );
}

export default Header;
