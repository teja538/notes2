import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { FilterSortProvider } from "./context/filterSortContext";
import "./index.css";
import "./utils.css";
import App from "./App";
import "https://kit.fontawesome.com/a076d05399.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FilterSortProvider>
        <App />
      </FilterSortProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
