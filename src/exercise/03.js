import { useState, useEffect } from "react";

export function useMouseCoordinates() {
  const [coordinates, setCoordinates] = useState({ clientX: 0, clientY: 0 });

  useEffect(() => {
    function handleMouseMove(event) {
      setCoordinates({ clientX: event.clientX, clientY: event.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return coordinates;
}