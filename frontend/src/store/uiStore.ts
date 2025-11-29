import { create } from "zustand";

type UIState = {
  view: "grid" | "tile";
  setView: (v: "grid" | "tile") => void;
};

const useUIStore = create<UIState>((set) => ({
  view: "tile",
  setView: (v) => set({ view: v })
}));

export default useUIStore;
