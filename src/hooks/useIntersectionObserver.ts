import { useEffect, useRef, useState } from "react";

type Elem = Element | null;

const useIntersectionObserver = (
  elemRef: React.RefObject<Elem>,
  options: IntersectionObserverInit,
) => {
  const observeRef = useRef<IntersectionObserver>();
  const [entires, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const node = elemRef.current;

    if (!node) return;
    observeRef.current = new IntersectionObserver(setEntries, options);
    observeRef.current.observe(elemRef.current);

    return () => {
      observeRef.current?.disconnect();
    };
  }, [elemRef, options]);

  return { entires, observeRef };
};

export default useIntersectionObserver;
