import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { Providers } from "./app/providers";
import { Toaster } from "sonner";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <Toaster position="top-right" />
    </Providers>
  </React.StrictMode>
);
