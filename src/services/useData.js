import { useEffect, useState } from "react";
import { api } from "./api.js";
// Ignorer les réponses tardives après navigation ou démontage du composant.
export default function useData(url) {
  const [state, setState] = useState({ data: null, error: "" });
  useEffect(() => {
    let active = true;
    setState({ data: null, error: "" });
    api(url)
      .then((data) => {
        if (active) setState({ data, error: "" });
      })
      .catch((error) => {
        if (active) setState({ data: null, error: error.message });
      });
    return () => {
      active = false;
    };
  }, [url]);
  return state;
}
