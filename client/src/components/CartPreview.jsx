const CartPreview = ({ items }) => {
  return (
    <div className="cart-preview bg-white border border-gray-300 p-4 rounded-lg shadow-lg w-64">
      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <div
              key={item._id}
              className="cart-preview-item mb-4 last:mb-2 flex"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-semibold truncate">{item.name}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Quantity {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Total ${((item.price * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-sm text-gray-600">
              $
              {(
                items.reduce((acc, item) => acc + item.price * item.quantity, 0) /
                100
              ).toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <p className="text-center whitespace-nowrap text-gray-600">
          Your cart is empty
        </p>
      )}
    </div>
  );
};

export default CartPreview;
