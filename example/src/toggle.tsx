import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, PanResponder, Pressable } from 'react-native';
import type { ToggleProps } from './types';
import {
  CIRCLE_HEIGHT,
  CIRCLE_WIDTH,
  SMALL_CIRCLE_HEIGHT,
  SMALL_CIRCLE_WIDTH,
  Circle,
  Container,
  ContentContainer,
  Label,
  SwitchContainer,
  disabledStyle,
  shadowStyle,
} from './styledComponents';

export default function Toggle({
  onValueChange,
  value,
  onIcon,
  offIcon,
  disabled,
  labels,
  labelType = 'top',
  styleType = 'material',
  customTrackColor,
  customCircleColor,
  customFont,
  labelStyles,
}: ToggleProps) {
  const [active, setActive] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  const labelPlacement =
    (labels && labelType === 'left') ||
    labelType === 'both' ||
    labelType === 'top';

  const switchDisabledStyle = disabled ? disabledStyle : null;

  // ANIMATIONS
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const materialSwitchBackgroundAnim = useRef(new Animated.Value(0)).current;
  const circleColorAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(
    new Animated.Value(active ? CIRCLE_HEIGHT : SMALL_CIRCLE_HEIGHT)
  ).current;
  const widthAnim = useRef(
    new Animated.Value(active ? CIRCLE_WIDTH : SMALL_CIRCLE_WIDTH)
  ).current;

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
        onPanResponderMove: (_, gestureState) => {
          if (!disabled && !isAnimating) {
            if (gestureState.dx > 0 && !active) {
              setActive(true);
            } else if (gestureState.dx < 0 && active) {
              setActive(false);
            }
          }
        },

        onPanResponderRelease: () => {
          if (!isAnimating) {
            setActive(!active);
          }
        },
      }),
    [active, disabled, isAnimating]
  );

  useEffect(() => {
    if (!isAnimating) {
      setIsAnimating(true);
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
        onValueChange(active as boolean);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const labelStylesArray = Array.isArray(labelStyles)
    ? labelStyles
    : [labelStyles];

  return (
    <Container labelType={labelType}>
      <Pressable
        onPress={() => !isAnimating && setActive(!active)}
        disabled={disabled || isAnimating}
      >
        <ContentContainer labelType={labelType}>
          {labelPlacement ? (
            <Label
              disabled={disabled}
              style={[
                { fontFamily: customFont },
                labelStyles && labelStylesArray,
              ]}
            >
              {labels ? labels[0] : null}
            </Label>
          ) : null}

          <SwitchContainer
            styleType={styleType}
            style={[
              switchDisabledStyle,
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
            <Label
              disabled={disabled}
              style={[
                { fontFamily: customFont },
                labelStyles && labelStylesArray,
              ]}
            >
              {labels ? labels[1] : null}
            </Label>
          ) : null}
          {labelType === 'right' ? (
            <Label
              disabled={disabled}
              style={[
                { fontFamily: customFont },
                labelStyles && labelStylesArray,
              ]}
            >
              {labels ? labels[0] : null}
            </Label>
          ) : null}
        </ContentContainer>
      </Pressable>
    </Container>
  );
}
