import { FORECAST_API } from './endpoints';
import { getApi } from 'utils/apiService';
import { useQuery } from '@tanstack/react-query';
import { UnitTypes } from '@/store';

export const useFiveDaysForecastsQuery = (
  lat?: number,
  lon?: number,
  unit?: UnitTypes) => {
  const url = `${FORECAST_API}lat=${lat}&lon=${lon}&units=${unit}`
  return useQuery<any>({
    queryKey: ["Geolocation", url],

    queryFn: () => getApi(url)
  });
};
