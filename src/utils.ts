import Animated, {useAnimatedStyle, useDerivedValue, withSpring} from "react-native-reanimated";
import {Dimensions} from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

type AnimatedPositionPropsType = {
    x: Animated.SharedValue<number>;
    y: Animated.SharedValue<number>;
}

export const useFollowAnimatedPosition = ({x, y}: AnimatedPositionPropsType) => {
    const followX = useDerivedValue(() => {
        return withSpring(x.value, {stiffness: 1000, damping: 100})
    })
    const followY = useDerivedValue(() => {
        return withSpring(y.value, {stiffness: 1000, damping: 100})
    })
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: followX.value},
                {translateY: followY.value}
            ]
        }
    })
    return {followX, followY, rStyle}
}

export const useAnimatedView = ({x, y}: AnimatedPositionPropsType) => {
    const springX = useDerivedValue(() => {
        return withSpring(x.value)
    })
    const springY = useDerivedValue(() => {
        return withSpring(y.value, )
    })
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: springX.value},
                {translateY: springY.value}
            ]
        }
    })
    return {springX, springY, rStyle}
}
