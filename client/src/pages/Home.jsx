import { useEffect, useState, useContext, useRef } from "react";
import ProductCard from "../components/product-card";
import { ProductsContext } from "../utils/ProductsContext";

function HomePage() {
  const { allProducts } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCategory, setHoveredCategory] = useState("");
  const shopSection = useRef(null);

  const nonUniqCategories = allProducts.map((product) => product.category);
  const Categories = [...new Set(nonUniqCategories)];

  const Icon = ({ category }) => (
    <img src={`/images/icons/${category}.svg`}></img>
  );
  const IconSelected = ({ category }) => (
    <img src={`/images/icons/${category}-color.svg`}></img>
  );

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

  function CategoryBanner() {
    return (
      <section className="category-banner">
        {Categories.map((category, key) => (
          <button
            key={key}
            onClick={() => {
              setSelectedCategory(category);
              if (shopSection.current) {
                shopSection.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="category-btn"
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory()}
          >
            {hoveredCategory === category || selectedCategory === category ? (
              <IconSelected category={category} />
            ) : (
              <Icon category={category} />
            )}
            <p>{category === "other" ? "other" : `${category}s`}</p>
          </button>
        ))}
      </section>
    );
  }

  function ShopSection() {
    const [displayNum, setDisplayNum] = useState(24);
    const [sortedProducts, setSortedProducts] = useState(filteredProducts);
    const showMore = () => {
      setDisplayNum(displayNum + 24);
    };

    // sorts by index, I'd like to add a timestamp to the db and sort with that instead
    function newToOld() {
      const products = filteredProducts
        .map((value, index) => [index, value])
        .sort((a, b) => b[0] - a[0])
        .map((pair) => pair[1]);
      setSortedProducts(products);
    }

    function highToLow() {
      const products = [...filteredProducts].sort((a, b) => b.price - a.price);
      setSortedProducts(products);
    }

    function lowToHigh() {
      const products = [...filteredProducts].sort((a, b) => a.price - b.price);
      setSortedProducts(products);
    }

    const ShopSidebar = () => {
      return (
        <>
          <div className="shop-sidebar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "category-link-active btn-2"
                  : "category-link btn-2"
              }
            >
              shop all
            </button>

            <div className="spacer"></div>
            <h3>Categories:</h3>
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
            <button className="btn-3" onClick={newToOld}>
              New to Old
            </button>
            <button
              className="btn-3"
              onClick={() => setSortedProducts(filteredProducts)}
            >
              Old to New
            </button>
            <button className="btn-3" onClick={highToLow}>
              Price high to low
            </button>
            <button className="btn-3" onClick={lowToHigh}>
              Price low to high
            </button>
          </div>
        </>
      );
    };

    const ProductsGrid = () => {
      return (
        <>
          <div className="product-grid">
            {filteredProducts.length ? (
              sortedProducts
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
        </>
      );
    };
    return (
      <>
        <section className="shop-section" ref={shopSection}>
          <ShopSidebar />
          <div className="shop-main">
            <h2>
              {selectedCategory === "all"
                ? "Shop All"
                : selectedCategory === "other"
                ? "Other"
                : `${capitalizeWords(selectedCategory)}s`}
            </h2>
            <ProductsGrid />
            {filteredProducts.length > displayNum ? (
              <button onClick={showMore} className="btn-2">
                Show More
              </button>
            ) : null}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <CategoryBanner />
      <ShopSection />
    </>
  );
}

export default HomePage;
