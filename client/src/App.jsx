import { Outlet, useLocation } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { ProductsProvider } from "./utils/ProductsContext.jsx";

import Announcement from "./components/header-things/Announcement";
import BannerHome from "./components/header-things/BannerHome";
import Navbar from "./components/header-things/Navbar";
import Banner from "./components/header-things/Banner";
import Footer from "./components/footer";
import ScrollToTop from "./utils/scroll-to-top.jsx";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  const location = useLocation();
  return (
    <>
      <ApolloProvider client={client}>
        <ProductsProvider>
          <ScrollToTop />

          <header>
            <Announcement />
            {location.pathname === "/" ? (
              <>
                <BannerHome />
                <Navbar />
              </>
            ) : (
              <>
                <Navbar />
                {location.pathname !== "/admin" && <Banner />}
              </>
            )}
          </header>
          
          <main>
            <Outlet />
          </main>

          {location.pathname !== "/admin" && <Footer />}
        </ProductsProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
