import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState } from "react";

export default function CheckoutButton() {
  const stripePromise = loadStripe(
    "pk_test_51Q0PNPRsgFYbL1k9OiuGur0KmNMcLfZuRTibSCBbdOhAxdDvW7mUAqKCSwkUHh4Zfj1EHEKiS0z0UmPspKr4iJLo009TPMkibs"
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const modalRef = useRef(null);

  const fetchClientSecret = useCallback(() => {
    // create a checkout session on the server
    return fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId: "price_1Q0RZuRsgFYbL1k98rAMtBcZ" }),
    })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current?.close();
  };

  return (
    <div id="checkout">
      <button onClick={handleCheckoutClick}>Checkout</button>
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
