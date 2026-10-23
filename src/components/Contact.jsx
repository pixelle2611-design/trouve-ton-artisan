import React, { useState } from "react";
import { api } from "../services/api.js";
export default function Contact({ id }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    const form = e.currentTarget;
    try {
      const result = await api("/artisans/" + id + "/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(result.message);
      form.reset();
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="contact-panel">
      <h2>Contacter cet artisan</h2>
      <p>
        Tous les champs sont obligatoires. Une réponse sera apportée sous 48h.
      </p>
      <form onSubmit={submit}>
        {[
          ["name", "Nom", "text", 100],
          ["email", "Email", "email", 254],
          ["subject", "Objet", "text", 150],
        ].map(([name, label, type, max]) => (
          <div className="mb-3" key={name}>
            <label className="form-label" htmlFor={name}>
              {label}
            </label>
            <input
              className="form-control"
              id={name}
              name={name}
              type={type}
              maxLength={max}
              autoComplete={
                name === "name" ? "name" : name === "email" ? "email" : "off"
              }
              required
            />
          </div>
        ))}
        <label className="form-label" htmlFor="message">
          Message
        </label>
        <textarea
          className="form-control mb-3"
          id="message"
          name="message"
          rows="6"
          maxLength="5000"
          required
        />
        <button className="btn btn-primary" disabled={busy}>
          {busy ? "Envoi en cours…" : "Envoyer le message"}
        </button>
        <p className="mt-3" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  );
}
