export interface ITab {
  name: string;
  id: string;
  isSelected: boolean;
  open: () => Promise<void>;
}
