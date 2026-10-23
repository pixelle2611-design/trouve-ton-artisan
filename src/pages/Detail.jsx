import Rating from "../components/Rating.jsx";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useData from "../services/useData.js";
import Meta from "../components/Meta.jsx";
import Status from "../components/Status.jsx";
import Contact from "../components/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";
export default function Detail() {
  const { id } = useParams();
  const { data, error } = useData("/artisans/" + encodeURIComponent(id));
  if (error === "Artisan introuvable." || !/^[1-9][0-9]{0,8}$/.test(id))
    return <NotFound />;
  if (!data)
    return (
      <section className="container section">
        <Status error={error} />
      </section>
    );
  return (
    <section className="container section">
      <Meta
        title={data.name}
        description={
          data.name +
          " : " +
          data.specialty.name +
          " à " +
          data.city +
          ". Consultez sa fiche et contactez cet artisan."
        }
      />
      <Link to={"/categorie/" + data.specialty.category.id}>
        ← {data.specialty.category.name}
      </Link>
      <div className="row g-4 mt-2">
        <div className="col-lg-6">
          <img
            className="artisan-image"
            src={data.image || "/artisan.svg"}
            alt={"Illustration de la fiche de " + data.name}
          />
          <p className="eyebrow mt-4">{data.specialty.name}</p>
          <h1>{data.name}</h1>
          <Rating value={data.rating} />
          <p>{data.city}</p>
          <h2>À propos</h2>
          <p>{data.about}</p>
          {/^https?:\/\//.test(data.website || "") && (
            <a href={data.website} target="_blank" rel="noopener noreferrer">
              Visiter le site de l’artisan (nouvel onglet)
            </a>
          )}
        </div>
        <div className="col-lg-6">
          <Contact key={id} id={id} />
        </div>
      </div>
    </section>
  );
}

