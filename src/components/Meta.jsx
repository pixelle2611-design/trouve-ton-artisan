import React, { useEffect } from "react";
export default function Meta({ title, description }) {
  useEffect(() => {
    document.title = title + " | Trouve ton artisan";
    document.querySelector('meta[name="description"]').content = description;
  }, [title, description]);
  return null;
}
