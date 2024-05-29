export type TSelectable<T extends Record<string, unknown>> = T & {
  isSelected: boolean;
  select: () => Promise<void>;
};
