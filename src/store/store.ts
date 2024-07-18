import { CitySlice, createCityStore } from "./useCityStore";
import { SettingsSlice, createSettingsStore } from "./useSettingsStore";
import { ThemeSlice, createThemeStore } from "./useThemeStore";
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CombinedState = CitySlice
  & SettingsSlice
  & ThemeSlice;

export const useStore = create<CombinedState, [['zustand/devtools', never]]>(
  devtools((set, get, api) => {
    return {
      ...createCityStore(set, get, api),
      ...createSettingsStore(set, get, api),
      ...createThemeStore(set, get, api),
    };
  })
);