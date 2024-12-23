import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <>
      <footer>
        <h1>
          Made with love,<br></br> by Isabelle
        </h1>
        <div className="spacer"></div>
        {location.pathname === "/about" ? (
          <Link className="btn-1" to="/">
            shop
          </Link>
        ) : (
          <Link className="btn-1" to="/about">
            about
          </Link>
        )}
      </footer>
      <section className="sub-footer">
        Website built by:{" "}
        <a href="https://github.com/hannahschwen" target="_blank">
          Hannah Schwen,
        </a>{" "}
        <a href="https://github.com/Kalink52" target="_blank">
          Micah Cox,
        </a>{" "}
        <a href="https://github.com/swokamoto" target="_blank">
          Scott Okamoto,
        </a>
        {" and "}
        <a href="https://github.com/TheLuckiestLlama" target="_blank">
          Daniel Hudson
        </a>
      </section>
    </>
  );
}

export default Footer;
