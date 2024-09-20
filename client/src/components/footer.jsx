import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <h1>
          Made with love,<br></br> by Isabelle
        </h1>
        <div className="spacer"></div>
        <Link className="btn-1" to="/about">
          about
        </Link>
      </footer>
      <section className="sub-footer">
        {/* TODO: add our names and GitHub links */}
        Website built by:{" "}
        <a href="https://github.com/hannahschwen" target="_blank">
          Hannah Schwen,
        </a>{" "}
        <a href="https://github.com/Kalink52" target="_blank">
          Micah Cox,
        </a>{" "}
        <a href="https://github.com/swokamoto" target="_blank">
          Scott Okamoto,
        </a>{" "}
        and{" "}
        <a href="https://github.com/TheLuckiestLlama" target="_blank">
          Daniel (insert last name here... sorry Daniel, IDK)
        </a>
      </section>
    </>
  );
}

export default Footer;
