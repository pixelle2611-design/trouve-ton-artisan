import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating.jsx";
export default function Card({ artisan }) {
  return (
    <div className="col-md-6 col-lg-4">
      <Link className="card artisan-card h-100" to={"/artisan/" + artisan.id}>
        <div className="card-body">
          <p className="eyebrow">{artisan.specialty.name}</p>
          <h3>{artisan.name}</h3>
          <Rating value={artisan.rating} />
          <p className="mb-0">{artisan.city}</p>
          <span className="card-link-text">Voir la fiche →</span>
        </div>
      </Link>
    </div>
  );
}
