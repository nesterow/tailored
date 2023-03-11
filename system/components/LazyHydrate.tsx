/**
MIT License

Copyright (c) 2023 Anton Nesterov, anton@demiurg.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import type { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useEventListener } from "../hooks/useEventListener.ts";
import { useDebounceCallback } from "../hooks/useDebounceCallback.ts";
import { h, hydrate } from "preact";

const isServer = typeof document === "undefined";
export interface LazyHydrateProps {
  id: string;
  children: JSX.Element | JSX.Element[];
  event?: string;
  tagName?: string;
  classNames?: string[];
}

LazyHydrate.defaultProps = {
  event: "visible",
  tagName: "section",
  classNames: ["x-non-hydrated", "x-hydrated"],
};

/**
 * Wraps the component with a `tagName`, default is `section`.
 * Requires an unique `id` set manualy.
 * Listens to the `event` on the `document` and hydrates the component.
 * Default emitted custom event is `visible`, dispatched by an IntersectionObserver.
 */
export default function LazyHydrate(
  { children, event, tagName, id, classNames }: LazyHydrateProps,
) {
  const [nonHydratedCls, hydratedCls] = classNames!;

  if (isServer) {
    return h(tagName!, { id, className: nonHydratedCls }, children);
  }

  if (document.querySelectorAll(`#${id}`).length > 1) {
    throw new Error(`LazyHydrate: id ${id} is not unique`);
  }

  const ref = useRef(document.getElementById(id));
  const eventName = "hydrate" + id;
  let observer: IntersectionObserver;

  if (event !== "visible") {
    useEventListener(
      event!,
      () => {
        const event = new CustomEvent(eventName);
        document.dispatchEvent(event);
      },
      useRef(document),
      { once: true },
    );
  } else {
    useEffect(() => {
      if (
        "IntersectionObserver" in window
      ) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const event = new CustomEvent(eventName);
                document.dispatchEvent(event);
                observer.disconnect();
              }
            });
          },
          { threshold: 0.1 },
        );
        observer.observe(ref.current!);
        return () => {
          observer?.disconnect();
        };
      }
    }, []);
  }

  const render = useDebounceCallback(() => {
    hydrate(children, ref.current!);
    ref.current?.classList.remove(nonHydratedCls);
    ref.current?.classList.add(hydratedCls);
    observer?.disconnect();
  }, 25);

  useEventListener(
    eventName,
    render.callback,
    useRef(document),
    { once: true },
  );

  return h(tagName!, {
    id,
    className: nonHydratedCls,
    dangerouslySetInnerHTML: {
      __html: ref.current?.innerHTML ?? "",
    },
  });
}
