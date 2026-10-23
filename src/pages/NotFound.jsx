import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta.jsx";
export default function NotFound() {
  return (
    <section className="container section not-found">
      <Meta
        title="Page non trouvée"
        description="Cette page est introuvable. Revenez à l’accueil pour trouver votre artisan."
      />
      <img src="/404.svg" alt="Illustration : panneau 404" />
      <h1>Page non trouvée</h1>
      <p>La page demandée n’existe pas.</p>
      <Link to="/" className="btn btn-primary">
        Retour à l’accueil
      </Link>
    </section>
  );
}
