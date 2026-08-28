export interface IControl {
  isDisabled: boolean;
  text: string;
  onActivate?: () => Promise<void>;
}
