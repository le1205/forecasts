import { StateCreator } from 'zustand';

type State = {
  city: string;
};

type Action = {
  setCity: (value : string) => void;
};

export type CitySlice = State & Action;

export const createCityStore: StateCreator<CitySlice> = (set) => ({
  city: "",
  setCity: (value) => {
    set((state) => ({
      ...state,
      city: value
    }));
  }
});
