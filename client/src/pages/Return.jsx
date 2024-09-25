import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ReturnPage = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(`${window.location.origin.replace('3000', '3001')}/create-checkout-session/${sessionId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSession(data);
          setLoading(false); // Set loading to false after successful fetch
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
          setError(error.message);
          setLoading(false); // Set loading to false on error
        });
    } else {
      setLoading(false);
    }
  }, [location]);

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
    <div>
      <h1>Order Receipt</h1>
      <p>Payment Status: {session.payment_status}</p>
      <h2>Items Purchased:</h2>
      <ul>
        {session.line_items.data.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.description} - $
            {(item.amount_total / 100).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total Amount: ${(session.amount_total / 100).toFixed(2)}</p>
    </div>
  );
};

export default ReturnPage;
