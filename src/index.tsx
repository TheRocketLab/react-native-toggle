import type { ToggleProps } from 'lib/typescript';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable } from 'react-native';
import styled from 'styled-components/native';

type disabledProps = {
  disabled?: boolean;
};

const Container = styled.View<{ isRow?: boolean }>`
  flex-direction: ${(props: any) => (props.isRow ? 'row' : 'column')};
  gap: 10px;
  align-items: center;
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
  justify-content: center;
  align-items: center;

  /* Conditional shadow */
  shadow-color: '#000';
  shadow-opacity: 0.25;
  elevation: 1.5;
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
  label,
  isRow,
}: ToggleProps) {
  const [active, setActive] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const switchAnim = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '70%'],
  });

  const switchMovement = { left: switchAnim };
  const switchStyle = { backgroundColor: active ? '#6750a4' : 'gray' };
  const disabledStyle = { backgroundColor: 'lightgray' };

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
    <Container isRow={isRow}>
      <Label disabled={disabled}>{label}</Label>
      <Pressable
        onPress={() => !isAnimating && setActive(!active)}
        disabled={disabled || isAnimating}
      >
        <SwitchContainer style={disabled ? disabledStyle : switchStyle}>
          <Circle disabled={disabled} style={switchMovement}>
            {children}
          </Circle>
        </SwitchContainer>
      </Pressable>
    </Container>
  );
}
