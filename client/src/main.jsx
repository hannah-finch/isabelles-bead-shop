import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

//importing tailwind
import "./index.css";

//Importing pages
import HomePage from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AboutPage from "./pages/About.jsx";
import AccountPage from "./pages/Account.jsx";
import CartPage from "./pages/Cart.jsx";
import Signup from "./pages/Signup.jsx";
import ProductPage from "./pages/Product.jsx";
import AdminPage from "./pages/Admin.jsx";

import { ThemeProvider } from "@material-tailwind/react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Page Not Found</h1>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/account/:userId",
        element: <AccountPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/product/:productId",
        element: <ProductPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      }
      // Add more routes here...
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
