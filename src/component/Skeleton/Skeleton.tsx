import React, { useState, useEffect } from 'react';
import { StyleSheet, View, type LayoutRectangle } from 'react-native';
import Animated, {
  withTiming,
  withRepeat,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import ThemeProvider, { useTheme } from './ThemeProvider';
import type { SkeletonProps, ShapeProps, LayoutProps } from './Skeleton.types';

const DARK_BG = '#272727';
const LIGHT_BG = '#e4e6ea';
const DARK_FLASHING = '#383838';
const LIGHT_FLASHING = '#ffffff';

export function Skeleton({
  children,
  color,
  animation = 'wave',
  duration = 1000,
  dark = false,
}: SkeletonProps) {
  const [layout, setLayout] = useState<LayoutRectangle>();

  const animationValue = useSharedValue(0);

  const waveAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          animationValue.value,
          [0, 1],
          [-(layout?.width ?? 0), layout?.width ?? 0]
        ),
      },
    ],
  }));

  const pulseAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(animationValue.value, [0, 0.5, 1], [0, 1, 0]),
  }));

  useEffect(() => {
    animationValue.value = withRepeat(withTiming(1, { duration }), Infinity);
  }, []);

  if (!layout) {
    return (
      <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }

  const colors =
    animation === 'wave'
      ? ['transparent', 'rgba(0,0,0,0.75)', 'transparent']
      : ['rgba(0,0,0,0.75)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,0.75)'];

  return (
    <ThemeProvider
      theme={{ dark, backgroundColor: color ?? (dark ? DARK_BG : LIGHT_BG) }}
    >
      <MaskedView
        maskElement={children}
        style={{ width: layout.width, height: layout.height }}
      >
        <View
          style={[
            styles.mask,
            { backgroundColor: color ?? (dark ? DARK_BG : LIGHT_BG) },
          ]}
        />
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            animation === 'wave' ? waveAnimation : pulseAnimation,
          ]}
        >
          <MaskedView
            style={StyleSheet.absoluteFillObject}
            maskElement={
              <LinearGradient
                // locations={[0, 0.25, 1]}
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
                useAngle
                angle={90}
              />
            }
          >
            <View
              style={[
                styles.light,
                { backgroundColor: dark ? DARK_FLASHING : LIGHT_FLASHING },
              ]}
            />
          </MaskedView>
        </Animated.View>
      </MaskedView>
    </ThemeProvider>
  );
}

export function Circle({
  size = 60,
  mx,
  my,
  ml,
  mr,
  mb,
  mt,
}: Omit<ShapeProps, 'space' | 'width' | 'height'>) {
  const { backgroundColor } = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        marginBottom: mb,
        marginVertical: my,
        borderRadius: size,
        marginHorizontal: mx,
        backgroundColor,
      }}
    />
  );
}

export function Card({
  width = '100%',
  height = 100,
  radius = 12,
  mx,
  my,
  ml,
  mr,
  mb,
  mt,
}: Omit<ShapeProps, 'space'>) {
  const { backgroundColor } = useTheme();

  return (
    <View
      style={{
        width,
        height,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        marginBottom: mb,
        marginVertical: my,
        borderRadius: radius,
        marginHorizontal: mx,
        backgroundColor,
      }}
    />
  );
}

export function Box({
  size = 60,
  radius = 12,
  mx,
  my,
  ml,
  mr,
  mb,
  mt,
}: Omit<ShapeProps, 'space' | 'width' | 'height'>) {
  const { backgroundColor } = useTheme();

  return (
    <View
      style={{
        width: size,
        height: size,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        marginBottom: mb,
        marginVertical: my,
        marginHorizontal: mx,
        borderRadius: radius,
        backgroundColor,
      }}
    />
  );
}

export function Line({
  radius = 6,
  height = 18,
  width = '100%',
  ml,
  mt,
  mb,
  mr,
  my,
  mx,
}: Omit<ShapeProps, 'size'> & { as?: 'lines'; n?: number }) {
  const { backgroundColor } = useTheme();

  return (
    <View
      style={{
        width,
        height,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        marginBottom: mb,
        marginVertical: my,
        marginHorizontal: mx,
        borderRadius: radius,
        backgroundColor,
      }}
    />
  );
}

export function Lines({
  n = 1,
  radius = 6,
  height = 18,
  width = '100%',
  random,
  ...props
}: Omit<ShapeProps, 'size'> & { random?: boolean; n?: number }) {
  const { dark } = useTheme();

  return n && n > 1 ? (
    <View>
      {Array.from({ length: n }, (_, k) => (
        <Line
          {...{
            radius,
            height,
            dark,
            width: random ? `${~~(Math.random() * (100 - 30) + 30)}%` : width,
          }}
          {...props}
          key={k}
        />
      ))}
    </View>
  ) : (
    <Line {...{ radius, height, width, dark }} {...props} />
  );
}

export function Row({
  children,
  space = 0,
  center,
  end,
  ml,
  mt,
  mb,
  mr,
}: LayoutProps) {
  return (
    <View
      style={{
        width: '100%',
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        marginBottom: mb,
        flexDirection: 'row',
        justifyContent: center ? 'center' : end ? 'flex-end' : undefined,
      }}
    >
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, { ml: idx ? space : 0 })
      )}
    </View>
  );
}

export function Col({
  children,
  space = 0,
  center,
  end,
  mt,
  ml,
  mb,
  mr,
}: LayoutProps) {
  return (
    <View
      style={{
        flexGrow: 1,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        marginBottom: mb,
        alignItems: center ? 'center' : end ? 'flex-end' : undefined,
      }}
    >
      {React.Children.map(children, (child, idx) => {
        if (child.props?.as && child.props.as === 'lines' && child.props?.n) {
          return Array.from({ length: child.props.n }, (_, idx) =>
            React.cloneElement(child, { mt: idx ? space : 0 })
          );
        }
        return React.cloneElement(child, { mt: idx ? space : 0 });
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mask: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  light: {
    ...StyleSheet.absoluteFillObject,
  },
});
