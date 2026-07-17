import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource-variable/sora";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import App from "./App.jsx";
import ExecutiveOverview from "./pages/ExecutiveOverview.jsx";
import IndustryComparison from "./pages/IndustryComparison.jsx";
import CompanyDeepDive from "./pages/CompanyDeepDive.jsx";
import GrcRiskView from "./pages/GrcRiskView.jsx";
import Recommendations from "./pages/Recommendations.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<ExecutiveOverview />} />
          <Route path="industries" element={<IndustryComparison />} />
          <Route path="companies" element={<CompanyDeepDive />} />
          <Route path="grc" element={<GrcRiskView />} />
          <Route path="recommendations" element={<Recommendations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
