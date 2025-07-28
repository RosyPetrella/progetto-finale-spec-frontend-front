import { useState, useContext } from "react";

import { GlobalProvider } from "./Context/context";

function App() {
  return (
    <>
      <GlobalProvider></GlobalProvider>
    </>
  );
}

export default App;
