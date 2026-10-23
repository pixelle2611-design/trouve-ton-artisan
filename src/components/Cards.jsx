import React from "react";
import Card from "../components/Card.jsx";
export default function Cards({ data }) {
  return (
    <div className="row g-4">
      {data.map((a) => (
        <Card key={a.id} artisan={a} />
      ))}
    </div>
  );
}
