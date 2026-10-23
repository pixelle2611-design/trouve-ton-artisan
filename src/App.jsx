import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { legalPages } from "./legalPages.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Detail from "./pages/Detail.jsx";
import Legal from "./pages/Legal.jsx";
import NotFound from "./pages/NotFound.jsx";
export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [location.pathname, location.search]);
  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <Header />
      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisans" element={<List />} />
          <Route path="/categorie/:id" element={<List />} />
          <Route path="/artisan/:id" element={<Detail />} />
          {Object.entries(legalPages).map(([slug, title]) => (
            <Route
              key={slug}
              path={"/" + slug}
              element={<Legal title={title} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
