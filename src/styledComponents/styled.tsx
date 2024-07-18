import styled from "styled-components";

export const PageWrapper = styled.div`
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ButtonLayout = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export const HeaderContainer = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`

export const ToolsWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .close {
    right: 8px;
    position: absolute;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`

export const SearchTerm = styled.input`
  width: 100%;
  border: ${props => `2px solid ${props.theme.primary}`};
  padding: 5px;
  padding-right: 28px;
  height: 20px;
  border-radius: 5px;
  outline: none;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 20px;
`

export const ToolButton = styled.div`
  cursor: pointer;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  .switch {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const ModalContainer = styled.div<{$isOpen: boolean;}>`
  opacity: ${props => props.$isOpen ? 1 : 0};
  position: absolute;
  width: 100%;
  height: ${props => props.$isOpen ? "100%" : 0};
  top: 0;
  left: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, .8);
  transition: opacity linear .2s;
  z-index: 1;
`

export const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  background: ${props => props.theme.background};
  border: ${props => props.theme.border} solid 2px;
  border-radius: 8px;
  padding: 20px;
  width: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
`

export const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 14px;
`

export const ForecastMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  margin-bottom: 48px;
  gap: 16px;
  position: relative;

  .weatherIcon {
    width: 8rem;
    height: 8rem;
  }
`

export const ForecastDetails = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  margin: auto;
  width: fit-content;
  height: fit-content;
  left: 460px;
`

export const SettingForecastType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const SettingForecastButtonWrapper = styled.div`
  gap: 12px;
  display: flex;
`

export const MainSection = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`

export const FiveDaysForecastWrapper = styled.div`
  display: flex;
  gap: 16px;
`

export const FiveDaysForecastMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
  
  position: relative;

  .weatherIcon {
    width: 8rem;
    height: 8rem;
  }
`
