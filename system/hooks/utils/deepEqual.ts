// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
// deno-lint-ignore no-explicit-any
type AnyThing = any;

export function deepEqual(a: AnyThing, b: AnyThing) {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }

  let length, i, keys;

  if (a && b && typeof a == "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }

    for (i = length; i-- !== 0;) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return a !== a && b !== b;
}
