import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable } from 'react-native';
import styled from 'styled-components/native';
import type { ToggleProps } from './types';

type disabledProps = {
  disabled?: boolean;
};

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

const SwitchContainer = styled.View`
  width: 40px;
  height: 15px;
  border-radius: 15px;
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(Animated.View)<disabledProps>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ disabled }: any) => (disabled ? 'gray' : '#f0eef0')};
  position: absolute;
  top: ${Platform.OS === 'ios' ? '-1px' : '-2px'};
  justify-content: center;
  align-items: center;
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
  children,
  disabled,
  labels,
  labelType = 'top',
  toggleBarColor,
}: ToggleProps) {
  const [active, setActive] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const switchAnim = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2%', '70%'],
  });

  const labelPlacement =
    (labels && labelType === 'left') ||
    labelType === 'both' ||
    labelType === 'top';

  const switchMovement = { left: switchAnim };
  const switchStyle = toggleBarColor
    ? { backgroundColor: toggleBarColor }
    : { backgroundColor: active ? '#6750a4' : 'gray' };

  const disabledStyle = { backgroundColor: 'lightgray' };
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 1.5,
    },
  });

  useEffect(() => {
    setIsAnimating(true);
    Animated.timing(animatedValue, {
      toValue: active ? 1 : 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
      onValueChange(active);
    });

    onValueChange(active);
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

          <SwitchContainer style={disabled ? disabledStyle : switchStyle}>
            <Circle disabled={disabled} style={[shadowStyle, switchMovement]}>
              {children}
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
