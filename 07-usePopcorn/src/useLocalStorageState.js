import { useEffect, useState } from "react";

export function useLocalStorageState(intialstate, key) {
  const [value, setValue] = useState(function () {
    return JSON.parse(localStorage.getItem(key)) || intialstate;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
