// TODO: this is a lot of duplicate, non stateful code.
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const [total, setTotal] = useState(0);

  // const groupItems = (items) => {
  //   const groupedItems = items.reduce((acc, item) => {
  //     if (acc[item._id]) {
  //       acc[item._id].quantity += 1;
  //     } else {
  //       acc[item._id] = { ...item, quantity: 1 };
  //     }
  //     return acc;
  //   }, {});
  //   return Object.values(groupedItems);
  // };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
  };

  const incrementCartItem = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
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

  // useEffect(() => {
  //   setTotal(calculateTotal(cartItems));
  // }, [cartItems]);

  console.log(cartItems);

  return (
    <>
      <h1>Shopping Cart</h1>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item-wrapper">
              <div className="cart-item">
                <figure className="product-img-cart">
                  <img src="images/tempPictures/defaultProductImage.jpg"></img>
                  {/* TODO: fix the url */}
                </figure>
                <div className="item-text-box space-y-1">
                  <Link to={`/product/${item._id}`} className="bold">
                    {item.name}
                  </Link>

                  <div className="flex">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded"
                      onClick={() => decrementCartItem(item._id)}
                    >
                      -
                    </button>
                    <p className="mx-2 w-3 text-center">{item.quantity}</p>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded"
                      onClick={() => incrementCartItem(item._id)}
                    >
                      +
                    </button>

                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-0 px-2 rounded ml-auto"
                      onClick={() => removeFromCart(item._id)}
                    >
                      x
                    </button>
                  </div>

                  <p>${item.price / 100} each</p>
                  <p className="bold">Total: ${(item.price * item.quantity) / 100}</p>
                </div>
                <section className="flex flex-col space-y-1"></section>
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
