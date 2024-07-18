import { useState } from 'react';
import { TimeFormat, UnitTypes } from 'store';
import { Button, TextSection } from 'components';
import { getFullTimeFormat, getMeridiemTimeFormat } from 'utils/getTimeFromData';
import { useStore } from 'store/store';
import {
  ButtonGroup,
  ModalContainer,
  ModalContent,
  SectionContainer
} from 'styledComponents/styled';

interface SettingsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  time: Date;
}

export const SettingsModal = (props: SettingsProps) => {
  const { isOpen, setIsOpen, time } = props;
  
  const { unitType, timeFormat } = useStore((state) => state.settings);

  const [selectedUnitType, setSelectedUnitType] = useState<UnitTypes>(unitType)
  const [selectedTimeFormat, setSelectedTimeFormat] = useState<TimeFormat>(timeFormat)

  const setSettings = useStore((state) => state.setSettings);

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUnitType(unitType);
    setSelectedTimeFormat(timeFormat);
  }

  const handleSave = () => {
    setSettings({
      unitType: selectedUnitType,
      timeFormat: selectedTimeFormat
    });
    setIsOpen(false);
  }

  return (
    <ModalContainer $isOpen={isOpen}>
      <ModalContent>
        <TextSection $size='medium'>Settings</TextSection>
        <SectionContainer>
          <TextSection $size='small'>Units</TextSection>
          <ButtonGroup>
            <Button
              $size='medium'
              $isActive={selectedUnitType === UnitTypes.Imperial}
              onClick={() => setSelectedUnitType(UnitTypes.Imperial)}
            >
              Imperial
            </Button>
            <Button
              $size='medium'
              $isActive={selectedUnitType === UnitTypes.Metric}
              onClick={() => setSelectedUnitType(UnitTypes.Metric)}
            >
              Metric
            </Button>
            <Button
              $size='medium'
              $isActive={selectedUnitType === UnitTypes.Standard}
              onClick={() => setSelectedUnitType(UnitTypes.Standard)}
            >
              Standard
            </Button>
          </ButtonGroup>
        </SectionContainer>
        <SectionContainer>
          <TextSection $size='small'>Time</TextSection>
          <ButtonGroup>
            <Button
              $size='medium'
              $isActive={selectedTimeFormat === TimeFormat.Meridiem}
              onClick={() => setSelectedTimeFormat(TimeFormat.Meridiem)}
            >
              AM/PM
            </Button>
            <Button
              $size='medium'
              $isActive={selectedTimeFormat === TimeFormat.Full}
              onClick={() => setSelectedTimeFormat(TimeFormat.Full)}
            >
              24h
            </Button>
          </ButtonGroup>
        </SectionContainer>
        <ButtonGroup>
          <Button $size='medium' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button $size='medium' onClick={handleSave}>
            Save
          </Button>
        </ButtonGroup>
        <TextSection>
          {
            timeFormat === TimeFormat.Full ?
            getFullTimeFormat(time) :
            getMeridiemTimeFormat(time)
          }
        </TextSection>
      </ModalContent>
    </ModalContainer>
  )
}
