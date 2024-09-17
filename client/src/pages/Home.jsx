// To get products to show according to category, we can either add a category table to the db that the products belong to (maybe) and then get all for that category... OR to keep db as is, we can conditionally render the products by mapping (on product-card.jsx currently) and then if product.category === "the category", return that card. I wonder if we would need to make a separate function then for each category.. doesn't seem very dry.. come back to this thought later... BETTER THOUGHT... I just added data-category attribute to the card, so that will be WAY easier to filter

import "../assets/css/shop.css";
import ProductCard from "../components/product-card";
// import { Link } from 'react-router-dom'
import { GET_All_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function HomePage() {
  const { loading, data } = useQuery(GET_All_PRODUCTS);
  const productsData = data ? data.products : [];
  console.log(productsData);
  return (
    <>
      <section className="category-banner">
        {/* TODO: Change the image source on hover to the color versions */}
        {/* TODO: Add functionality to get the items of the selected category to display in the grid below */}
        <button>
          <div className="category-btn">
            <img src="/images/icon-circle.png"></img>
            Bracelets
          </div>
        </button>
        <button>
          <div className="category-btn">
            <img src="/images/icon-squiggle.png"></img>
            Key chains
          </div>
        </button>
        <button>
          <div className="category-btn">
            <img src="/images/icon-x.png"></img>
            Fidgets
          </div>
        </button>
        <button>
          <div className="category-btn">
            <img src="/images/icon-flower.png"></img>
            Earrings
          </div>
        </button>
      </section>
      <div className="sub-category-banner"></div>

      <section className="shop-section">
        {/* TODO: show a button for each category in the db, so if she adds a category, it'll automatically be here (These are just examples atm, don't forget the | at the end)*/}
        {/* TODO: add functionality to get all products of the selected category to display in the grid */}
        {/* TODO: when the category is displaying in the grid, add the class 'category-link-active' to the button, and change the h2 to the name of the category*/}
        <h2>Shop All</h2>
        <button className="category-link-active">shop all</button>|
        <button className="category-link">bracelets</button>|
        <button className="category-link">key chains</button>|
        <button className="category-link">fidgets</button>|
        <button className="category-link">earrings</button>
        <section className="product-grid">
          {/* This checks if the product query is empty and done loading.*/}
          {productsData.length === 0 && !loading ? (
            <h1>No Products Found</h1>
          ) : (
            productsData.map((product) => {
              return <ProductCard product={product} key={product._id} />;
            })
          )}
        </section>
        {/* TODO: Optional, for now just focus on showing all the products, later show 12 or and give this button functionality to show 12 more. I think you can do this by editing the css of the grid (set the row template and then overflow hidden or something like that) */}
        <button className="btn-2">Show More</button>
      </section>
    </>
  );
}

export default HomePage;
