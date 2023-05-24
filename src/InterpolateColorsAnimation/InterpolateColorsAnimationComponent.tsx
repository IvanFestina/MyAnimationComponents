import {StyleSheet, Switch, Text} from "react-native";
import Animated, {
    Extrapolation,
    interpolate, interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue, withTiming
} from "react-native-reanimated";
import React, {useState} from "react";
import {Colors, SWITCH_TRACK_COLOR} from "./consts";
import {SCREEN_WIDTH} from "../utils";

type Theme = 'light' | 'dark';
const SIZE = SCREEN_WIDTH * 0.7;
export const InterpolateColorsAnimationComponent = () => {

    const [theme, setTheme] = useState<Theme>('light');

    const progress = useDerivedValue(() => {
        return theme === 'light' ? withTiming(0) : withTiming(1)
    }, [theme])

    const rStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(progress.value,
            [0, 1],
            [Colors.light.backgroundColor, Colors.dark.backgroundColor],
        )
        return {
            backgroundColor
        }
    })
    const rCircleStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(progress.value,
            [0, 1],
            [Colors.light.circle, Colors.dark.circle],
        )
        return {
            backgroundColor
        }
    })
    const rTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(progress.value,
            [0, 1],
            [Colors.light.text, Colors.dark.text],
        )
        return {
            color
        }
    })

    const onSwitchHandler = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <Animated.View style={[s.container, rStyle]}>
                <Animated.Text style={[s.text, rTextStyle]}>THEME</Animated.Text>
            <Animated.View style={[s.circle, rCircleStyle]}>
            <Switch value={theme === 'dark'} onValueChange={onSwitchHandler}
                    trackColor={SWITCH_TRACK_COLOR}
                    thumbColor={'violet'}

            />
            </Animated.View>
        </Animated.View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8
    },
    text: {
        fontSize: 60,
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: 10,
        marginBottom: 35
    }
})
