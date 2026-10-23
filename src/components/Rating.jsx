import React from "react";
export default function Rating({ value }) {
  const note = Number(value);
  return (
    <p className="rating">
      <span aria-hidden="true" className="stars">
        <span>★★★★★</span>
        <span className="filled" style={{ width: (note / 5) * 100 + "%" }}>
          ★★★★★
        </span>
      </span>
      <span className="visually-hidden">Note : </span>
      <span>{note.toLocaleString("fr-FR")} / 5</span>
    </p>
  );
}
