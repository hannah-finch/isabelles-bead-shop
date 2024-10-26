import { loadStripe } from "@stripe/stripe-js";

const CheckoutButton = ({ cartItems }) => {
  const stripePromise = loadStripe(
    "pk_live_51QDtchLgUyYj4eXz7RxtTO0xsFbttatLn6uAHCWRfK39TtBeEsWuumjnWvwz7c5uQHK1vEId59gDCM7uYy9eBGr400Ujqjckoq"
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
      const response = await fetch("https://isabellesbeadshop.onrender.com/create-checkout-session", {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer pk_live_51QDtchLgUyYj4eXz7RxtTO0xsFbttatLn6uAHCWRfK39TtBeEsWuumjnWvwz7c5uQHK1vEId59gDCM7uYy9eBGr400Ujqjckoq`,
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
