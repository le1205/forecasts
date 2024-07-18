import { StateCreator } from 'zustand';

export enum ThemeTypes {
  Light = "dark",
  Dark = "light",
}

type State = {
  theme: ThemeTypes;
};

type Action = {
  setTheme: (value : ThemeTypes) => void;
};

const defaultTheme: ThemeTypes = ThemeTypes.Dark;

export type ThemeSlice = State & Action;

export const createThemeStore: StateCreator<ThemeSlice> = (set) => ({
  theme: defaultTheme,
  setTheme: (value) => {
    set((state) => ({
      ...state,
      theme: value
    }));
  }
});
