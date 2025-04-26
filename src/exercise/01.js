import { useEffect } from "react";

export function useDocumentTitle() {
  useEffect(() => {
    document.title = "Welcome to the home page!";
  }, []);
}