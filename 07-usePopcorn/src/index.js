import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
// import StarRating from "./components/StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));

//

root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      size={25}
      color={"red"}
      messages={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
    />
    <Test /> */}
  </React.StrictMode>
);
