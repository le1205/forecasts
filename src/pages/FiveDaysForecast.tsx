import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  TextSection,
  SelectIcon
} from 'components';
import { fiveDaysForecast, MainForecast } from 'utils/fiveDaysForecast';
import { useStore } from 'store/store';
import { useGeolocationQuery } from 'apis/useGeolocationQuery';
import { useFiveDaysForecastsQuery } from 'apis/useFiveDaysForecastsQuery';
import { IGeolocationResponse } from '@/types';
import {
  FiveDaysForecastMain,
  FiveDaysForecastWrapper,
  MainSection,
  SettingForecastButtonWrapper,
  SettingForecastType
} from 'styledComponents/styled';


const FiveDaysForecast = () => {
  const selectedCity = useStore((state) => state?.city);
  const { unitType, unitSymbol } = useStore((state) => state.settings);

  const { pathname } = useLocation();

  const [forecastData, setForeCastData] = useState<MainForecast[]>();
  const [geoLocation, setGeoLocation] = useState<IGeolocationResponse>();

  const { data } = useGeolocationQuery(selectedCity);

  useEffect(() => {
    if (data?.length) {
      setGeoLocation({
        lat: data[0].lat,
        lon: data[0].lon
      })
    }
  }, [data])

  const {
    data: fiveDaysForecasts,
    isLoading
  } = useFiveDaysForecastsQuery(geoLocation?.lat, geoLocation?.lon, unitType);

  useEffect(() => {
    const fiveDaysData = fiveDaysForecast(fiveDaysForecasts);
    setForeCastData(fiveDaysData)
  }, [fiveDaysForecasts])
  
  return (
    <MainSection>
      {
        selectedCity === "" ?
        <TextSection $size='large'>Pick a city to see the full forecast</TextSection> :
        <>
          <TextSection $size='medium'>{selectedCity}</TextSection>
          {
            !isLoading &&
            <FiveDaysForecastWrapper>
              {forecastData?.map((item, index) => (
                <FiveDaysForecastMain key={index}>
                  <TextSection>{item.day}</TextSection>
                  {SelectIcon(item?.weather)}
                  <TextSection $size='medium'>{item?.weather}</TextSection>
                  <TextSection $size='medium'>H: {item.highestTemp}{unitSymbol} / L:{item.lowestTemp}{unitSymbol}</TextSection>
                </FiveDaysForecastMain>
              ))}
            </FiveDaysForecastWrapper>
          }
          <SettingForecastType>
            <SettingForecastButtonWrapper>
              <Link to="/">
                <Button $isActive={pathname === '/'} $size='medium'>
                  Now
                </Button>
              </Link>
              <Link to="/5days">
                <Button $isActive={pathname === '/5days'} $size='medium'>
                  5 Days
                </Button>
              </Link>
            </SettingForecastButtonWrapper>
          </SettingForecastType>
        </>
      }
    </MainSection>
  )
}




export default FiveDaysForecast