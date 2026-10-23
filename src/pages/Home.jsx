import React from "react";
import { Link } from "react-router-dom";
import useData from "../services/useData.js";
import Meta from "../components/Meta.jsx";
import Cards from "../components/Cards.jsx";
import Status from "../components/Status.jsx";
export default function Home() {
  const { data, error } = useData("/artisans?top=true");
  const steps = [
    "Choisir la catégorie d’artisanat dans le menu.",
    "Choisir un artisan.",
    "Le contacter via le formulaire de contact.",
    "Une réponse sera apportée sous 48h.",
  ];
  return (
    <>
      <Meta
        title="Accueil"
        description="Trouvez votre artisan en Auvergne-Rhône-Alpes : bâtiment, services, fabrication et alimentation."
      />
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Le savoir-faire près de chez vous</p>
          <h1>
            Trouvez l’artisan
            <br />
            qui vous correspond.
          </h1>
          <p>
            Les artisans d’Auvergne-Rhône-Alpes vous accompagnent dans vos
            projets.
          </p>
          <Link to="/artisans" className="btn btn-primary">
            Découvrir les artisans
          </Link>
        </div>
      </section>
      <section className="container section">
        <h2>Comment trouver mon artisan ?</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s}>
              <span className="step-number" aria-hidden="true">
                {i + 1}
              </span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="container section">
        <p className="eyebrow">Notre sélection</p>
        <h2>Les artisans du mois</h2>
        {data ? <Cards data={data} /> : <Status error={error} />}
      </section>
    </>
  );
}
