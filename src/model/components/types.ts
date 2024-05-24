export interface ISelectable {
  isSelected: boolean;
  select: () => Promise<void>;
  id: string;
}
