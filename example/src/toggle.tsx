import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  Platform,
  Pressable,
} from 'react-native';
import styled from 'styled-components/native';
import type { ToggleProps } from './types';

type disabledProps = {
  disabled?: boolean;
};

type SwitchContainerProps = {
  styleType?: string;
  active?: boolean;
};

type CircleProps = disabledProps & { styleType?: string; active?: boolean };

const CIRCLE_HEIGHT = 20;
const CIRCLE_WIDTH = 20;
const SMALL_CIRCLE_HEIGHT = 15;
const SMALL_CIRCLE_WIDTH = 15;
const SWITCH_CONTAINER_HEIGHT = 15;
const PADDING = 5;

const Container = styled.View<{ labelType?: string }>`
  flex-direction: ${({ labelType }) =>
    labelType === 'left' || labelType === 'right' || labelType === 'both'
      ? 'row'
      : 'column'};
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View<{ labelType?: string }>`
  flex-direction: ${({ labelType }) =>
    labelType === 'left' || labelType === 'right' || labelType === 'both'
      ? 'row'
      : 'column'};
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const SwitchContainer = styled(Animated.View)<SwitchContainerProps>`
  width: 40px;
  height: ${SWITCH_CONTAINER_HEIGHT}px;
  border-radius: ${SWITCH_CONTAINER_HEIGHT}px;
  padding: ${PADDING}px;
  justify-content: center;
  align-items: center;

  ${({ styleType, active }) =>
    styleType === 'material' &&
    `
    /* material style */
    ${!active ? 'border: 1px #000 solid;' : 'border: 1px #6750a4 solid;'}
    padding: 13px;
    width: 52px;

  `}
  ${({ styleType }) =>
    styleType === 'stock' &&
    `
    /* stock style */


  `}
${({ styleType }) =>
    styleType === 'bordered' &&
    `
    /* bordered style */
  `}
`;

const Circle = styled(Animated.View)<CircleProps>`
  width: ${CIRCLE_WIDTH}px;
  height: ${CIRCLE_HEIGHT}px;
  border-radius: ${CIRCLE_HEIGHT / 2}px;
  background-color: ${({ disabled }: any) => (disabled ? 'gray' : '#f0eef0')};
  position: absolute;
  top: ${Platform.OS === 'ios' ? '-1px' : '-2px'};
  justify-content: center;
  align-items: center;
  ${({ styleType, active }) =>
    styleType === 'material' &&
    `
    /* material style */
    ${active ? 'background-color: #fff;' : 'background-color: #000;'};
    top: ${(SWITCH_CONTAINER_HEIGHT + 2 * PADDING - CIRCLE_HEIGHT) / 2}px;
    ${active ? 'margin-left: 2px' : 'margin-left: 5px'};
    ${!active ? 'top: 6px' : ''};
    ${!active ? 'width: 15px' : ''};
  `}
  ${({ styleType }) =>
    styleType === 'stock' &&
    `
    /* stock style */
  `}
${({ styleType }) =>
    styleType === 'bordered' &&
    `
    /* bordered style */
  `}
`;

const Label = styled.Text<disabledProps>`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: ${({ disabled }: any) => (disabled ? 'gray' : 'black')};
`;

export default function Toggle({
  onValueChange,
  value = false,
  onIcon,
  offIcon,
  disabled,
  labels,
  labelType = 'top',
  styleType = 'material',
  customTrackColor,
  customCircleColor,
}: ToggleProps) {
  const [active, setActive] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  const labelPlacement =
    (labels && labelType === 'left') ||
    labelType === 'both' ||
    labelType === 'top';

  // STYLES

  const disabledStyle = { backgroundColor: 'lightgray' };
  const shadowStyle = Platform.select({
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
  const switchStyle = disabled ? disabledStyle : null;

  // ANIMATIONS

  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const circleColorAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(
    new Animated.Value(active ? CIRCLE_HEIGHT : SMALL_CIRCLE_HEIGHT)
  ).current;
  const widthAnim = useRef(
    new Animated.Value(active ? CIRCLE_WIDTH : SMALL_CIRCLE_WIDTH)
  ).current;
  const materialSwitchBackgroundAnim = useRef(new Animated.Value(0)).current;

  const circleColor = circleColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: customCircleColor
      ? [customCircleColor.off, customCircleColor.on]
      : styleType === 'material'
      ? ['rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)']
      : ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)'],
  });

  const materialSwitchBackgroundColor =
    materialSwitchBackgroundAnim.interpolate({
      inputRange: [0, 1],
      outputRange: customTrackColor
        ? [customTrackColor.off, customTrackColor.on]
        : styleType === 'material'
        ? ['rgb(231 224 236)', 'rgb(103 80 164)']
        : disabled
        ? ['rgb(195 190 208)', 'rgb(195 190 208)']
        : ['rgb(177 172 183)', 'rgb(81 183 72)'],
    });

  const switchAnim = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: styleType === 'material' ? ['-2%', '100%'] : ['-2%', '70%'],
  });
  const switchMovement = { left: switchAnim };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled && !isAnimating,
        onPanResponderGrant: () => {
          if (!isAnimating) {
            setActive(!active);
          }
        },
      }),
    [active, disabled, isAnimating]
  );

  useEffect(() => {
    if (!isAnimating) {
      setIsAnimating(true); // Add this line here.
      Animated.parallel([
        Animated.timing(circleColorAnim, {
          toValue: active ? 1 : 0,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(widthAnim, {
          toValue: active ? CIRCLE_WIDTH : SMALL_CIRCLE_WIDTH,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: active ? CIRCLE_HEIGHT : SMALL_CIRCLE_HEIGHT,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(materialSwitchBackgroundAnim, {
          toValue: active ? 1 : 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: active ? 1 : 0,
          duration: 600,
          easing: Easing.elastic(1.2),
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsAnimating(false);
        onValueChange(active);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Container labelType={labelType}>
      <Pressable
        onPress={() => !isAnimating && setActive(!active)}
        disabled={disabled || isAnimating}
      >
        <ContentContainer labelType={labelType}>
          {labelPlacement ? (
            <Label disabled={disabled}>{labels ? labels[0] : null}</Label>
          ) : null}

          <SwitchContainer
            styleType={styleType}
            style={[
              switchStyle,
              { backgroundColor: materialSwitchBackgroundColor },
            ]}
            active={active}
          >
            <Circle
              {...panResponder.panHandlers}
              disabled={disabled}
              styleType={styleType}
              style={[
                shadowStyle,
                switchMovement,
                { backgroundColor: circleColor },
                styleType === 'material'
                  ? { height: heightAnim, width: widthAnim }
                  : null,
              ]}
              active={active}
            >
              <Animated.View>{active ? onIcon : offIcon}</Animated.View>
            </Circle>
          </SwitchContainer>

          {labelType === 'both' ? (
            <Label disabled={disabled}> {labels ? labels[1] : null} </Label>
          ) : null}
          {labelType === 'right' ? (
            <Label disabled={disabled}>{labels ? labels[0] : null}</Label>
          ) : null}
        </ContentContainer>
      </Pressable>
    </Container>
  );
}
