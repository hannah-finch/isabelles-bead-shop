import '../assets/css/shop.css'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <section className="category-banner">
        {/* TODO: Change the image source on hover to the color versions */}
        {/* TODO: Link to get the items of the selected category to display in the grid below */}
        <Link >
          <div className="category-btn">
            <img src="/images/icon-circle.png"></img>
            Bracelets
          </div>
        </Link>
        <Link >
          <div className="category-btn">
            <img src="/images/icon-squiggle.png"></img>
            Key chains
          </div>
        </Link>
        <Link >
          <div className="category-btn">
            <img src="/images/icon-x.png"></img>
            Fidgets
          </div>
        </Link>
        <Link >
          <div className="category-btn">
            <img src="/images/icon-flower.png"></img>
            Earrings
          </div>
        </Link>
      </section>
      <div className="sub-category-banner"></div>


    </>

  );
}

export default HomePage;
