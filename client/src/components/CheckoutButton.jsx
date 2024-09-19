import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState, useEffect } from "react";

export default function CheckoutButton({ cartItems }) {
  const stripePromise = loadStripe(
    "pk_test_51Q0PNPRsgFYbL1k9OiuGur0KmNMcLfZuRTibSCBbdOhAxdDvW7mUAqKCSwkUHh4Zfj1EHEKiS0z0UmPspKr4iJLo009TPMkibs"
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const [stripeItems, setStripeItems] = useState([]);
  const modalRef = useRef(null);

  // TODO: dummy cata for testing cartItems
  // const testItems = [
  //   { name: "item1", price: 1000 },
  //   { name: "item2", price: 2000 },
  //   { name: "item3", price: 3000 },
  // ];
  // cartItems = testItems;

  // update stripeItems when cartItems changes
  useEffect(() => {
    // Group items by ID and calculate quantities
    const groupedItems = cartItems.reduce((acc, item) => {
      if (acc[item._id]) {
        acc[item._id].quantity += 1;
      } else {
        acc[item._id] = { ...item, quantity: 1 };
      }
      console.log(acc);
      return acc;
    }, {});

    // Convert grouped items into an array of objects that Stripe can understand
    const newStripeItems = Object.values(groupedItems).map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price
        },
        quantity: item.quantity,
      };
    });
    setStripeItems(newStripeItems);
  }, [cartItems]);

  const fetchClientSecret = useCallback(() => {
    // create a checkout session on the server
    return fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: stripeItems }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [stripeItems]);

  const options = { fetchClientSecret };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current?.close();
  };

  // TODO: Button style required, the modal has a button too
  return (
    <div id="checkout">
      <button
        onClick={handleCheckoutClick}
        disabled={stripeItems.length === 0}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          stripeItems.length === 0 ? "opacity-50" : ""
        }`}
      >
        {stripeItems.length === 0 ? "Empty" : "Checkout"}
      </button>
      <dialog ref={modalRef}>
        {showCheckout && (
          <div>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
        <form method="dialog">
          <button onClick={handleCloseModal}>Close</button>
        </form>
      </dialog>
    </div>
  );
}
