export async function api(url, options) {
  const response = await fetch("/api" + url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Une erreur est survenue.");
  return data;
}
