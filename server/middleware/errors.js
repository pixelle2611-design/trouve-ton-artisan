export function onError(err, req, res, next) {
  if (res.headersSent) return next(err);
  console.error("Erreur serveur :", err.name || "Error");
  res
    .status(
      err.type === "entity.too.large"
        ? 413
        : err.type === "entity.parse.failed"
          ? 400
          : 500,
    )
    .json({
      error: "La requête ne peut pas être traitée. Réessayez plus tard.",
    });
}
