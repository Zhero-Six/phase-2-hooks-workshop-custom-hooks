import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return initialValue;
    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue; // Return raw string if not JSON
    }
  });

  useEffect(() => {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }, [key, value]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === key && event.newValue !== JSON.stringify(value)) {
        const newValue = event.newValue;
        if (newValue === null) {
          setValue(initialValue);
        } else {
          try {
            setValue(JSON.parse(newValue));
          } catch {
            setValue(newValue); // Handle raw strings
          }
        }
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue, value]);

  return [value, setValue];
}