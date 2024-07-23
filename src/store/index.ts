import { create } from "zustand";

const useStore = create((set) => ({
  frequency: "",
  setFrequency: (frequency: string) => set({ frequency }),
}));

export default useStore;
