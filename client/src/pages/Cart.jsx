//import { Link } from "react-router-dom";
import "../assets/css/cart.css";
import { useContext } from "react";
import ShoppingCart from "../components/ShoppingCart";
import CheckoutButton from "../components/CheckoutButton";
import { ShoppingCartContext } from "../utils/ProductsContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(ShoppingCartContext);
  return (
    <>
      <section className="cart-section">
        <h2>Shopping cart</h2>
        <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart}/>
        <CheckoutButton cartItems={cartItems}/>

        {/* TODO: create one of these div's for each item in the cart, using correct data in {} */}
        {/* <div className="cart-item">
          <figure className="product-img-cart">
            <img
              src="images/tempPictures/defaultProductImage.jpg"
              className="crop-img"
            ></img>
          </figure>
          <div className="item-text-box">
            <Link to="/product/PUTproductIdHERE" className="bold">
              Product Name
            </Link>
            <p>Quantity: 1</p>
            <p>$5.00 each</p>
          </div>
          <button className="btn-del">x</button>
        </div>

        <div className="cart-item">
          <figure className="product-img-cart">
            <img
              src="images/tempPictures/defaultProductImage.jpg"
              className="crop-img"
            ></img>
          </figure>
          <div className="item-text-box">
            <Link to="/product/PUTproductIdHERE" className="bold">
              Product Name
            </Link>
            <p>Quantity: 2</p>
            <p>$5.00 each</p>
          </div>
          <button className="btn-del">x</button>
        </div>

        <p className="total">TOTAL: $15.00</p>
        <button className="btn-1">Check Out</button> */}
      </section>
    </>
  );
}

