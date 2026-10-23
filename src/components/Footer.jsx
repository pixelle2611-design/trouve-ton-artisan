import React from "react";
import { Link } from "react-router-dom";
import { legalPages } from "../legalPages.js";
export default function Footer() {
  return (
    <footer>
      <div className="container row-footer">
        <div>
          <p className="footer-title">Auvergne-Rhône-Alpes</p>
          <address>
            101 cours Charlemagne
            <br />
            CS 20033
            <br />
            69269 LYON CEDEX 02
            <br />
            France
            <br />
            <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
          </address>
        </div>
        <nav aria-label="Informations légales">
          {Object.entries(legalPages).map(([slug, name]) => (
            <Link key={slug} to={"/" + slug}>
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
