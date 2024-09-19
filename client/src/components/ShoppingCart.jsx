// TODO: this is a lot of duplicate, non stateful code.
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const [groupedItemsArray, setGroupedItemsArray] = useState([]);
  const [total, setTotal] = useState(0);

  // add a quantity property to each item in the cart and group items by ID
  const groupItems = (items) => {
    const groupedItems = items.reduce((acc, item) => {
      if (acc[item._id]) {
        acc[item._id].quantity += 1;
      } else {
        acc[item._id] = { ...item, quantity: 1 };
      }
      return acc;
    }, {});
    return Object.values(groupedItems);
  };


  const removeFromCart = (productId) => {
    const updatedCartItems = groupedItemsArray.filter(
      (item) => item._id !== productId
    );
    setGroupedItemsArray(updatedCartItems);
    setCartItems(updatedCartItems); // Update cartItems as well
  };

  const incrementCartItem = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === productId
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

  // calculate the total price
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  useEffect(() => {
    const grouped = groupItems(cartItems);
    setGroupedItemsArray(grouped);
    setTotal(calculateTotal(grouped));
  }, []);

  useEffect(() => {
    //const grouped = groupItems(cartItems);
    setGroupedItemsArray(cartItems);
    setTotal(calculateTotal(cartItems));
  }, [cartItems]);

  console.log(groupedItemsArray);

  return (
    <>
      <h1>Shopping Cart</h1>
      <div>
        {groupedItemsArray.length > 0 ? (
          groupedItemsArray.map((item) => (
            <div key={item.index} className="cart-item-wrapper">
              <div className="cart-item">
                <figure className="product-img-cart">
                  <img src="images/tempPictures/defaultProductImage.jpg"></img>
                  {/* TODO: fix the url */}
                </figure>
                <div className="item-text-box">
                  <Link to="/product/{item._Id}" className="bold">
                    {item.name}
                  </Link>
                  <p>Quantity: {item.quantity}</p>
                  <p>${item.price / 100} each</p>
                  <p>Total: ${(item.price * item.quantity) / 100}</p>
                </div>
                <button
                  className="btn-del"
                  onClick={() => incrementCartItem(item._id)}
                >
                  +
                </button>
                <button
                  className="btn-del"
                  onClick={() => decrementCartItem(item._id)}
                >
                  -
                </button>
                <button
                  className="btn-del"
                  onClick={() => removeFromCart(item._id)}
                >
                  x
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
