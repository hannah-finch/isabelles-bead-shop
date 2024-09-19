import { Link } from "react-router-dom";
import "../assets/css/cart.css";

function CartPage() {
  return (
    <>
      <section className="cart-section">
        <h2>Shopping cart</h2>

        {/* TODO: create one of these div's for each item in the cart, using correct data in {} */}
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
        <button className="btn-1">Check Out</button>
      </section>
    </>
  );
}

export default CartPage;
