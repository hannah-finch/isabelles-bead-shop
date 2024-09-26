// TODO: this is a lot of duplicate, non stateful code.
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const [total, setTotal] = useState(0);

  function stockCheck() {
    cartItems.map((item) => {
      if (item.quantity > item.stock) {
        item.quantity = item.stock;
      }
    });
  }

  stockCheck();

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
  };

  const incrementCartItem = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === productId && item.quantity < item.stock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const decrementCartItem = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    const filteredCart = updatedCartItems.filter((item) => item.quantity > 0);
    setCartItems(filteredCart);
  };

  // Calculate the total price
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  useEffect(() => {
    setTotal(calculateTotal(cartItems));
  }, [cartItems]);

  return (
    <>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item cart-item-wrapper">
              <figure className="product-img-cart">
                <img className="crop-img" src={item.imageURL}></img>
              </figure>
              <div className="item-text-box space-y-1">
                <div>
                  <Link to={`/product/${item._id}`} className="bold">
                    {item.name}
                  </Link>
                  <p className="mb-2 center">( {item.stock} left in stock )</p>
                  <p>${item.price / 100} each</p>
                  <p className="bold">
                    Total: ${(item.price * item.quantity) / 100}
                  </p>
                </div>
              </div>

              <div className="cart-button-container">
                <div className="button-container button-container-product">
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-0 px-2  rounded-full"
                    onClick={() => {
                      decrementCartItem(item._id);
                    }}
                  >
                    -
                  </button>
                  <div className="like-btn-2 ">
                    <p id="quantity">{item.quantity}</p>
                  </div>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-0 px-2 rounded-full"
                    onClick={() => {
                      incrementCartItem(item._id);
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="underline mt-1"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove All
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <p className="total">TOTAL: ${total.toFixed(2) / 100}</p>
    </>
  );
};

export default ShoppingCart;
