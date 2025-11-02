import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClientGlobal from "./lib/tanstack-query.config.ts";
import ExpenseTrackerPage from "./Pages/ExpenseTracker/ExpenseTrackerPage.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClientGlobal}>
      <ExpenseTrackerPage />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
