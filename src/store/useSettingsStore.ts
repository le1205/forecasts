import { StateCreator } from 'zustand';

export enum UnitTypes {
  Imperial = "Imperial",
  Metric = "Metric",
  Standard = "Standard",
}

export enum UnitSymbols {
  Imperial = "°F",
  Metric = "°C",
  Standard = "K",
}

export enum TimeFormat {
  Meridiem = "Meridiem",
  Full = "Full"
}

type SettingsState = {
  unitType: UnitTypes;
  timeFormat: TimeFormat;
  unitSymbol?: UnitSymbols;
};

type State = {
  settings: SettingsState;
};

export type SettingsSlice = State & Action;

type Action = {
  setSettings: (value: {
    unitType: UnitTypes,
    timeFormat: TimeFormat
  }) => void;
};

const defaultSettings: SettingsState = {
  unitType: UnitTypes.Metric,
  timeFormat: TimeFormat.Full,
  unitSymbol: UnitSymbols.Metric,
};

export const createSettingsStore: StateCreator<SettingsSlice> = (set) => ({
  settings: defaultSettings,
  setSettings: (value) => {
    try {
      set((state) => ({
        settings: {
          ...state.settings,
          unitType: value.unitType,
          timeFormat: value.timeFormat,
          unitSymbol: value.unitType === UnitTypes.Imperial 
          ? UnitSymbols.Imperial
          : value.unitType === UnitTypes.Metric
          ? UnitSymbols.Metric : UnitSymbols.Standard
        }
      }));
    } catch (e) {
      console.error(e);
    }
  }
});
