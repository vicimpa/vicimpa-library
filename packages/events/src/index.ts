type Target<T extends HTMLElement> = T | null | undefined | { value?: T | null; } | { current?: T | null; };
type TargetSvg<T extends SVGElement> = T | null | undefined | { value?: T | null; } | { current?: T | null; };

export const elementEvents = <
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  element: Target<T>,
  event: K | K[],
  listener: (event: HTMLElementEventMap[K], current: T) => void
) => {
  if (!element) { }
  else if ('value' in element)
    element = element.value;
  else if ('current' in element)
    element = element.current;

  const _element = element as T | null | undefined;

  if (!_element)
    return () => { };

  event = ([] as K[]).concat(event);

  const controller = new AbortController();

  const listenerCustom = (event: HTMLElementEventMap[K]) => {
    listener(event, _element);
  };

  for (const _event of event)
    _element.addEventListener(_event, listenerCustom, controller);

  return () => {
    controller.abort();
  };
};

export const svgElementEvents = <
  K extends keyof SVGElementEventMap,
  T extends SVGElement
>(
  element: TargetSvg<T>,
  event: K | K[],
  listener: (event: SVGElementEventMap[K], current: T) => void
) => {
  if (!element) { }
  else if ('value' in element)
    element = element.value;
  else if ('current' in element)
    element = element.current;

  const _element = element as T | null | undefined;

  if (!_element)
    return () => { };

  event = ([] as K[]).concat(event);

  const controller = new AbortController();

  const listenerCustom = (event: SVGElementEventMap[K]) => {
    listener(event, _element);
  };

  for (const _event of event)
    _element.addEventListener(_event, listenerCustom, controller);

  return () => {
    controller.abort();
  };
};

export const documentEvents = <K extends keyof DocumentEventMap>(
  event: K | K[],
  listener: (event: DocumentEventMap[K]) => void
) => {
  event = ([] as K[]).concat(event);

  const controller = new AbortController();

  for (const _event of event)
    document.addEventListener(_event, listener, controller);

  return () => {
    controller.abort();
  };
};

export const windowEvents = <K extends keyof WindowEventMap>(
  event: K[] | K,
  listener: (event: WindowEventMap[K]) => void
) => {
  event = ([] as K[]).concat(event);

  const controller = new AbortController();

  for (const _event of event)
    addEventListener(_event, listener, controller);

  return () => {
    controller.abort();
  };
};