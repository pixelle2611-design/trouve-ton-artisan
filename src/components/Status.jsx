import React from "react";
export default function Status({ error }) {
  return error ? (
    <p role="alert" className="alert alert-danger">
      {error}
    </p>
  ) : (
    <p role="status">Chargement…</p>
  );
}
