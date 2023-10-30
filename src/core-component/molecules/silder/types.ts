import {ReactNode} from 'react';

export interface SliderProps {
  min: number;
  max: number;
  minRange?: number;
  step: number;
  renderThumb: (name: 'high' | 'low') => ReactNode;
  low?: number;
  high?: number;
  allowLabelOverflow?: boolean;
  disableRange?: boolean;
  disabled?: boolean;
  floatingLabel?: boolean;
  renderLabel?: (value: number) => ReactNode;
  renderNotch?: (value: number) => ReactNode;
  renderRail: () => ReactNode;
  renderRailSelected: () => ReactNode;
  onValueChanged?: (low: number, high: number, byUser: boolean) => void;
  onSliderTouchStart?: (low: number, high: number) => void;
  onSliderTouchEnd?: (low: number, high: number) => void;
  fromValue?: number;
  toValue?: number;
  setAllowScroll?: () => void;
  allowScroll?: boolean;
}
