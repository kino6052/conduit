import React, { useEffect } from "react";

export function withOnMount<T extends Record<string, unknown>>(
  WrappedComponent: React.FC<T>,
) {
  const Component: React.FC<T & { onMount: () => void }> = (props) => {
    useEffect(() => {
      props.onMount();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Component;
}
