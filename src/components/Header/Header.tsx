import { useEffect, useState } from 'react';
import { useStore } from 'store/store';
import { SettingsModal, TextSection } from 'components';
import { ThemeTypes, TimeFormat } from 'store';
import { getFullTimeFormat, getMeridiemTimeFormat } from 'utils/getTimeFromData';
import { ReactComponent as ThemeSwitchBlackIcon } from 'assets/theme-switch-black.svg'
import { ReactComponent as ThemeSwitchWhiteIcon } from 'assets/theme-switch-white.svg'
import { ReactComponent as CloseCircleBlackIcon } from 'assets/close-circle-black.svg';
import { ReactComponent as CloseCircleWhiteIcon } from 'assets/close-circle-white.svg';
import cities from 'utils/Cities.json'
import {
  HeaderContainer,
  IconWrapper,
  SearchBarContainer,
  SearchTerm,
  ToolButton,
  ToolsWrapper
} from 'styledComponents/styled';

export const Header = () => {
  const theme = useStore((state) => state.theme);  
  const { timeFormat } = useStore((state) => state.settings);

  const [time, setTime] = useState<Date>(new Date());
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const setSelectedCity = useStore((state) => state.setCity);
  const setTheme = useStore((state) => state.setTheme)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClickSettings = () => {
    setIsOpenModal(true);
  }

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const matchedCity = cities.find(city => city.toLowerCase() === searchInput.toLowerCase());
      if (matchedCity) {
        setSelectedCity(matchedCity)
      }
    }
  }

  const handleClickClose = () => {
    setIsOpenSearch(false);
    setSearchInput("");
  }

  return (
    <HeaderContainer>
      <TextSection>
        {
          timeFormat === TimeFormat.Full ?
          getFullTimeFormat(time) :
          getMeridiemTimeFormat(time)
        }
      </TextSection>
      <ToolsWrapper>
        {
          isOpenSearch ?
          <SearchBarContainer>
            <SearchTerm
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => handleInputEnter(event)}
            />
            {
              theme === ThemeTypes.Dark ?
              <CloseCircleBlackIcon className='close' onClick={handleClickClose}/> :
              <CloseCircleWhiteIcon className='close' onClick={handleClickClose}/>
            }
          </SearchBarContainer> :
          <ToolButton onClick={() => setIsOpenSearch(true)}>
            Search
          </ToolButton>
        }
        <ToolButton onClick={handleClickSettings}>
          Settings
        </ToolButton>
        <IconWrapper>
          {
            theme === ThemeTypes.Dark ?
            <ThemeSwitchWhiteIcon className='switch'  onClick={() => setTheme(ThemeTypes.Light)}/> :
            <ThemeSwitchBlackIcon className='switch' onClick={() => setTheme(ThemeTypes.Dark)}/>
          }
        </IconWrapper>
      </ToolsWrapper>
      <SettingsModal time={time} isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
    </HeaderContainer>
  )
}
