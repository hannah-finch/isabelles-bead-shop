import { createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "./queries";

const ProductsContext = createContext();
const ShoppingCartContext = createContext();

const ProductsProvider = ({ children }) => {
  // Products state
  const { data, loading, error } = useQuery(GET_All_PRODUCTS);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setAllProducts(data.products);
    }
  }, [data]);

  // Shopping cart state
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    console.log(cartItems); 
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  const incrementCartItem = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
  };

  const decrementCartItem = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    // Remove item if quantity is 0 (only keeps items with quantity > 0)
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    setCartItems(filteredCart);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <ProductsContext.Provider value={{ allProducts }}>
      <ShoppingCartContext.Provider value={{ cartItems, addToCart, removeFromCart, incrementCartItem, decrementCartItem }}>
        {children}
      </ShoppingCartContext.Provider>
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ShoppingCartContext, ProductsProvider };