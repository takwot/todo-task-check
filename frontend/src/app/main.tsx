import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.scss";
import RouterProvider from "./providers/RouterProvider.tsx";
import { AppProviders } from "./providers";
import "../shared/config/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider />
    </AppProviders>
  </StrictMode>
);
