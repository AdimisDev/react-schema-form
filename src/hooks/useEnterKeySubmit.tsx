import { useEffect, useRef } from "react";

const useEnterKeySubmit = (callback: () => void, formKey: string) => {
  const lastFocusedElement = useRef<EventTarget | null>(null);

  useEffect(() => {
    const form = document.getElementById(formKey);
    if (!form) return;

    const handleFocusIn = (event: FocusEvent) => {
      if (form.contains(event.target as Node)) {
        lastFocusedElement.current = event.target;
      } else {
        lastFocusedElement.current = null;
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).tagName === "TEXTAREA") {
        return;
      }
      if (event.keyCode === 13 || event.key === "Enter") {
        if (lastFocusedElement.current && form.contains(lastFocusedElement.current as Node)) {
          event.preventDefault();
          callback();
        }
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback, formKey]);

  return null;
};

export default useEnterKeySubmit;
