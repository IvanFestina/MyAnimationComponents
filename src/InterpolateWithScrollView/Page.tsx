import {View, StyleSheet, Text} from "react-native";
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated";
import React from "react";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils";

type PagePropsType = {
    title: string
    index: number
    translateX: Animated.SharedValue<number>
}

const SIZE = SCREEN_WIDTH * 0.7;

export const Page: React.FC<PagePropsType> = ({title, index, translateX}) => {

    const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH]

    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(translateX.value, inputRange,
            [0.8, 1, 0.8], Extrapolate.CLAMP
        )
        const borderRadius = interpolate(translateX.value, inputRange,
            [0, SIZE / 3, 0], Extrapolate.CLAMP)

        return {
            transform: [{scale}],
            borderRadius
        }
    })

    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(translateX.value, inputRange,
            [SCREEN_HEIGHT / 2, 0, -SCREEN_HEIGHT / 2], Extrapolate.CLAMP)
        const opacity = interpolate(translateX.value, inputRange,
            [-2, 1, -2], Extrapolate.CLAMP)
        return {
            transform: [{translateY}],
            opacity
        }
    })

    return (
        <View style={[s.container, {backgroundColor: `rgba(0,0,256,0.${index + 2})`}]}>
            <Animated.View style={[s.square, rStyle]}/>
            <Animated.View style={[s.textContainer, rTextStyle]}>
                <Text style={s.text}>{title}</Text>
            </Animated.View>

        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: 'rgba(0,0,256,0.4)',
    },
    textContainer: {
        position: 'absolute',
    },
    text: {
        fontSize: 60,
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: '700',
    }
})
