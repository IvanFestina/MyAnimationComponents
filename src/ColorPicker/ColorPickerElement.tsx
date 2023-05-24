import {View, Text, StyleSheet} from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring, withTiming
} from "react-native-reanimated";
import {LinearGradient, LinearGradientProps} from "expo-linear-gradient";
import {Gesture, GestureDetector, RaceGesture} from "react-native-gesture-handler";
import {useCallback} from "react";

interface ColorPickerPropsType extends LinearGradientProps {
    maxWidth: number;
    onColorChanged?: (color: string | number) => void;
    colors: string[];
}


const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

export const ColorPickerElement: React.FC<ColorPickerPropsType> =
    ({
         start,
         end,
         style,
         colors,
         maxWidth,
         onColorChanged,
     }) => {
        const translateX = useSharedValue(0);
        const translateY = useSharedValue(0);
        const scale = useSharedValue(1);
        const context = useSharedValue({x: 0});

        const adjustedTranslateX = useDerivedValue(() => {
            return Math.min(
                Math.max(translateX.value, 0),
                maxWidth - CIRCLE_PICKER_SIZE
            );
        });

        const onEnd = useCallback(() => {
            'worklet';
                translateY.value = withSpring(0);
                scale.value = withSpring(1)
            }
            , [])

        const panGestureEvent = Gesture.Pan()
            .onStart(() => {
                context.value = {x: adjustedTranslateX.value};
                // translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
                // scale.value = withSpring(1.2)
            })
            .onUpdate((event) => {
                translateX.value = event.translationX + context.value.x
            })
            .onEnd(onEnd)
        const tapGestureEvent = Gesture.Tap()
            .onStart((event) => {
                translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
                scale.value = withSpring(1.2)
                translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE)
            })
            .onEnd(onEnd)


        const rStyle = useAnimatedStyle(() => {
                return {
                    transform: [
                        {translateX: adjustedTranslateX.value},
                        {translateY: translateY.value},
                        {scale: scale.value},
                    ],
                };
            }
        );
        const rInternalPickerStyle = useAnimatedStyle(() => {
                const inputRange = colors.map((_, index) => (index / colors.length) * maxWidth)

                const backgroundColor = interpolateColor(
                    translateX.value,
                    inputRange,
                    colors
                )
                if (onColorChanged) {
                    onColorChanged(backgroundColor)
                }
                return {
                    backgroundColor,
                };
            }
        );

        return (
            <GestureDetector gesture={Gesture.Exclusive(panGestureEvent, tapGestureEvent)}>
                <Animated.View style={{justifyContent: 'center'}}>
                    <LinearGradient start={start} end={end} style={style} colors={colors}/>
                    <Animated.View style={[s.picker, rStyle]}>
                        <Animated.View style={[s.internalPicker, rInternalPickerStyle]}/>
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        )
    }

const s = StyleSheet.create({
    picker: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: CIRCLE_PICKER_SIZE,
        height: CIRCLE_PICKER_SIZE,
        borderRadius: CIRCLE_PICKER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    internalPicker: {
        width: INTERNAL_PICKER_SIZE,
        height: INTERNAL_PICKER_SIZE,
        borderRadius: INTERNAL_PICKER_SIZE / 2,
        borderWidth: 1.0,
        borderColor: 'rgba(0,0,0,0.2)',
    },

})
