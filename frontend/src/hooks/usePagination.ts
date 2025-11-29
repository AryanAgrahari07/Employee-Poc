import { useState } from "react";

export default function usePagination(initialFirst = 10) {
  const [first, setFirst] = useState<number>(initialFirst);
  const [after, setAfter] = useState<string | null>(null);

  function next(cursor?: string | null) {
    setAfter(cursor ?? null);
  }
  function reset() {
    setAfter(null);
  }

  return { first, after, next, reset, setFirst, setAfter };
}
