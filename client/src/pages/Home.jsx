// To get products to show according to category, we can either add a category table to the db that the products belong to (maybe) and then get all for that category... OR to keep db as is, we can conditionally render the products by mapping (on product-card.jsx currently) and then if product.category === "the category", return that card. I wonder if we would need to make a separate function then for each category.. doesn't seem very dry.. come back to this thought later... BETTER THOUGHT... I just added data-category attribute to the card, so that will be WAY easier to filter

import { useEffect, useState, useContext } from "react";
import "../assets/css/shop.css";
import ProductCard from "../components/product-card";
import { ProductsContext } from "../utils/ProductsContext";

function HomePage() {
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
  const nonUniqCategories = allProducts.map((product) => {
    return product.category;
  });
  const Categories = [...new Set(nonUniqCategories)];

  function HomeBanner() {
    return (
      <section className="category-banner">
        {/* TODO: Change the image source on hover to the color versions */}
        {Categories.map((category, key) => (
          <button key={key}>
            <div
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${
                selectedCategory === category
                  ? "category-link-active"
                  : "category-link"
              }`}
            >
              <img src="/images/icon-circle.png"></img>
              {category}
            </div>
          </button>
        ))}
      </section>
    );
  }
  function ShopSelection() {
    return (
      <>
        <h2>
          {selectedCategory === "all"
            ? "Shop All"
            : `${capitalizeWords(selectedCategory)}s`}
        </h2>
        <button
          onClick={() => setSelectedCategory("all")}
          className={
            selectedCategory === "all"
              ? "category-link-active"
              : "category-link"
          }
        >
          shop all
        </button>
        {Categories.map((category, key) => {
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "category-link-active"
                  : "category-link"
              }
            >
              {category}
            </button>
          );
        })}
      </>
    );
  }
  function ProductsGrid() {
    return (
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
    );
  }
  return (
    <>
      <HomeBanner />
      <section className="shop-section">
        <ShopSelection />
        <ProductsGrid />
        {/* TODO: Optional, for now just focus on showing all the products, later show 12 or and give this button functionality to show 12 more. I think you can do this by editing the css of the grid (set the row template and then overflow hidden or something like that) */}
        <button className="btn-2">Show More</button>
      </section>
    </>
  );
}

export default HomePage;
