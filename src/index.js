import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetContextProvider } from "./contexts/BudgetContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BudgetContextProvider>
      <App />
    </BudgetContextProvider>
  </React.StrictMode>
);
