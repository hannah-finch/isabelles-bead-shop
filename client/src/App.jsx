import { Outlet } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { ProductsProvider } from "./utils/ProductsContext.jsx";

import Header from "./components/header";
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
  return (
    <>
      <ApolloProvider client={client}>
        <ProductsProvider>
          <ScrollToTop />
          <Header />

          <main>
            <Outlet />
          </main>

          <Footer />
        </ProductsProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
