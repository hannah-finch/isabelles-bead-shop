const CartPreview = ({ items }) => {
    return (
      <div className="cart-preview bg-white border border-gray-300 p-4 rounded-lg shadow-lg">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="cart-preview-item mb-4 last:mb-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold whitespace-nowrap">{item.name}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Quantity {item.quantity}</p>
                <p className="text-sm text-gray-600">Total ${(item.price * item.quantity / 100).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Your cart is empty</p>
        )}
      </div>
    );
  };

export default CartPreview;