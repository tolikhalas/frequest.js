import { create } from "zustand";

type StoreState = {
  frequency: string;
  setFrequency: (frequency: string) => void;
};

const useStore = create<StoreState>((set) => ({
  frequency: "",
  setFrequency: (frequency: string) => set({ frequency }),
}));

export default useStore;
