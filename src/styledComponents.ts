import { Animated, Platform } from 'react-native';
import { styled } from 'styled-components/native';
import type { CircleProps, SwitchContainerProps, disabledProps } from './types';

export const CIRCLE_HEIGHT = 20;
export const CIRCLE_WIDTH = 20;
export const SMALL_CIRCLE_HEIGHT = 15;
export const SMALL_CIRCLE_WIDTH = 15;
export const SWITCH_CONTAINER_HEIGHT = 15;
export const PADDING = 5;
export const disabledStyle = { backgroundColor: 'lightgray', opacity: 0.5 };
export const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  android: {
    elevation: 2,
  },
});

export function getSwitchContainerStyles(styleType: string, active: boolean) {
  switch (styleType) {
    case 'material':
      return `
        /* material style */
        ${!active ? 'border: 1px #000 solid;' : 'border: 1px #6750a4 solid;'}
        padding: 13px;
        width: 52px;
      `;
    case 'stock':
      return `
        /* stock style */
      `;
    case 'bordered':
      return `
        /* bordered style */
      `;
    default:
      return '';
  }
}

export function getCircleStyles(styleType: string, active: boolean) {
  switch (styleType) {
    case 'material':
      return `
        /* material style */
        ${active ? 'background-color: #fff;' : 'background-color: #000;'};
        top: ${(SWITCH_CONTAINER_HEIGHT + 2 * PADDING - CIRCLE_HEIGHT) / 2}px;
        ${active ? 'margin-left: 2px' : 'margin-left: 5px'};
        ${!active ? 'top: 6px; width: 15px' : ''};
      `;
    case 'stock':
      return `
        /* stock style */
      `;
    case 'bordered':
      return `
        /* bordered style */
      `;
    default:
      return '';
  }
}

export const Container = styled.View<{ labelType?: string }>`
  flex-direction: ${({ labelType }) =>
    labelType === 'left' || labelType === 'right' || labelType === 'both'
      ? 'row'
      : 'column'};
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.View<{ labelType?: string }>`
  flex-direction: ${({ labelType }) =>
    labelType === 'left' || labelType === 'right' || labelType === 'both'
      ? 'row'
      : 'column'};
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const SwitchContainer = styled(Animated.View)<SwitchContainerProps>`
  width: 40px;
  height: ${SWITCH_CONTAINER_HEIGHT}px;
  border-radius: ${SWITCH_CONTAINER_HEIGHT}px;
  padding: ${PADDING}px;
  justify-content: center;
  align-items: center;
  ${({ styleType, active }) =>
    getSwitchContainerStyles(styleType as string, active as boolean)}
`;

export const Circle = styled(Animated.View)<CircleProps>`
  width: ${CIRCLE_WIDTH}px;
  height: ${CIRCLE_HEIGHT}px;
  border-radius: ${CIRCLE_HEIGHT / 2}px;
  background-color: ${({ disabled }: any) => (disabled ? 'gray' : '#f0eef0')};
  position: absolute;
  top: ${Platform.OS === 'ios' ? '-1px' : '-2px'};
  justify-content: center;
  align-items: center;
  ${({ styleType, active }) =>
    getCircleStyles(styleType as string, active as boolean)}
`;

export const Label = styled.Text<disabledProps>`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: ${({ disabled }: any) => (disabled ? 'gray' : 'black')};
`;
