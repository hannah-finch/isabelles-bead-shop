// TODO: this is a lot of duplicate, non stateful code. 


const ShoppingCart = ({ cartItems, removeFromCart }) => {
  // add a quantity property to each item in the cart and group items by ID
  const groupedItems = cartItems.reduce((acc, item) => {
    if (acc[item._id]) {
      acc[item._id].quantity += 1;
    } else {
      acc[item._id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  // convert grouped items into an array of objects
  const groupedItemsArray = Object.values(groupedItems);

  return (
    <>
      <h1>Shopping Cart</h1>
      <div>
        {groupedItemsArray.length > 0 ? (
          groupedItemsArray.map((item) => (
            <div key={item.index} className="border border-blue-500 rounded-lg m-4">
              <h3>{item.name}</h3>
              <p>Price: ${item.price/100}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.price * item.quantity/100}</p>

              <button className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => removeFromCart(item._id)}>
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
