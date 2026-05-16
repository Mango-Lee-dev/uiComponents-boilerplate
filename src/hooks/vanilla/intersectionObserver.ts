const vanillaIntersectionObserver = (
  $elem: Element,
  options: IntersectionObserverInit,
  callback: (entries: IntersectionObserverEntry[]) => void,
) => {
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!$elem) return;
    callback(entries);
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  observer.observe($elem);

  return observer;
};

export default vanillaIntersectionObserver;
