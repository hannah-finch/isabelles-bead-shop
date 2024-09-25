import { useContext } from "react";
import ShoppingCart from "../components/ShoppingCart";
import CheckoutButton from "../components/CheckoutButton";
import { ShoppingCartContext } from "../utils/ProductsContext";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(ShoppingCartContext);
  return (
    <>
      <section className="cart-section">
        <h2>Shopping cart</h2>
        <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
        <CheckoutButton cartItems={cartItems}/>
      </section>
    </>
  );
}