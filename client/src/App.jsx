import { Outlet } from "react-router-dom";

import Header from './components/header'
import Footer from './components/footer'

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
