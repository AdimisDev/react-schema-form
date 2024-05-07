import { FieldValues } from "react-hook-form";

export function handleStorage<TFieldValues extends FieldValues>(
  key: string,
  value: TFieldValues,
  persistFormResponse: "localStorage" | "sessionStorage" | undefined
) {
  if (
    typeof window !== "undefined" &&
    window.localStorage &&
    window.sessionStorage &&
    persistFormResponse
  ) {
    switch (persistFormResponse) {
      case "localStorage":
        return localStorage.setItem(key, JSON.stringify(value));
      case "sessionStorage":
        return sessionStorage.setItem(key, JSON.stringify(value));
    }
  }
}
