import * as React from "react";
import App from "containers/App";
import ContextProviders from "ContextProviders";
import registerIcons from "./utils/FaIcons";
import { createRoot } from "react-dom/client";
registerIcons();
const root = createRoot(document.getElementById("app")!);
root.render(
  <ContextProviders>
    <App />
  </ContextProviders>
);
