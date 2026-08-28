import React, { memo } from "react";
import { isEqual, isFunction, isObject, isSymbol } from "lodash";

const MAX_LEVEL = 3;

export function checkBehaviorlessEqual<T extends Record<string, unknown>>(
  prev: T,
  next: T,
) {
  const removeBehavior = (obj: Record<string, unknown>, level = 0) => {
    const hasExceededLevel = level > MAX_LEVEL;
    return Object.fromEntries(
      Object.entries(obj)
        .filter(
          ([key, value]) =>
            key !== "children" && // if contains a React component
            !isFunction(value) &&
            !isSymbol(value) &&
            !hasExceededLevel,
        )
        .map(([key, value]) => {
          if (isObject(value)) return [key, removeBehavior(value, level + 1)];
          return [key, value];
        }),
    ) as Record<string, unknown>;
  };

  return isEqual(removeBehavior(prev), removeBehavior(next));
}

export function withBehaviorlessMemo<T extends Record<string, unknown>>(
  WrappedComponent: React.FC<T>,
) {
  return memo(WrappedComponent, checkBehaviorlessEqual);
}
