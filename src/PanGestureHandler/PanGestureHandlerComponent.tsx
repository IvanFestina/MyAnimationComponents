import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {Gesture, GestureDetector, PanGestureHandler} from "react-native-gesture-handler";
import {View, StyleSheet} from "react-native";
import {useMemo} from "react";
import {useAnimatedView} from "../utils";

const SIZE = 90
const CIRCLE_RADIUS = SIZE * 2
export const PanGestureHandlerComponent = () => {

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const context = useSharedValue({x: 0, y: 0})

    const {
        rStyle,
        springX,
        springY
    } = useAnimatedView({x: translateX, y: translateY})

    const gesture = useMemo(
        () => Gesture.Pan()
            .onStart((event) => {
                context.value = {x: springX.value, y: springY.value}
            })
            .onUpdate((event) => {
                translateX.value = event.translationX + context.value.x
                translateY.value = event.translationY + context.value.y
            })
            .onEnd((event) => {
                const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)
                if (distance < CIRCLE_RADIUS + SIZE / 2) {
                    translateX.value = 0
                    translateY.value = 0
                }
            })
        , []);


    return (
        <View style={s.container}>
            <View style={s.circle}>
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[s.square, rStyle]}/>
                </GestureDetector>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'rgba(30,110,171,0.5)',
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'rgba(30,110,171,0.5)',
        borderRadius: 20
    }
})
