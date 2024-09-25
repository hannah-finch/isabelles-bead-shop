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
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    // Flag to check if update to stock is required
    const stockUpdated = localStorage.getItem(`stockUpdated_${sessionId}`);

    if (sessionId) {
      fetch(
        `${window.location.origin.replace(
          "3000",
          "3001"
        )}/retrieve-checkout-session/${sessionId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("response data", data); // Log the parsed JSON data
          setSession(data);
          setLoading(false); // Set loading to false after successful fetch

          // Check if stock has already been updated
          !stockUpdated &&
            updateStock({
              variables: {
                products: data.line_items.data.map((item) => ({
                  name: item.description,
                  quantity: item.quantity,
                })),
              },
            })
              .then(() => {
                console.log("Stock updated successfully");
                // Set flag in localStorage to prevent multiple updates on refresh
                localStorage.setItem(`stockUpdated_${sessionId}`, "true");
                // Clear cart items from localStorage after successful purchase
                localStorage.removeItem("cartItems");
              })
              .catch((error) => {
                console.error("Error updating stock:", error);
              });
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
          setError(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Display depending true/false loading, error, or session data states

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!session) {
    return <p>No session data found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <h1 className="mb-6">
        Order Receipt
      </h1>

      <p className="text-lg text-gray-700 mb-4">
        Thank you, <span className="font-semibold text-gray-900">{session.customer_details.name}</span>, for your purchase! We appreciate your business.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        <span className="font-semibold">Payment Status:</span>{" "}
        <span
          className={`${
            session.payment_status === "paid"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {session.payment_status}
        </span>
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Items Purchased:
      </h2>

      <ul className="space-y-4">
        {session.line_items.data.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
          >
            <span className="font-medium text-gray-900">
              {item.quantity} x {item.description}
            </span>
            <span className="text-gray-800">
              ${(item.amount_total / 100).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-xl font-semibold text-gray-900 border-t pt-4">
        <span>Total Amount: </span>
        <span>${(session.amount_total / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ReturnPage;
