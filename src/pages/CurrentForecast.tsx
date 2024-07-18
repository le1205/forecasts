import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  SelectIcon,
  TextSection
} from 'components';
import { getHumanTime } from 'utils/getHumanTime';
import { useStore } from 'store/store';
import { useGeolocationQuery } from 'apis/useGeolocationQuery';
import { useCurrentForecastsQuery } from 'apis/useCurrentForecastsQuery';
import { IGeolocationResponse } from '@/types';
import {
  ForecastDetails,
  ForecastMain,
  MainSection,
  SettingForecastButtonWrapper,
  SettingForecastType
} from 'styledComponents/styled';

interface WeatherInfo {
  main: string,
  temp: number,
  feelLike: number,
  humidity: number,
  sunrise: number,
  sunset: number,
  timezone: number,
}

const CurrentForecast = () => {
  const selectedCity = useStore((state) => state?.city);
  const { unitType, unitSymbol, timeFormat } = useStore((state) => state.settings);
  const { pathname } = useLocation();

  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    main: "",
    temp: 0,
    feelLike: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    timezone: 0,
  })
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
    data: currentForecasts,
    isLoading: isForecastsLoading
  } = useCurrentForecastsQuery(geoLocation?.lat, geoLocation?.lon, unitType);

  useEffect(() => {
    setWeatherInfo({
      main: currentForecasts?.weather[0].main || "",
      temp: currentForecasts?.main.temp || 0,
      feelLike: currentForecasts?.main.feels_like || 0,
      humidity: currentForecasts?.main.humidity || 0,
      sunrise: currentForecasts?.sys.sunrise || 0,
      sunset: currentForecasts?.sys.sunset || 0,
      timezone: currentForecasts?.timezone || 0,
    })
  }, [currentForecasts])

  return (
    <MainSection>
      {
        selectedCity === "" ?
        <TextSection $size='large'>Pick a city to see the full forecast</TextSection> :
        <>
          {
            !isForecastsLoading &&
            <ForecastMain>
              <TextSection $size='medium'>{selectedCity}</TextSection>
              {
                SelectIcon(weatherInfo.main)
              }
              <TextSection $size='medium'>{weatherInfo.main}</TextSection>
              <ForecastDetails>
                <TextSection $size='medium'>Temp: {weatherInfo.temp}{unitSymbol}</TextSection>
                <TextSection $size='medium'>Feels Like: {weatherInfo.feelLike}{unitSymbol}</TextSection>
                <TextSection $size='medium'>Humidity: {weatherInfo.humidity}%</TextSection>
                <TextSection $size='medium'>Sunrise: {getHumanTime(weatherInfo.sunrise, weatherInfo.timezone, timeFormat)}</TextSection>
                <TextSection $size='medium'>Sunset: {getHumanTime(weatherInfo.sunset, weatherInfo.timezone, timeFormat)}</TextSection>
              </ForecastDetails>
            </ForecastMain>
          }
          <SettingForecastType>
            <TextSection>Forecast</TextSection>
            <SettingForecastButtonWrapper>
              <Link to="/">
                <Button $isActive={pathname === '/'} $size='medium'>
                  Now
                </Button>
              </Link>
              <Link to="/5days">
                <Button $size='medium'>
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




export default CurrentForecast