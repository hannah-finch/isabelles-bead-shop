import { useState } from "react";
import { Button } from "@material-tailwind/react";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      <Button> Button </Button>
    </>
  );
}

export default App;
