import "dotenv/config";
import express from "express";
import { createGateway } from "./middleware/gateway.js";
import { installSecurity } from "./middleware/security.js";
import { randomBytes, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./models.js";
import { router } from "./routes/artisans.js";
import { onError } from "./middleware/errors.js";

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 3001);
const origin = new URL(process.env.APP_ORIGIN || "http://localhost:5173")
  .origin;
const app = express();
app.set("trust proxy", Number(process.env.TRUST_PROXY || 0));
installSecurity(app);

// API privée : seul le serveur de l'application possède la clé, jamais React.
const privateApi = express();
const key = randomBytes(32).toString("hex");
privateApi.use(express.json({ limit: "16kb" }));
privateApi.use((req, res, next) => {
  const token = Buffer.from(req.get("x-app-key") || "");
  const expected = Buffer.from(key);
  if (token.length !== expected.length || !timingSafeEqual(token, expected))
    return res.status(403).json({ error: "Accès interdit." });
  next();
});
privateApi.use(router);
privateApi.use(onError);

try {
  await db.authenticate();
} catch {
  console.error("Connexion SQL impossible. Vérifiez la configuration DB et la disponibilité du serveur.");
  await db.close();
  process.exit(1);
}
const privateServer = privateApi.listen(0, "127.0.0.1");
await new Promise((resolve) => privateServer.once("listening", resolve));
const privatePort = privateServer.address().port;
app.use("/api", createGateway({ privatePort, key, origin }));
app.use(express.static(path.join(base, "dist")));
app.get("/{*path}", (req, res) =>
  res.sendFile(path.join(base, "dist/index.html")),
);
app.use(onError);
const server = app.listen(port, () =>
  console.log("Application : http://localhost:" + port),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () =>
    server.close(async () => {
      privateServer.close();
      await db.close();
      process.exit(0);
    }),
  );
