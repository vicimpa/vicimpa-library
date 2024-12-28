type IntersectionListener = (entry: IntersectionObserverEntry) => void;
type ResizeListener = (entry: ResizeObserverEntry) => void;

export function intersectionObserver<T extends Element>(target: T | null | undefined, listener: IntersectionListener) {
  if (!target)
    return () => { };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      listener(entry);
    });
  }, { threshold: 0.1 });

  observer.observe(target);

  return () => {
    observer.unobserve(target);
    observer.disconnect();
  };
}

export function resizeObserver<T extends Element>(target: T | null | undefined, listener: ResizeListener) {
  if (!target)
    return () => { };

  const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
      listener(entry);
    });
  });

  observer.observe(target);

  return () => {
    observer.unobserve(target);
    observer.disconnect();
  };
}
