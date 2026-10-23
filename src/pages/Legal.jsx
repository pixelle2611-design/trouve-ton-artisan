import React from "react";
import Meta from "../components/Meta.jsx";
export default function Legal({ title }) {
  return (
    <section className="container section">
      <Meta title={title} description={title + " - Page en construction."} />
      <h1>{title}</h1>
      <p>Page en construction</p>
    </section>
  );
}
