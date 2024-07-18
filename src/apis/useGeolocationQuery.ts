import { IGeolocationResponse } from 'types';
import { GEO_API } from './endpoints';
import { getApi } from 'utils/apiService';
import { useQuery } from '@tanstack/react-query';

export const useGeolocationQuery = (cityName: string) => {
  const url = `${GEO_API}${cityName}`
  return useQuery<IGeolocationResponse[]>({
    queryKey: ["Geolocation", url],

    queryFn: () => getApi(url)
  });
};
