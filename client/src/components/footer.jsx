import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer>
        <h1>Made with love,<br></br> by Isabelle</h1>
        <div className="spacer"></div>
        <Link className="btn-1" to="/about">about</Link>
      </footer>
      <section className="sub-footer">
        {/* TODO: add our names and GitHub links */}
        Website built by:  put all our names and links to GitHub here
      </section>
    </>
  )
}


export default Footer