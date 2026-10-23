export function createGateway({ privatePort, key, origin }) {
// La passerelle rend uniquement les routes de consultation et de contact publiques.
return async (req, res) => {
  const allowed =
    (req.method === "GET" &&
      /^\/(categories|artisans)(\/[1-9][0-9]{0,8})?$/.test(req.path)) ||
    (req.method === "POST" &&
      /^\/artisans\/[1-9][0-9]{0,8}\/contact$/.test(req.path));
  if (!allowed) return res.status(404).json({ error: "Route introuvable." });
  if (req.method === "POST" && req.get("origin") !== origin)
    return res.status(403).json({ error: "Origine interdite." });
  const response = await fetch("http://127.0.0.1:" + privatePort + req.url, {
    method: req.method,
    headers: { "x-app-key": key, "content-type": "application/json" },
    signal: AbortSignal.timeout(15000),
    ...(req.method === "POST" ? { body: JSON.stringify(req.body) } : {}),
  });
  res.status(response.status).json(await response.json());
};
}

