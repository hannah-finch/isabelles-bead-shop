import '../assets/css/cart.css'

function CartPage() {
  return (
    <>
      <section>
        <h2>Shopping cart</h2>

        <div className="cart-item">
          <figure className="product-img-cart">
            <img src="images/tempPictures/defaultProductImage.jpg"></img>
          </figure>

          <div className = "item-text-box">
            <p>Product Name</p>
            <p>$5.00</p>
            <p>Quantity: 1</p>
          </div>


          <button className="btn-del">x</button>
        </div>


        <p>TOTAL: $15.00</p>
        <button className="btn-1">Check Out</button>
      </section>

    <h2>Cart page</h2>
    </>
  )
};

export default CartPage;