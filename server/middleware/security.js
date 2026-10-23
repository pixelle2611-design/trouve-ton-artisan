import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
// Limiter avant la passerelle : une requête rejetée ne doit atteindre ni SQL ni SMTP.
export function installSecurity(app) {
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "upgrade-insecure-requests":
          process.env.NODE_ENV === "production" ? [] : null,
      },
    },
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(
  "/api",
  rateLimit({
    windowMs: 60000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Trop de requêtes. Réessayez dans une minute." },
  }),
);
app.use(
  "/api/artisans/:id/contact",
  rateLimit({
    windowMs: 15 * 60000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Trop de messages. Réessayez dans 15 minutes." },
  }),
);

}
