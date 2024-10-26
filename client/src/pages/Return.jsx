import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_STOCK } from "../utils/mutations";

const ReturnPage = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [updateStock] = useMutation(UPDATE_STOCK);

  useEffect(() => {

    const updateStockAndClearCart = async (items, sessionId) => {
      const stockUpdated = localStorage.getItem(`stockUpdated_${sessionId}`);
      setSession(items);

      if (!stockUpdated) {
        await updateStock({
          variables: {
            products: items.map((item) => ({
              _id: item._id,
              quantity: item.quantity,
            })),
          },
        });
        localStorage.setItem(`stockUpdated_${sessionId}`, "true");
        localStorage.setItem("cartItems", []);
        localStorage.setItem("stripeItems", []);
      }
    };

    const handleCheckoutSession = async () => {
      const query = new URLSearchParams(location.search);
      const sessionId = query.get("session_id");

      try {
        if (!sessionId) {
          setLoading(false);
          return;
        }

        const storedItems = localStorage.getItem("cartItemsWithId");
        if (!storedItems) {
          setError("No items found in local storage");
          setLoading(false);
          return;
        }
        const parsedItems = JSON.parse(storedItems);

        await updateStockAndClearCart(parsedItems, sessionId);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    handleCheckoutSession();
  }, [location.search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!session) return <p>No session data found.</p>;

  //get cartitemswithid from local storage
  const cartItemsForReceipt = JSON.parse(
    localStorage.getItem("cartItemsWithId")
  );

  // calculate total
  const totalAmount = cartItemsForReceipt.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <h1 className="mb-6">Order Receipt</h1>
      <p className="text-lg text-gray-700 mb-4">
        Thank you for your purchase! We appreciate your business.
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Items Purchased:
      </h2>
      <ul className="space-y-4">
        {cartItemsForReceipt.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
          >
            <span className="font-medium text-gray-900">
              {item.quantity} x {item.name}
            </span>
            <span className="text-gray-800">
              ${((item.quantity * item.price) / 100).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-xl font-semibold text-gray-900 border-t pt-4">
        <span>Total Amount: </span>
        <span>${(totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ReturnPage;
