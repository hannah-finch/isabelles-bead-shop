import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState, useEffect } from "react";

export default function CheckoutButton({ cartItems }) {
  const stripePromise = loadStripe(
    "pk_test_51Q2G162MBbXhKSWl5DEAnWv59xawhXsLx1ezVYquN9XdN3PkOB8yt71UBZbzXwCZVJIjYIfQZmxkT2GS4ekGLVq900JJH1kTY7"
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const [stripeItems, setStripeItems] = useState([]);
  const modalRef = useRef(null);

  // update stripeItems when cartItems changes
  useEffect(() => {
    // Group items by ID and calculate quantities
    const groupedItems = cartItems.reduce((acc, item) => {
      if (acc[item._id]) {
        acc[item._id].quantity += 1;
      } else {
        acc[item._id] = { ...item, quantity: item.quantity };
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
          unit_amount: item.price,
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
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current?.close();
    document.body.classList.remove("overflow-hidden");
  };

  // TODO: Button style required, the modal has a button too
  return (
    <div id="checkout">
      <button
        onClick={handleCheckoutClick}
        disabled={stripeItems.length === 0}
        className={`btn-1 ${stripeItems.length === 0 ? "opacity-0" : ""}`}
      >
        Checkout
      </button>
      <dialog ref={modalRef} className="w-auto bg-blue-100">
        {showCheckout && (
          <div>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
        <form method="dialog" className="bg-blue-100 p-1">
          <button
            onClick={handleCloseModal}
            className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded`}
          >
            Close
          </button>
        </form>
      </dialog>
    </div>
  );
}
