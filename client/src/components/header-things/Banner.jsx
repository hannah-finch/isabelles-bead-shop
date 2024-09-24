import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner">
      <Link to="/">
        <img src="/images/logo-sm.png"></img>
      </Link>
    </div>
  );
}

export default Banner;
