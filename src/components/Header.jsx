import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useData from "../services/useData.js";
import Status from "../components/Status.jsx";
export default function Header() {
  const { data, error } = useData("/categories");
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  // Fermer à la navigation ; Échap rend le focus au bouton du menu.
  useEffect(() => setOpen(false), [location.pathname, location.search]);
  const [search, setSearch] = useState("");
  return (
    <header>
      <div className="container header-top">
        <Link to="/" aria-label="Trouve ton artisan - Accueil">
          <img
            src="/Logo.png"
            className="logo"
            alt="Trouve ton artisan ! Avec la région Auvergne-Rhône-Alpes"
          />
        </Link>
        <form
          className="search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/artisans?q=" + encodeURIComponent(search.trim()));
          }}
        >
          <label htmlFor="search">Rechercher un artisan par son nom</label>
          <div className="input-group">
            <input
              id="search"
              className="form-control"
              type="search"
              maxLength="100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nom de l’artisan"
            />
            <button className="btn btn-primary">Rechercher</button>
          </div>
        </form>
      </div>
      <nav aria-label="Catégories d’artisanat" onKeyDown={(e) => {
        if (e.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
      }}>
        <div className="container"><button ref={toggle} type="button" className="menu-toggle"
          aria-expanded={open} aria-controls="category-links" onClick={() => setOpen(!open)}>
          <span aria-hidden="true">☰ </span>Menu des catégories
        </button></div>
        <div id="category-links" className={"container category-menu" + (open ? " is-open" : "")}>
          {data ? (
            data.map((c) => (
              <NavLink onClick={() => setOpen(false)} key={c.id} to={"/categorie/" + c.id}>
                {c.name}
              </NavLink>
            ))
          ) : (
            <Status error={error} />
          )}
        </div>
      </nav>
    </header>
  );
}
