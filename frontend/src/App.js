import React from "react";
import "@/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "@/pages/HomePage";
import WorkSamplePage from "@/pages/WorkSamplePage";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
