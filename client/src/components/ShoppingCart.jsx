const ShoppingCart = ({ cartItems, removeFromCart }) => {
  return (
    <>
      <h1>Shopping Cart</h1>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.index}>
              <h3>{item.name}</h3>
              <button onClick={() => removeFromCart(item._id)}>
                Remove from cart
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
