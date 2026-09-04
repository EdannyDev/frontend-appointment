import { useEffect } from "react";

// Bloquea el scroll del body/html mientras la condición sea verdadera (modales, overlays)
export const useLockBodyScroll = (locked) => {
  useEffect(() => {
    if (!locked) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [locked]);
};