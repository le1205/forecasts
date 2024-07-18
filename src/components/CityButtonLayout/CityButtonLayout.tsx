import { useStore } from 'store/store';
import cities from 'utils/Cities.json'
import { Button } from '../Button/Button';
import { ButtonLayout } from 'styledComponents/styled';

export const CityButtonLayout = () => {
  const selectedCity = useStore((state) => state?.city);
  const setSelectedCity = useStore((state) => 
    state.setCity
  );

  return (
    <ButtonLayout>
      {
        cities.map((city, index) => (
          <Button
            key={index}
            onClick={() => setSelectedCity(city)}
            $isActive={selectedCity === city}
            $size='large'
          >
            {city}
          </Button>
        ))
      }
    </ButtonLayout>
  )
};

