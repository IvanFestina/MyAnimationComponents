import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {SCREEN_WIDTH} from "../utils";
import {ColorPickerElement} from "./ColorPickerElement";
import {useCallback} from "react";

const COLORS = [
    'red',
    'purple',
    'blue',
    'cyan',
    'green',
    'yellow',
    'orange',
    'black',
    'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const CIRCLE_SIZE = SCREEN_WIDTH * 0.8;
const PICKER_WIDTH = SCREEN_WIDTH * 0.9;

export const ColorPickerComponent = () => {

    const pickedColor = useSharedValue<string | number>(COLORS[0]);

    const onColorChanged = useCallback((color: string | number) => {
        'worklet';
        pickedColor.value = color;
    }, []);

    const rStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: pickedColor.value,
        };
    });

    return (
        <>
            <View style={s.topContainer}>
                <Animated.View style={[s.circle, rStyle]}/>
            </View>
            <View style={s.bottomContainer}>
                <ColorPickerElement
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={s.gradient}
                    colors={COLORS}
                    maxWidth={PICKER_WIDTH}
                    onColorChanged={onColorChanged}
                />
            </View>
        </>
    )
}

const s = StyleSheet.create({
    topContainer: {
        flex: 3,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
    },
    gradient: {
        height: 40,
        width: PICKER_WIDTH,
        borderRadius: 20,
    },
    }
)
