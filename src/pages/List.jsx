import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useData from "../services/useData.js";
import Meta from "../components/Meta.jsx";
import Cards from "../components/Cards.jsx";
import Status from "../components/Status.jsx";
import NotFound from "../pages/NotFound.jsx";
export default function List() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const categories = useData("/categories");
  const { data, error } = useData(
    "/artisans?" +
      (id
        ? "category=" + encodeURIComponent(id)
        : "q=" + encodeURIComponent(q)),
  );
  const category = categories.data?.find((c) => String(c.id) === id);
  if (id && categories.data && !category) return <NotFound />;
  const title = id
    ? category?.name || "Artisans"
    : q
      ? "Recherche : " + q
      : "Tous les artisans";
  return (
    <section className="container section">
      <Meta
        title={title}
        description={"Découvrez les artisans en Auvergne-Rhône-Alpes. " + title}
      />
      <Link to="/">Accueil</Link>
      <h1 className="mt-4">{title}</h1>
      {data ? (
        <>
          {data.length ? (
            <>
              <p>
                {data.length} artisan{data.length > 1 ? "s" : ""}
              </p>
              <h2 className="visually-hidden">Artisans disponibles</h2>
              <Cards data={data} />
            </>
          ) : (
            <p role="status">Aucun artisan ne correspond à votre recherche.</p>
          )}
        </>
      ) : (
        <Status error={error} />
      )}
    </section>
  );
}
