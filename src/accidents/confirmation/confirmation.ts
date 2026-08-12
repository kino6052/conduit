// A confirmation prompt before a destructive action -- accident, not
// essence. Grounded the same way navigation was (Step 4, "Connecting to
// IO"): the contract is a plain function shape, no mention of dialogs,
// browsers, or window.confirm. The real implementation
// (window.confirm.bind(window)) is wired in at each composition root;
// this file never imports a browser global.

export type TConfirm = (message: string) => boolean;

export function withConfirmation(
  message: string,
  confirm: TConfirm,
  action: () => void,
): () => void {
  return () => {
    if (confirm(message)) action();
  };
}
