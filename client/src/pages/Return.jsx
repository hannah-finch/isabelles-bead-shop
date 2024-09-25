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
    
    const fetchSessionData = async (sessionId) => {
      try {
        const response = await fetch(`https://isabelles-bead-shop.onrender.com/retrieve-checkout-session/${sessionId}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer pk_test_51Q2G162MBbXhKSWl5DEAnWv59xawhXsLx1ezVYquN9XdN3PkOB8yt71UBZbzXwCZVJIjYIfQZmxkT2GS4ekGLVq900JJH1kTY7`,
          }
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        return response.json();
      } catch (error) {
        console.error("Error fetching session:", error);
        throw error;
      }
    };
    
    const updateStockAndClearCart = async (data, sessionId) => {
      const stockUpdated = localStorage.getItem(`stockUpdated_${sessionId}`);
      if (!stockUpdated) {
        await updateStock({
          variables: {
            products: data.line_items.data.map((item) => ({
              name: item.description,
              quantity: item.quantity,
            })),
          },
        });
        localStorage.setItem(`stockUpdated_${sessionId}`, "true");
        localStorage.removeItem("cartItems");
      }
    };

    const handleCheckoutSession = async (sessionId) => {
      try {
        if (!sessionId) {
          setLoading(false);
          return;
        }

        const data = await fetchSessionData(sessionId);
        setSession(data);
        await updateStockAndClearCart(data, sessionId);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    handleCheckoutSession(sessionId);
    
  }, [location.search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!session) return <p>No session data found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <h1 className="mb-6">Order Receipt</h1>
      <p className="text-lg text-gray-700 mb-4">
        Thank you,{" "}
        <span className="font-semibold text-gray-900">{session.customer_details.name}</span>
        , for your purchase! We appreciate your business.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <span className="font-semibold">Payment Status:</span>{" "}
        <span className={`${session.payment_status === "paid" ? "text-green-600" : "text-red-600"}`}>
          {session.payment_status}
        </span>
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Items Purchased:</h2>
      <ul className="space-y-4">
        {session.line_items.data.map((item) => (
          <li key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <span className="font-medium text-gray-900">{item.quantity} x {item.description}</span>
            <span className="text-gray-800">${(item.amount_total / 100).toFixed(2)}</span>
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

