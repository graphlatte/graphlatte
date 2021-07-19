import { RefObject, useEffect } from "react";

type Events = MouseEvent | TouchEvent | KeyboardEvent;

export function useClickOutsideOrEscape<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Events) => void,
  withEscape = true,
  ignoreRefs?: RefObject<T>[]
) {
  useEffect(() => {
    function listener(event: Events) {
      if ("key" in event) {
        if (event.key === "Escape") {
          handler(event);
        }
        return;
      }

      const el = ref?.current;

      const ignored = ignoreRefs?.some(
        (x) =>
          x.current === event.target ||
          x.current?.contains(event.target as Node)
      );

      if (!el || el.contains(event.target as Node) || ignored) {
        return;
      }

      handler(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    if (withEscape) {
      document.addEventListener("keydown", listener);
    }

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);

      if (withEscape) {
        document.removeEventListener("keydown", listener);
      }
    };
  }, [ref, handler, withEscape, ignoreRefs]);
}
