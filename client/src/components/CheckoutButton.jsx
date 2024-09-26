import { loadStripe } from "@stripe/stripe-js";

const CheckoutButton = ({ cartItems }) => {
  const stripePromise = loadStripe(
    "pk_test_51Q2G162MBbXhKSWl5DEAnWv59xawhXsLx1ezVYquN9XdN3PkOB8yt71UBZbzXwCZVJIjYIfQZmxkT2GS4ekGLVq900JJH1kTY7"
  );

  // Create a Stripe checkout session and redirect
  const redirectToCheckout = async () => {
    const stripeItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    // set the stripeItems to local storage
    localStorage.setItem("stripeItems", JSON.stringify(stripeItems));
    // map a new array, add the cartItem's _id to local storage with the quantity
    const cartItemsWithId = cartItems.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    localStorage.setItem("cartItemsWithId", JSON.stringify(cartItemsWithId));
    console.log("stripeItems", stripeItems);
    console.log("cartItemsWithId", cartItemsWithId);

    try {
      const response = await fetch("https://isabelles-bead-shop.onrender.com/create-checkout-session", {
      //const response = await fetch("http://localhost:3001/create-checkout-session",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer pk_test_51Q2G162MBbXhKSWl5DEAnWv59xawhXsLx1ezVYquN9XdN3PkOB8yt71UBZbzXwCZVJIjYIfQZmxkT2GS4ekGLVq900JJH1kTY7`,
          },
          body: JSON.stringify({ items: stripeItems }),
        }
      );

      const session = await response.json();

      if (session.sessionId) {
        const stripe = await stripePromise;
        // Ensure stripe instance is loaded
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.sessionId,
        });

        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      }
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  return (
    <div id="checkout">
      <button
        onClick={redirectToCheckout}
        disabled={cartItems.length === 0}
        className={`btn-1 ${cartItems.length === 0 ? "opacity-0" : ""}`}
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutButton;
