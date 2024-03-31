import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration.js';

import CounterContextProvider from "./context/counter-context/CounterContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CounterContextProvider clientId="84231921122-qdkdmjp1t6or2m2524i110fks5lo95ov.apps.googleusercontent.com">
      <App />
    </CounterContextProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();