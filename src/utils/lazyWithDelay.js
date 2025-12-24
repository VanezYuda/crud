import { lazy } from "react";

export function lazyWithDelay(importFn, delay = 1000) {
  return lazy(() =>
    Promise.all([
      importFn(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([module]) => module)
  );
}
