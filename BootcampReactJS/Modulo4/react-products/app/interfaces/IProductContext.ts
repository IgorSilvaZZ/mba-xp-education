export interface IProductContext {
  currentView: "details" | "list";
  selectIdProduct: number | null;
  clear: () => void;
  handleCurrentView: (newCurrent: "details" | "list") => void;
  handleSelectIdProduct: (productId: number | null) => void;
}
