// To get products to show according to category, we can either add a category table to the db that the products belong to (maybe) and then get all for that category... OR to keep db as is, we can conditionally render the products by mapping (on product-card.jsx currently) and then if product.category === "the category", return that card. I wonder if we would need to make a separate function then for each category.. doesn't seem very dry.. come back to this thought later... BETTER THOUGHT... I just added data-category attribute to the card, so that will be WAY easier to filter

import { useEffect, useState, useContext } from "react";
import "../assets/css/shop.css";
import ProductCard from "../components/product-card";
// import { Link } from 'react-router-dom'

import Auth from "../utils/auth";
// import { GET_All_PRODUCTS } from "../utils/queries";
// import { useQuery } from "@apollo/client";

import { ProductsContext } from "../utils/ProductsContext";

function HomePage() {
  //* testing admin, client, and not logged in
  if (Auth.isLoggedIn()) {
    console.log("admin: " + Auth.isAdmin());
    console.log("client: " + Auth.isClient());
  }
  //const { loading, data } = useQuery(GET_All_PRODUCTS);
  //const productsData = data ? data.products : [];
  //console.log(productsData);
  const { allProducts } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(
        allProducts.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, allProducts]);

  // Capitalize the first letter of each word in the category
  const capitalizeWords = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <section className="category-banner">
        {/* TODO: Change the image source on hover to the color versions */}
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
        <h2>
          {selectedCategory === "all"
            ? "Shop All"
            : capitalizeWords(selectedCategory)}
        </h2>
        <button
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? "category-link-active" : ""}
        >
          shop all
        </button>
        |
        <button
          onClick={() => setSelectedCategory("bracelet")}
          className={
            selectedCategory === "bracelet" ? "category-link-active" : ""
          }
        >
          bracelets
        </button>
        |
        <button
          onClick={() => setSelectedCategory("keychain")}
          className={
            selectedCategory === "keychain" ? "category-link-active" : ""
          }
        >
          key chains
        </button>
        |
        <button
          onClick={() => setSelectedCategory("fidget")}
          className={
            selectedCategory === "fidget" ? "category-link-active" : ""
          }
        >
          fidgets
        </button>
        |
        <button
          onClick={() => setSelectedCategory("earring")}
          className={
            selectedCategory === "earring" ? "category-link-active" : ""
          }
        >
          earrings
        </button>
        <section className="product-grid">
          {/* This checks if the product query is empty and done loading.*/}
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                selected={selectedCategory}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </section>
        {/* TODO: Optional, for now just focus on showing all the products, later show 12 or and give this button functionality to show 12 more. I think you can do this by editing the css of the grid (set the row template and then overflow hidden or something like that) */}
        <button className="btn-2">Show More</button>
      </section>
    </>
  );
}

export default HomePage;
