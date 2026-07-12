const vanillaIntersectionObserverV2 = (
  $elem: Element | HTMLElement[],
  options: IntersectionObserverInit,
  callback: (entries: IntersectionObserverEntry[]) => void,
) => {
  const entriesState: Map<Element, IntersectionObserverEntry> = new Map();
  if (!$elem) return;

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const $item = entry.target as Element;
      entriesState.set($item, entry);
    });
    callback(
      Array.from(entriesState.values()).filter((entry) => entry.isIntersecting),
    );
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  if (Array.isArray($elem)) $elem.forEach((n) => n && observer.observe(n));
  else observer.observe($elem);

  return observer;
};

export default vanillaIntersectionObserverV2;
