import React, { useEffect } from "react";
import "@/App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "@/pages/HomePage";
import WorkSamplePage from "@/pages/WorkSamplePage";

const routerBaseName = import.meta.env.BASE_URL.replace(/\/$/, "");

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash || location.hash;

    if (!hash) {
      return;
    }

    const timeoutIds = [];

    const getHeaderOffset = () => {
      const header = document.querySelector("header");
      return header ? header.getBoundingClientRect().height + 16 : 16;
    };

    const scrollToHash = (behavior = "auto") => {
      const element = document.querySelector(hash);

      if (!element) return;

      const headerOffset = getHeaderOffset();
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior });
    };

    requestAnimationFrame(() => scrollToHash("smooth"));

    [100, 300, 700, 1200].forEach((delay) => {
      const timeoutId = window.setTimeout(() => scrollToHash("auto"), delay);
      timeoutIds.push(timeoutId);
    });

    const handleLoad = () => scrollToHash("auto");
    window.addEventListener("load", handleLoad);

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.removeEventListener("load", handleLoad);
    };
  }, [location.hash, location.pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={routerBaseName}>
      <HashScrollHandler />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "'Lato', 'Helvetica', sans-serif",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<WorkSamplePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
