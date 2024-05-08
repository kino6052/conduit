export function getAsyncRefresh<T extends () => Promise<void>>(
  action: T,
  refresh?: () => void,
) {
  return async () => {
    const result = action().then(() => {
      refresh?.();
    });

    refresh?.();

    return result;
  };
}
