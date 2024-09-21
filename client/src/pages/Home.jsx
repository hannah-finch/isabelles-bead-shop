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
    const [hoveredCategory, setHoveredCategory] = useState("");
    return (
      <section className="category-banner">
        {Categories.map((category, key) => (
          <button key={key}>
            <div
              onClick={() => setSelectedCategory(category)}
              className="category-btn"
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory("")}
            >
              <img
                src={
                  hoveredCategory === category || selectedCategory === category
                    ? `/images/icon-${category}-color.png`
                    : `/images/icon-${category}.png`
                }
              ></img>
              {category === "other" ? category : `${category}s`}
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
          {selectedCategory === "all" ? "Shop " : ""}
          {selectedCategory === "all" || selectedCategory === "other"
            ? `${capitalizeWords(selectedCategory)}`
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
              {category === "other" ? category : `${category}s`}
            </button>
          );
        })}
      </>
    );
  }
  function ProductsGrid() {
    const [displayNum, setDisplayNum] = useState(15);
    const showMore = () => {
      setDisplayNum(displayNum + 15);
    };
    return (
      <>
        <div className="product-grid">
          {/* This checks if the product query is empty and done loading.*/}
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts
              .slice(0, displayNum)
              .map((product) => (
                <ProductCard
                  product={product}
                  key={product._id}
                  selected={selectedCategory}
                />
              ))
          ) : (
            <p>No products available</p>
          )}
        </div>

        {filteredProducts.length > displayNum ? (
          <button onClick={showMore} className="btn-2">
            Show More
          </button>
        ) : null}
      </>
    );
  }
  return (
    <>
      <HomeBanner />
      <section className="shop-section">
        <ShopSelection />
        <ProductsGrid />
      </section>
    </>
  );
}

export default HomePage;
