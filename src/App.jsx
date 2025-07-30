import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalProvider } from "./Context/context";
import Homepage from "./pages/Homepage";
import TravelDetail from "./pages/TravelDetail";
import DefaultLayout from "./layout/DefaultLayout";
import DestinationsList from "./pages/DestinationsList";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" Component={Homepage} />
              <Route path="/destinationsList" Component={DestinationsList} />
              <Route path="/destinations/:id" Component={TravelDetail} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
