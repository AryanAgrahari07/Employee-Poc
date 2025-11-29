import { useState } from "react";

export default function useToggle(initial = false) {
  const [state, setState] = useState<boolean>(initial);
  const on = () => setState(true);
  const off = () => setState(false);
  const toggle = () => setState((s) => !s);
  return { state, on, off, toggle };
}
